---
title: Casting votes
lead: How a voter actually votes - authenticate against the census, get the credential service to blind-sign an ephemeral key, build and sign the vote envelope, and relay it. The SaaS forwards the ballot without ever decoding it.
group: core_concepts
order: 45
---

Casting a vote is the only step with client-side cryptography. Everything else in the API is a plain REST call; here the voter signs their own ballot so the SaaS never sees how they voted. The [SDK]({{SDK_URL}}) does the signing for you - the raw REST flow is shown below it for reference.

## The flow

1. **Bundle** - a process bundle ties a published census to one or more processes; voters authenticate against the bundle.
2. **Authenticate** - the voter proves membership with their census auth fields, plus a second factor for 2FA censuses.
3. **Blind-sign** - the credential service (CSP) blind-signs the voter's ephemeral voting address, so eligibility is proven without linking the voter to their ballot.
4. **Build and sign** - the voter builds the protobuf vote envelope and signs it locally with the ephemeral key.
5. **Relay** - the signed envelope is relayed (asynchronously) to the protocol, which returns a vote receipt.

## Create a bundle

Voters authenticate against a bundle, not a bare census. Create one from a published census and the processes it should cover. See [Voting processes](/developers/docs/voting-processes) for bundling several elections together.

```bash
curl -X POST {{API_BASE_URL}}/process/bundle \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{ "censusId": "<censusId>", "processes": ["'"$PROCESS"'"] }'
# -> { "root": "...", "uri": ".../process/bundle/<bundleId>" }
```

The bundle id is the last path segment of the returned `uri`.

## Cast a vote with the SDK

Recommended - the SDK handles the envelope signing for you.

```ts
import { VocdoniApiClient } from '@vocdoni/api-client'
import { buildVoteTransaction, EphemeralSigner } from '@vocdoni/api-voting'

const client = new VocdoniApiClient({ apiUrl: '{{API_BASE_URL}}' })

const bundle = await client.bundle.get(bundleId)
const { authToken } = await client.bundle.authStep0(bundleId, { memberNumber: 'P001' })
// 2FA censuses: solve the emailed/SMS code with client.bundle.authStep1(bundleId, { authToken, authData: [code] })

const signer = new EphemeralSigner()
const sign = await client.bundle.sign(bundleId, { authToken, electionId: processId, payload: signer.address })

const txPayload = buildVoteTransaction({
  processId,
  choices: [1],
  chainId: bundle.chainId,
  signer,
  cspSignature: sign.signature,
  cspWeight: sign.weight,
})

const { jobId } = await client.elections.vote({ txPayload })
const job = await client.jobs.waitFor(jobId)
// job.result.voteID -> the vote nullifier (receipt)
```

## Cast a vote with raw REST

Use this if you sign the protobuf vote envelope yourself.

```bash
# a) Authenticate (step 0). 2FA censuses then post the code to .../auth/1 with { authToken, authData: ["<code>"] }
curl -X POST {{API_BASE_URL}}/process/bundle/<bundleId>/auth/0 \
  -H "Content-Type: application/json" \
  -d '{ "name": "Alice", "surname": "Smith", "memberNumber": "P001", "email": "alice@example.com" }'
# -> { "authToken": "<authToken>" }

# b) Blind-sign the voter's ephemeral address with the CSP
curl -X POST {{API_BASE_URL}}/process/bundle/<bundleId>/sign \
  -H "Content-Type: application/json" \
  -d '{ "authToken": "<authToken>", "electionId": "'"$PROCESS"'", "payload": "<hex voter address>" }'
# -> { "signature": "<csp-signature>", "weight": "1" }

# c) Build + sign the protobuf Vote envelope locally, hex-encode the SignedTx, then relay it (async)
curl -X POST {{API_BASE_URL}}/vote \
  -H "Content-Type: application/json" \
  -d '{ "txPayload": "<hex of the signed Vote envelope>" }'
# -> 202 Accepted   { "jobId": "<jobId>" }

curl {{API_BASE_URL}}/jobs/<jobId>
# -> { "status": "completed", "result": { "voteID": "<nullifier>" } }
```

> [!NOTE] What is in the envelope
> The vote package inside the envelope is `{"votes":[<choice>]}` - for example `{"votes":[1]}`. Building and signing the envelope is exactly what `buildVoteTransaction` does for you in the SDK path above. See [Voting types](/developers/docs/voting-types) for how the choices array is shaped per ballot type.

The returned `voteID` is the vote nullifier - the voter's receipt, which they can use to verify their vote was counted. Once the process ends, read the tally from [Results](/developers/docs/results).
