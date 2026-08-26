---
title: Casting votes
lead: How a voter actually votes - authenticate once against the process census, get the credential service to blind-sign a ballot per question, then relay the signed envelope. The SDK's voting package does the signing for you; the SaaS forwards the ballot without ever decoding it.
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
2. **Blind-sign per question** - for each question, the credential service (CSP) blind-signs the
   voter's ephemeral voting address for **that question's election**. It refuses unless the voter is
   in the question's [eligibility subset](/developers/docs/census#per-question-eligibility). Signatures
   are salted per election, so one cannot be replayed on another question.
3. **Build and sign** - the voter builds the protobuf vote envelope and signs it locally with the
   ephemeral key.
4. **Relay** - the signed envelope is relayed (asynchronously) to the protocol, which returns a vote
   receipt (nullifier).

Steps 1 and 2 are plain REST calls, wrapped by the API client as `client.processes`; steps 3 and 4
are the cryptography `@vocdoni/api-voting` implements.

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
they can use to verify their vote was counted. Once a question ends, read its tally from
[Results](/developers/docs/results).

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

## Voter status

Public helpers let a UI show a voter where they stand without casting anything. Each identifies the
voter by their verified `authToken`:

- **POST** `/processes/{processId}/check` (`client.processes.check`) - voter status:
  `belongsToProcess`, `weight`, and per question `{ questionId, upstreamId, canVote, hasVoted }`.
  Ineligibility is `belongsToProcess: false` with a `200`, not an error.
- **POST** `/processes/{processId}/weight` (`client.processes.weight`) - the voter's vote weight.
- **POST** `/processes/{processId}/sign-info` (`client.processes.signInfo`) - the voter's receipts:
  per **voted** question its `{ questionId, upstreamId, address, nullifier, at }`.

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

# b) CSP blind-signs the ephemeral address for one question's election (electionId = its upstreamId).
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
# -> { "status": "completed", "result": { "voteID": "<nullifier>" } }
```

Repeat steps **b** and **c** for every question the voter is eligible for; the auth token from step
**a** is reused across all of them.

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
