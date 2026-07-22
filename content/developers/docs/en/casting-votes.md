---
title: Casting votes
lead: How a voter actually votes - authenticate once against the process census, get the credential service to blind-sign a ballot per question, then relay the signed envelope. The SaaS forwards the ballot without ever decoding it.
group: core_concepts
order: 45
---

Casting a vote is the only step with client-side cryptography. Everything else in the API is a plain
REST call; here the voter signs their own ballot so the SaaS never sees how they voted. A client
library can do the signing for you (see the [SDK]({{SDK_URL}})); the raw REST flow is documented below.

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

The voter-facing endpoints are **public** - they carry no API key. The voter needs the `apiUrl`, the
`processId`, and each question's `upstreamId` (from the [process read](/developers/docs/voting-processes#reading-a-process)).

## Cast a vote

Sign the protobuf vote envelope yourself and relay it.

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
> and signing the envelope is what a client library does for you. See
> [Voting types](/developers/docs/voting-types) for how the choices array is shaped per ballot type.

> [!NOTE] Encrypted (secret-until-the-end) questions
> For a question created with `secretUntilTheEnd`, seal the vote package with the question's
> **`encryptionKeys`** before building the envelope. Read them from the
> [question read](/developers/docs/voting-processes#reading-a-process): the field is **absent until the
> keykeepers publish the keys**, so poll the question until `encryptionKeys` is present, then encrypt
> with them.

## Voter status

Public helpers let a UI show a voter where they stand without casting anything. Each identifies the
voter by their verified `authToken`:

- **POST** `/processes/{processId}/check` - voter status: `belongsToProcess`, `weight`, and per question
  `{ questionId, upstreamId, canVote, hasVoted }`. Ineligibility is `belongsToProcess: false` with a
  `200`, not an error.
- **POST** `/processes/{processId}/weight` - the voter's vote weight.
- **POST** `/processes/{processId}/sign-info` - the voter's receipts: per **voted** question its
  `{ questionId, upstreamId, address, nullifier, at }`.

```bash
curl -X POST "$B/processes/$PROCESS/check" -d '{ "authToken": "<authToken>" }'
# -> { "belongsToProcess": true, "weight": "1",
#      "questions": [ { "questionId": "...", "upstreamId": "...", "canVote": true, "hasVoted": false } ] }
```

Participant info (by member id, not auth token) is also public:

- **GET** `/processes/{processId}/participants` - list the process's voted participants.
- **GET** `/processes/{processId}/participants/{participantId}` - one participant.

The returned `voteID` is the vote nullifier - the voter's receipt, which they can use to verify their
vote was counted. Once a question ends, read its tally from [Results](/developers/docs/results).
