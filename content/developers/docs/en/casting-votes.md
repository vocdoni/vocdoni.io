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
3. **Blind-sign** - the credential service (CSP) blind-signs the voter's ephemeral voting address, so eligibility is proven without linking the voter to their ballot. Each token can sign each process once - no double-voting.
4. **Build and sign** - the voter builds the protobuf vote envelope and signs it locally with the ephemeral key.
5. **Relay** - the signed envelope is relayed (asynchronously) to the protocol, which returns a vote receipt.

## Create a bundle

Voters authenticate against a bundle, not a bare census. Create one from a published census and the processes it should cover. See [Voting processes](/developers/docs/voting-processes) for bundling several elections together.

```bash
BUNDLE_URI=$(curl -s "${auth[@]}" -X POST "$B/process/bundle" \
  -d "{\"censusId\":\"$CENSUS\",\"processes\":[\"$PROCESS\"]}" | jq -r .uri)
BUNDLE="${BUNDLE_URI##*/}"   # bundleId is the last path segment
```

This is the only authenticated call in the flow; the voter-facing steps below are public.

## Cast a vote with the SDK

Recommended - in practice you don't call the voter-facing endpoints by hand. The SDK resolves the
on-chain id, generates the ephemeral identity, encodes the ballot, signs, relays, and polls. You need
the **apiUrl**, the **bundleId**, and the **ProcessID**.

```ts
import { VocdoniApiClient } from '@vocdoni/api-client'
import { VotingClient, EphemeralSigner } from '@vocdoni/api-voting'

const client = new VocdoniApiClient({ apiUrl: '{{API_BASE_URL}}' })
const voting = new VotingClient({ client })

// 1. authenticate against the bundle (auth/sign flow lives in api-client)
const bundle = await client.bundle.get(bundleId)
let { authToken } = await client.bundle.authStep0(bundleId, { memberNumber })
if ((bundle.census?.twoFaFields?.length ?? 0) > 0)
  ({ authToken } = await client.bundle.authStep1(bundleId, { authToken, authData: [otp] }))

// 2. the CSP signs the voter's ephemeral address for the election
const election = await client.elections.get(processId)   // processId = the 24-hex ProcessID
const signer = new EphemeralSigner()
const { signature: cspSignature } = await client.bundle.sign(
  bundleId, { authToken, electionId: election.address, payload: signer.address })

// 3. build, sign and relay in one call -> async job id
const jobId = await voting.vote({
  processId: election.address,
  chainId: election.chainId,   // Vochain chain id the vote is destined for
  choices,                     // ballot array - see Voting types
  signer,                      // ephemeral signer whose address the CSP signed
  cspSignature,                // signature from the bundle sign endpoint
})
const nullifier = (await client.jobs.waitFor(jobId)).result?.voteID
```

The `@vocdoni/api-voting` package also exports `buildVotePackage`, `buildVoteTransaction` and
`BallotEncryptor` for lower-level control - including encrypting the ballot for secret-until-the-end
elections. See the [SDK]({{SDK_URL}}) for those.

## Cast a vote with raw REST

Use this if you sign the protobuf vote envelope yourself. The auth, sign and relay endpoints are
public - they carry no API key.

```bash
# a) Authenticate (step 0) - send exactly the fields the census authFields require.
#    Auth-only censuses are verified here and there is no code.
curl -X POST "$B/process/bundle/$BUNDLE/auth/0" \
  -H "Content-Type: application/json" \
  -d '{ "memberNumber": "A-101" }'
# -> { "authToken": "<authToken>" }

# 2FA censuses only: submit the emailed/SMS one-time code (authData[0] is the code)
curl -X POST "$B/process/bundle/$BUNDLE/auth/1" \
  -H "Content-Type: application/json" \
  -d '{ "authToken": "<authToken>", "authData": ["123456"] }'

# b) CSP blind-signs the voter's ephemeral address for the election. Each token signs each process once.
curl -X POST "$B/process/bundle/$BUNDLE/sign" \
  -H "Content-Type: application/json" \
  -d '{ "authToken": "<authToken>", "electionId": "'"$PROCESS"'", "payload": "<hex ephemeral address>" }'
# -> { "signature": "<csp-signature>", "weight": "1" }

# c) Build + sign the protobuf Vote envelope locally, hex-encode the SignedTx, then relay it (async)
curl -X POST "$B/vote" \
  -H "Content-Type: application/json" \
  -d '{ "txPayload": "<hex of the signed Vote envelope>" }'
# -> 202 Accepted   { "jobId": "<jobId>" }

curl -s "$B/jobs/<jobId>"
# -> { "status": "completed", "result": { "voteID": "<nullifier>" } }
```

> [!NOTE] What is in the envelope
> The vote package inside the envelope is `{"votes":[<choice>]}` - for example `{"votes":[1]}`. Building and signing the envelope is exactly what the SDK's `vote()` does for you in the path above. See [Voting types](/developers/docs/voting-types) for how the choices array is shaped per ballot type.

The returned `voteID` is the vote nullifier - the voter's receipt, which they can use to verify their vote was counted. Once the process ends, read the tally from [Results](/developers/docs/results).
