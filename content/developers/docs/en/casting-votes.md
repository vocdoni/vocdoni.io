---
title: Casting votes
lead: How a voter actually votes - authenticate once against the process census, get the credential service to sign a ballot per question, then relay the signed envelope. The SDK's voting package does the signing for you; the SaaS forwards the ballot without ever decoding it.
group: core_concepts
order: 45
skill: integrator-sdk
---

Casting a vote is the only step with client-side cryptography. Everything else in the API is a plain
REST call; here the voter signs their own ballot so the SaaS never sees how they voted. The SDK's
voting package, `@vocdoni/api-voting`, does that cryptography for you: it generates the ephemeral
key, builds and signs the protobuf vote envelope, and relays it. Start with it below; if you would
rather implement the signing yourself, the raw flow is at the
[end of this page](#doing-the-signing-yourself).

Because each **question** is its own on-chain election, a voter **authenticates once** against the
process, then **signs and relays a ballot per question** they are eligible for.

## The flow

1. **Authenticate once** - the voter presents whatever the census requires: identity `authFields`
   and/or a one-time code sent to their `email`/`phone` (a 2FA census needs no auth fields). Success
   yields a token bound to the process.
2. **Sign per question** - for each question, the credential service (CSP) signs the
   voter's ephemeral voting address for **that question's election**. It refuses unless the voter is
   in the question's [eligibility subset](/developers/docs/census#per-question-eligibility). Signatures
   are salted per election, so one cannot be replayed on another question.
3. **Build and sign** - the voter builds the protobuf vote envelope and signs it locally with the
   ephemeral key.
4. **Relay** - the signed envelope is relayed (asynchronously) to the protocol, which returns a vote
   receipt (nullifier).

Steps 1 and 2 are plain REST calls, wrapped by the API client as `client.processes`; steps 3 and 4
are the cryptography `@vocdoni/api-voting` implements.

On a census created with [`anonymous: true`](/developers/docs/census#anonymous-voting), step 2 is
replaced by a two-round **blind**-signature exchange, so the CSP cannot link its signature to the
final ballot - see [Anonymous voting with blind signatures](#anonymous-voting-with-blind-signatures).

The voter-facing endpoints are **public** - they carry no API key. The voter only needs the
`apiUrl`, the `processId` and the Vochain `chainId`. The
[process read](/developers/docs/voting-processes#reading-a-process) that returns them is public
too, so the voter app fetches them directly - no backend handover needed; each question's
`upstreamId` is also reported by the check call below.

## Cast a vote with the SDK

Install the voting package alongside the API client - the client covers the voter-facing REST
calls, the voting package the cryptography:

:::code-tabs

```npm
npm install @vocdoni/api-client @vocdoni/api-voting
```
```pnpm
pnpm add @vocdoni/api-client @vocdoni/api-voting
```
```yarn
yarn add @vocdoni/api-client @vocdoni/api-voting
```
:::

`client.processes` covers the voter-facing calls (authenticate, check eligibility, get the CSP
signature) and `VotingClient` does the rest - one call builds the envelope, signs it with the
ephemeral key and relays it:

```ts
import { VocdoniApiClient } from '@vocdoni/api-client'
import { EphemeralSigner, VotingClient } from '@vocdoni/api-voting'

const client = new VocdoniApiClient({ apiUrl: '{{API_BASE_URL}}' })
const voting = new VotingClient({ client })

// Both reported by the (public) process read.
const processId = '<processId>'
const chainId = '<chainId>'

// 1. Authenticate once - send exactly the fields the census requires. An
//    auth-only census (like this one) returns a verified token right away; a
//    2FA census confirms a one-time code first (see the note below).
const { authToken } = await client.processes.authStep0(processId, { memberNumber: 'A-101' })

// 2. Check where the voter stands - census membership plus, per question,
//    eligibility and that question's on-chain election id (upstreamId).
const { belongsToProcess, questions } = await client.processes.check(processId, { authToken })
const question = questions.find((q) => q.canVote && !q.hasVoted)
if (!belongsToProcess || !question?.upstreamId) throw new Error('nothing to vote on')

// 3. Fresh ephemeral key per ballot; the CSP signs its address for this
//    question's election. Refused unless the voter is in the question's
//    eligibility subset.
const signer = new EphemeralSigner()
const { signature, weight } = await client.processes.sign(processId, {
  authToken,
  electionId: question.upstreamId,
  payload: signer.address,
})

// 4. Build + sign the vote envelope locally, relay it, and poll for the receipt.
const jobId = await voting.vote({
  processId: question.upstreamId, // the vote goes to the question's election
  chainId,
  choices: [1], // the ballot - see Voting types for its shape per ballot type
  signer,
  cspSignature: signature,
  cspWeight: weight,
  // memo: 'Grace Hopper',   // only for an open-value choice - see below
})
const job = await client.jobs.waitFor(jobId)
console.log('voteID:', job.result?.voteID)
```

Repeat steps 3 and 4 for every question the voter is eligible for - the auth token and the check
from steps 1 and 2 are reused across all of them, but each ballot needs a **fresh
`EphemeralSigner`**. The returned `voteID` is the vote **nullifier** - the voter's receipt, which
they can use to [verify their vote on chain](#verifying-a-vote-on-chain). Once a question ends,
read its tally from [Results](/developers/docs/results).

> [!TIP] Multi-question processes: batch the signing and the relay
> Signing and relaying question by question leaves a window in which some ballots are on chain and
> the rest are not - a crash mid-loop leaves the voter half-voted. For multi-question processes the
> recommended path is the [batch flow below](#casting-a-multi-question-process-in-one-batch): one
> `sign-batch` call signs every ballot under the auth token, and one `POST /votes` call relays the
> envelopes together - the batch is accepted or rejected as a unit, and the job then reports each
> vote individually. The SDK wraps both: `client.processes.signBatch()` and
> `client.elections.voteBatch()`.

> [!NOTE] 2FA censuses
> When the census verifies voters by `email`/`phone`, step 0 sends a one-time code and returns a
> pending token. Confirm it before signing:
> `client.processes.authStep1(processId, { authToken, authData: ['123456'] })`. Need a new code?
> `client.processes.resend(processId, { authToken })`.

### Encrypted questions

A question created with `secretUntilTheEnd` keeps its ballots sealed until it ends. Fetch its
`encryptionKeys` from the public
[question read](/developers/docs/voting-processes#reading-a-process) and pass them to `vote()` -
the ballot is sealed automatically:

```ts
const { encryptionKeys } = await client.processes.getQuestion(processId, question.questionId)

const jobId = await voting.vote({
  // ...same options as above, plus:
  encryptionKeys,
})
```

The keykeepers publish the keys asynchronously, so `encryptionKeys` can be absent for a few seconds
right after publish - poll the question read until it is present before building the ballot.

### Open-value choices

When a question marks one choice with
[`openValue`](/developers/docs/voting-types#open-value-choices) - an "Other" option - a voter who
picks it can attach a free-text **memo** to their ballot. The flag is on the public question read, so
the voter app finds the open choice and renders a text input for it without authenticating:

```ts
const { choices } = await client.processes.getQuestion(processId, question.questionId)
// `openValue` is sent by the API but not yet in the SDK's Choice type; cast until it lands
const openChoice = choices.find((c) => (c as { openValue?: boolean }).openValue)
if (!openChoice) return // this question has no open-value choice

const jobId = await voting.vote({
  // ...same options as above, plus:
  // singlechoice ballot selecting the open choice; multichoice and cumulative select it
  // differently (one field per option) - see Voting types for the per-type ballot shape
  choices: [openChoice.value],
  memo: 'Grace Hopper',
})
```

Two things decide whether that memo ever reaches an organizer:

- **The ballot has to select the open choice.** A memo sent alongside any other selection is dropped
  from the results - silently, with no error at cast time. So a UI that shows the text box should also
  select the open choice, or refuse to submit. How the ballot selects it depends on the type
  (singlechoice sets the field to its value, multichoice to `1`, cumulative to any credit) - see
  [Voting types](/developers/docs/voting-types).
- **It has to fit.** The cap is **256 bytes** (the memo's UTF-8 encoding) - bytes, not characters, so
  accented or CJK text runs out sooner (~85 emoji). The chain **rejects the whole vote transaction** if
  it is exceeded, not just the memo, so the SDK checks `MAX_MEMO_BYTES` and throws before the CSP
  signature is spent.

The memo is one string per ballot, so a process with several open-value questions carries one memo per
question, each on its own vote.

> [!WARNING] Memos are cleartext, even on secret questions
> The memo rides on the vote envelope, not inside the vote package - and only the package is
> encrypted. On a `secretUntilTheEnd` question the ballot is sealed but **the memo is not**: it is
> readable on chain from the moment the vote lands. Free text is also self-identifying more often than
> voters expect ("as the treasurer, I think..."), which can undo the anonymity of the ballot it rides
> with. Treat a memo as public input, tell voters so, and never collect sensitive detail through it.
> If a memo genuinely must stay confidential, encrypt the text client-side before casting: the protocol
> treats the field as opaque, so ciphertext (encoded to fit the 256-byte cap, which leaves less room
> than plain text) rides through unchanged, and only a holder of your key can read it back from the
> results.

> [!TIP] Building with React
> `@vocdoni/react-providers` wraps this whole flow in context providers and hooks that authenticate,
> sign and relay for you. Its `vote(encodedBallots, memos?)` takes one optional memo per question and
> validates the count and the byte cap up front, before any single-use CSP signature is spent. In
> `@vocdoni/react-components`, registering reserved `memo.0`, `memo.1`, ... fields in the questions
> form collects them automatically - no memo input is rendered by default, you add one where you want
> it. See the [SDK repository]({{SDK_URL}}) and the
> [SDK quickstart](/developers/docs/sdk-quickstart).

## Casting a multi-question process in one batch

A multi-question process is one on-chain election per question, so the voter holds one ballot per
question. Two public endpoints take them together, so a rejected batch never leaves the voter
half-voted.

With the SDK, batch-sign first, then build each envelope and relay them together:

```ts
import { JobFailedError } from '@vocdoni/api-client'
import { EphemeralSigner, buildVoteTransaction } from '@vocdoni/api-voting'

// One fresh ephemeral signer per question, then one sign call for all of them.
const votable = questions.filter((q) => q.canVote && !q.hasVoted)
const signers = new Map(votable.map((q) => [q.upstreamId!, new EphemeralSigner()]))
const { signatures } = await client.processes.signBatch(processId, {
  authToken,
  ballots: votable.map((q) => ({ upstreamId: q.upstreamId!, address: signers.get(q.upstreamId!)!.address })),
})

// Build one envelope per signed entry - match by upstreamId, never by position -
// then relay them together and poll the single relay_votes job.
const votes = signatures
  .filter((s) => s.signature)
  .map((s) => ({
    txPayload: buildVoteTransaction({
      processId: s.upstreamId, // the question's on-chain election id, not the SaaS processId
      chainId, choices: [1],
      signer: signers.get(s.upstreamId)!, cspSignature: s.signature!, cspWeight: s.weight!,
    }),
  }))
if (!votes.length) throw new Error('no ballot was signed - nothing to relay')

// A partially failed relay settles the job as failed, but the job still
// reports every vote - read the outcomes off the error instead of losing the
// nullifier/voteID of the ballots that did land.
const { jobId } = await client.elections.voteBatch({ votes })
try {
  await client.jobs.waitFor(jobId)
} catch (err) {
  if (!(err instanceof JobFailedError)) throw err
  console.log(err.job.result?.votes) // per-vote voteID, or the reason it failed
}
```

> [!NOTE] Relay what was signed, even on partial failure
> A CSP signature is **one-shot**: if some entries come back with an inline `error` instead of a
> `signature`, still relay the ballots that did sign - discarding them would strand those questions
> (a retry signs a fresh address and gets `already_consumed`). Report the failed questions to the
> voter instead of retrying the whole batch blindly. The React providers implement exactly this:
> `useElectionAuth().signBatch()` and the provider's `vote()` batch natively and surface per-question
> refusals via `PartialVoteError`.

Under the hood these are two public endpoints, callable from any client:

**1. Sign every ballot in one call.** `POST /processes/{processId}/sign-batch` is the batch form of
`/sign`: one verified `authToken`, one entry per question. Each ballot names its question by the
on-chain election id (`upstreamId`, as returned by `check` and `sign-info`) and the ephemeral voter
address to sign for it:

```bash
curl -X POST "$B/processes/$PROCESS/sign-batch" \
  -H "Content-Type: application/json" \
  -d '{ "authToken": "<authToken>", "ballots": [
        { "upstreamId": "<upstreamId question 1>", "address": "<hex ephemeral address 1>" },
        { "upstreamId": "<upstreamId question 2>", "address": "<hex ephemeral address 2>" } ] }'
# -> { "signatures": [
#       { "upstreamId": "<upstreamId question 1>", "signature": "<csp-signature>", "weight": "01" },
#       { "upstreamId": "<upstreamId question 2>", "signature": "<csp-signature>", "weight": "01" } ] }
```

The batch is **authorized as a unit and signs nothing on failure**: every ballot must name an
election of this process the voter is eligible for (`401` otherwise), carry a voter address, and no
election may be repeated (`400`). Once authorized, every ballot is signed and the response is always
a `200` with one entry per request item, in order - a `signature` plus `weight`, or a stable `code`
with an `error` message. Retry **only** the entries whose code is retryable (`already_signing`,
`sign_failed`); re-sending the whole batch re-signs the ballots that already succeeded, and each
re-sign spends the election's finite overwrite budget (10). `already_consumed` is not retryable,
and `auth_invalid` means the token was invalidated mid-batch - authenticate again.

**2. Relay every envelope in one call.** Build and sign each vote envelope locally (a fresh
ephemeral key per ballot, as usual), then relay them together with `POST /votes` instead of one
`POST /vote` per question:

```bash
curl -X POST "$B/votes" \
  -H "Content-Type: application/json" \
  -d '{ "votes": [ { "txPayload": "<hex envelope question 1>" },
                   { "txPayload": "<hex envelope question 2>" } ] }'
# -> 202 Accepted   { "jobId": "<jobId>" }
```

The batch is validated synchronously and **enqueued all or nothing** - one undecodable envelope, a
batch spanning two organizations, or a queue without room for all of them rejects the call with
nothing relayed (at most 100 votes per call; each envelope's body is capped at 8 KiB). The single
`jobId` covers the whole batch as a `relay_votes` [job](/developers/docs/jobs) whose result reports
every envelope in request order - each entry carries its `processId` and `nullifier` (known while
the job is still pending) plus the chain-assigned `voteID` once that vote is accepted, or the
reason it failed:

```bash
curl -s "$B/jobs/<jobId>"
# -> { "type": "relay_votes", "status": "completed",
#      "result": { "total": 2, "added": 2, "progress": 100,
#        "votes": [
#          { "processId": "<upstreamId 1>", "nullifier": "<hex>", "voteID": "<hex>", "status": "completed" },
#          { "processId": "<upstreamId 2>", "nullifier": "<hex>", "voteID": "<hex>", "status": "completed" } ] } }
```

## Anonymous voting with blind signatures

When the census was created with [`anonymous: true`](/developers/docs/census#anonymous-voting), the
CSP signs each ballot **blind** - it signs a message it cannot read, so it cannot link the
authorization to the vote that lands on chain. Authentication (`auth/0`, `auth/1`, resend) and the
relay (`POST /votes`) are exactly the same as above; only the signing step differs. The two flows
never mix: `sign` and `sign-batch` return `400` on an anonymous process, and the blind endpoints
return `400` on a plain one.

With the SDK, `signBlindCspBallots()` from `@vocdoni/api-voting` runs the whole exchange - both
rounds plus the blinding and unblinding - and returns the same result shape as a plain batch sign,
so the rest of the flow (build, relay) is unchanged:

```ts
import {
  signBlindCspBallots, EphemeralSigner, buildVoteTransaction, ProofCA_Type,
} from '@vocdoni/api-voting'

const signers = new Map(votable.map((q) => [q.upstreamId!, new EphemeralSigner()]))
const results = await signBlindCspBallots({
  processId, // the process id - the blind endpoints are process-scoped
  authToken,
  client,
  ballots: votable.map((q) => ({ upstreamId: q.upstreamId!, address: signers.get(q.upstreamId!)!.address })),
})

const votes = results
  .filter((r) => r.signature)
  .map((r) => ({
    txPayload: buildVoteTransaction({
      processId: r.upstreamId, // the question's on-chain election id, not the SaaS processId
      chainId, choices: [1],
      signer: signers.get(r.upstreamId)!,
      cspSignature: r.signature!, // 96-byte blind signature, not the usual 65
      cspWeight: r.weight!,       // pass back verbatim - it is bound into the signature
      proofType: ProofCA_Type.ECDSA_BLIND_PIDSALTED,
    }),
  }))
const { jobId } = await client.elections.voteBatch({ votes })
```

React apps need nothing at all: `useElectionAuth().signBatch()` picks the plain or blind flow from
`census.anonymous` by itself - an anonymous process votes anonymously.

### The two rounds

Without the SDK, the exchange is two batch-only endpoints (there is no single-election blind
endpoint - authorization is checked once per batch, under the same rules as `sign-batch`):

- **POST** `/processes/{processId}/blind-point`
- **POST** `/processes/{processId}/blind-sign`

**Round 1** requests one blind point per election. It is atomic and **idempotent** - repeating it
returns the same point, so a crashed client can resume safely:

```bash
curl -X POST "$B/processes/$PROCESS/blind-point" \
  -H "Content-Type: application/json" \
  -d '{ "authToken": "<authToken>", "electionIds": [ "<upstreamId 1>", "<upstreamId 2>" ] }'
# -> { "points": [
#       { "upstreamId": "<upstreamId 1>", "tokenR": "<hex point>", "weight": "01" },
#       { "upstreamId": "<upstreamId 2>", "tokenR": "<hex point>", "weight": "01" } ] }
```

Only the batch **authorization** is all-or-nothing: round 1 also reports **per-election issuance
failures inline**, as an entry carrying a `code` instead of `tokenR`/`weight` - so match points by
`upstreamId` and check both fields are present before blinding.

The client then **blinds locally**: for each ballot, hash the CA bundle (the election id, the
ephemeral voter address, and the `weight` returned above, verbatim) and blind that hash with the
election's `tokenR`. **Round 2** sends the blinded messages for signing:

```bash
curl -X POST "$B/processes/$PROCESS/blind-sign" \
  -H "Content-Type: application/json" \
  -d '{ "authToken": "<authToken>", "ballots": [
        { "upstreamId": "<upstreamId 1>", "blindedMessage": "<hex>" },
        { "upstreamId": "<upstreamId 2>", "blindedMessage": "<hex>" } ] }'
# -> { "signatures": [
#       { "upstreamId": "<upstreamId 1>", "signature": "<blind signature>", "weight": "01" },
#       { "upstreamId": "<upstreamId 2>", "error": "...", "code": "already_consumed" } ] }
```

Per-entry failures come back inline with the same stable codes as `sign-batch`, plus two blind-only
ones: `blind_request_missing` (no round 1 for that election) and `invalid_blinded_message`. The
client unblinds each signature, assembles the CA proof, and relays through the
[batch flow](#casting-a-multi-question-process-in-one-batch) as usual.

> [!WARNING] What is safe to retry
> An entry **reported as failed** in round 2 never consumed its one-time signing nonce - but
> nonce-safe does not mean worth retrying. Retry only the retryable codes: `already_signing` and
> `sign_failed` as-is, and `invalid_blinded_message` after re-blinding against the **same**
> round-1 point (round 1 is idempotent and returns it again). `already_consumed` and
> `address_mismatch` are terminal, `auth_invalid` means authenticate again, and
> `blind_request_missing` means run round 1 for that election first. An entry that came back
> **signed** is one-shot: its nonce is spent, and a rerun blinds under a fresh secret - the
> signature you already hold is the only usable one. A **lost round-2 response** is an unknown
> outcome, not a retryable one: check the voter's [`sign-info`](#voter-status) state instead of
> re-signing blind.

For readers cross-referencing the chain: an anonymous process publishes under census origin
`OFF_CHAIN_CA_V2` and its ballots carry `ECDSA_BLIND_PIDSALTED` proofs. The blinding math mirrors
`go-blindsecp256k1` byte for byte; the [voting package source]({{SDK_URL}}) is the reference
implementation, and its primitives (`blind`, `unblind`, `decompressBlindPoint`,
`serializeBlindSignature`) are exported for custom flows.

> [!NOTE] No receipts survive the session
> For an anonymous census, `sign-info` omits `address` and `nullifier` - the CSP never learns them,
> which is the point. Vote ids exist only in the session that cast them, so persist the nullifiers
> client-side if the voter needs a [verifiable receipt](#verifying-a-vote-on-chain) after a reload.

## Verifying a vote on chain

The nullifier is the voter's receipt, and `POST /votes/verify` (public) turns it into an on-chain
confirmation - the endpoint a receipt screen calls. It takes up to 100 nullifiers (one per question
of a multi-question process) and answers synchronously, per nullifier and in request order, whether
the chain knows that vote:

```bash
curl -X POST "$B/votes/verify" \
  -H "Content-Type: application/json" \
  -d '{ "nullifiers": [ "<nullifier question 1>", "<nullifier question 2>" ] }'
```

```jsonc
{ "votes": [
  { "nullifier": "<hex>", "verified": true,
    "processId": "<on-chain election id>", "txHash": "<hex>",
    "blockHeight": 123456, "date": "2026-07-30T12:00:00Z" },
  { "nullifier": "<hex>", "verified": false }   // receipt fields absent when not found
] }
```

`verified: false` means the chain has no vote with that nullifier (yet) - right after relaying,
poll the [job](/developers/docs/jobs) first and verify once it completes.

## Voter status

Public helpers let a UI show a voter where they stand without casting anything. Each identifies the
voter by their verified `authToken`:

- **POST** `/processes/{processId}/check` (`client.processes.check`) - voter status:
  `belongsToProcess`, `weight`, and per question `{ questionId, upstreamId, canVote, hasVoted }`.
  Ineligibility is `belongsToProcess: false` with a `200`, not an error.
- **POST** `/processes/{processId}/weight` (`client.processes.weight`) - the voter's vote weight.
- **POST** `/processes/{processId}/sign-info` (`client.processes.signInfo`) - the voter's receipts:
  per **voted** question its `{ questionId, upstreamId, address, nullifier, at }`. On an
  [anonymous census](/developers/docs/census#anonymous-voting) the entries omit `address` and
  `nullifier` - the CSP never learns them.

```bash
curl -X POST "$B/processes/$PROCESS/check" -d '{ "authToken": "<authToken>" }'
# -> { "belongsToProcess": true, "weight": "1",
#      "questions": [ { "questionId": "...", "upstreamId": "...", "canVote": true, "hasVoted": false } ] }
```

Looking up whether specific members voted is an admin task, not a voter one:

- **GET** `/processes/{processId}/participants` (`client.elections.participants()`) - requires a
  manager/admin of the owning organization. Matches organization members by one field (`email`,
  `phone`, `memberNumber` or `nationalId`) and reports each match's per-question voted status.
- **GET** `/processes/{processId}/participants/{participantId}` - public, but a placeholder for
  now: it validates the ids and always returns `null`.

## Doing the signing yourself

Not using the SDK - a non-JS client, or you want to audit what goes on the wire? Everything above
reduces to the REST calls below plus building and signing the envelope: generate an ephemeral
secp256k1 keypair, build the protobuf `VoteEnvelope` carrying the CSP (CA) proof, and sign the
transaction with an EIP-191 `personal_sign` signature. The
[voting package source]({{SDK_URL}}) is the reference implementation.

```bash
# a) Authenticate (step 0) - send exactly the fields the census requires (authFields and/or the
#    email/phone used for the code). Here an auth-only census by memberNumber; a mail census would
#    send { "email": "voter@example.org" }. Auth-only censuses are verified here and there is no code.
curl -X POST "$B/processes/$PROCESS/auth/0" \
  -H "Content-Type: application/json" \
  -d '{ "memberNumber": "A-101" }'
# -> { "authToken": "<authToken>" }

# 2FA censuses only: submit the emailed/SMS one-time code (authData[0] is the code).
# Need a new code? POST /processes/$PROCESS/auth/resend with the authToken.
curl -X POST "$B/processes/$PROCESS/auth/1" \
  -H "Content-Type: application/json" \
  -d '{ "authToken": "<authToken>", "authData": ["123456"] }'

# b) The CSP signs the ephemeral address for one question's election (electionId = its upstreamId).
#    Refused unless the voter is in that question's eligibility subset.
curl -X POST "$B/processes/$PROCESS/sign" \
  -H "Content-Type: application/json" \
  -d '{ "authToken": "<authToken>", "electionId": "<upstreamId>", "payload": "<hex ephemeral address>" }'
# -> { "signature": "<csp-signature>", "weight": "1" }

# c) Build + sign the protobuf Vote envelope locally, hex-encode the SignedTx, then relay it (async).
curl -X POST "$B/vote" \
  -H "Content-Type: application/json" \
  -d '{ "txPayload": "<hex of the signed Vote envelope>" }'
# -> 202 Accepted   { "jobId": "<jobId>" }

curl -s "$B/jobs/<jobId>"
# -> { "status": "completed",
#      "result": { "processId": "<upstreamId>", "nullifier": "<hex>", "voteID": "<nullifier>" } }
```

The job carries the target `processId` and the vote `nullifier` from creation - both derived from
the envelope, so they are readable while the job is still pending - and the chain-assigned `voteID`
once the vote is accepted.

Repeat steps **b** and **c** for every question the voter is eligible for; the auth token from step
**a** is reused across all of them. For a multi-question process, prefer the batch endpoints - one
`POST /processes/{processId}/sign-batch` for step **b** and one `POST /votes` for step **c** - so
the questions are signed under a single authorization and relayed all or nothing (see
[the batch flow](#casting-a-multi-question-process-in-one-batch)).

> [!NOTE] What is in the envelope
> The vote package inside the envelope is `{"votes":[<choice>]}` - for example `{"votes":[1]}`. Building
> and signing the envelope is exactly what the SDK does for you above. See
> [Voting types](/developers/docs/voting-types) for how the choices array is shaped per ballot type.
>
> A memo for an [open-value choice](#open-value-choices) is the envelope's own `memo` field
> (`VoteEnvelope.memo`, from `@vocdoni/proto` 1.15.13 on) - a sibling of the vote package, not part of
> it. The chain caps it at **256 bytes** and **rejects the entire vote** past that - the transaction is
> refused at mempool admission, so the ballot is lost, not just the note. The saas API relays the
> signed envelope without checking, so the node is the only enforcement point: **validate the byte
> length client-side** to fail before the CSP signature is spent, exactly as the SDK does above. The
> field is opaque - the chain checks length only, not encoding - so measure the UTF-8 byte length, not
> the character count.

> [!NOTE] Encrypted (secret-until-the-end) questions
> For a question created with `secretUntilTheEnd`, seal the vote package with the question's
> **`encryptionKeys`** before building the envelope. Read them from the
> [question read](/developers/docs/voting-processes#reading-a-process): the field is **absent until the
> keykeepers publish the keys**, so poll the question until `encryptionKeys` is present, then encrypt
> with them.
