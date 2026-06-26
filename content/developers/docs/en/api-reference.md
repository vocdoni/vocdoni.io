---
title: API reference
lead: A working end-to-end walkthrough of the SaaS API - authenticate, create an organization, add members, build a census, create and publish a voting process, cast a vote, and read the results. Every call is a plain REST request; only the vote envelope needs client-side signing, shown here with both raw REST and the SDK.
group: api_reference
order: 10
---

## Base URL and authentication

All endpoints share one base URL. Authenticated endpoints expect an Authorization header with a bearer token in JWT format, obtained by logging in or from an API key.

```bash
# Base URL
{{API_BASE_URL}}

# Authenticated request
curl {{API_BASE_URL}}/organizations/$ORG \
  -H "Authorization: Bearer $TOKEN"
```

> [!NOTE] Confirm your base URL
> Use the production host shown in your API Dashboard. The examples in these docs use a representative base URL.

## Conventions

A few rules hold across the whole API:

- **Two process identifiers, do not mix them.** A `draftId` is the 24-hex database id of a draft process, returned when you create it. A `processId` is the 64-hex on-chain election id, assigned when you publish. Organizer CRUD uses the `draftId`; voting and reading results use the `processId`.
- **Addresses and ids are hex strings** (for example `0x1234...` for an organization address).
- **Some operations are asynchronous.** Publishing a process, changing its status and relaying a vote return `202 Accepted` with a `{ "jobId": "..." }` body. Poll `GET /jobs/{jobId}` until `status` is no longer `pending`, then read the outcome from `result`.

## Pagination

List endpoints accept page and limit query parameters and wrap results with a pagination object. Some lists also accept a search term or a type filter.

| Field | Type | Description |
| --- | --- | --- |
| `currentPage` | integer | The page you requested. |
| `previousPage` | integer | The previous page, when there is one. |
| `nextPage` | integer | The next page, when there is one. |
| `lastPage` | integer | The final page available. |
| `totalItems` | integer | Total items across all pages. |

## Errors

Errors return a consistent shape with an application code, the HTTP status and a message. Use httpstatus for control flow and code for precise handling.

```json
{
  "code": 40001,
  "httpstatus": 400,
  "error": "invalid census id",
  "logLevel": "debug"
}
```

## End-to-end example

This walkthrough runs a full election lifecycle. Each step assumes `$TOKEN` holds the JWT from step 1 and reuses ids returned by earlier steps.

### 1. Authenticate

```bash
curl -X POST {{API_BASE_URL}}/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "email": "you@example.com", "password": "your-password" }'
# -> { "token": "<JWT>", "expirity": "2026-07-01T09:00:00Z" }

TOKEN=<JWT>
```

### 2. Create an organization

`provisionAccount: true` makes the SaaS forge the organization's on-chain account automatically, so you never touch a transaction.

```bash
curl -X POST {{API_BASE_URL}}/organizations \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{ "type": "company", "website": "https://acme.example", "provisionAccount": true }'
# -> { "address": "0x1234...", "type": "company", ... }

ORG=0x1234...
```

> [!NOTE] Publishing needs an active plan
> A process can only be published once the organization has an active subscription. Pick a plan from `GET /plans` and complete checkout from your API Dashboard before step 5.

### 3. Add members

Members are the people who can later be placed in a census. Add them in one call, then read them back to get the server-assigned ids.

```bash
curl -X POST {{API_BASE_URL}}/organizations/$ORG/members \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{
    "members": [
      { "memberNumber": "P001", "name": "Alice", "surname": "Smith",
        "email": "alice@example.com", "nationalId": "DNI001", "weight": "1" }
    ]
  }'
# -> { "added": 1, "jobId": "" }

curl "{{API_BASE_URL}}/organizations/$ORG/members?limit=100" \
  -H "Authorization: Bearer $TOKEN"
# -> { "members": [ { "id": "665f...", "memberNumber": "P001", ... } ], "pagination": { ... } }
```

> For large imports, add `?async=true` to the POST and follow progress at `GET /organizations/{address}/members/job/{jobid}`.

### 4. Create a census

A SaaS census is CSP-based: voters prove membership against a credential service rather than a Merkle tree. Declare which member fields authenticate a voter (`authFields`) and which deliver the second factor (`twoFaFields`), group the members you want to include, then publish.

```bash
# a) Create the census
curl -X POST {{API_BASE_URL}}/census \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{
    "orgAddress": "'"$ORG"'",
    "authFields": ["name", "surname", "memberNumber"],
    "twoFaFields": ["email"]
  }'
# -> { "id": "<censusId>" }

# b) Group the members to include
curl -X POST {{API_BASE_URL}}/organizations/$ORG/groups \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{ "title": "Voters", "description": "Eligible voters", "memberIds": ["665f..."] }'
# -> { "id": "<groupId>", ... }

# c) Publish the census for that group
curl -X POST {{API_BASE_URL}}/census/<censusId>/group/<groupId>/publish \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{ "authFields": ["name", "surname", "memberNumber"], "twoFaFields": ["email"] }'
# -> { "root": "<csp-pubkey>", "uri": "...", "size": 1 }
```

### 5. Create and publish the process

Create the draft with its election parameters, then publish it on-chain. Publishing is asynchronous: it returns a job you poll until the on-chain id is ready.

```bash
# a) Create the draft
curl -X POST {{API_BASE_URL}}/process \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{
    "orgAddress": "'"$ORG"'",
    "electionParams": {
      "title": { "default": "Board election 2026" },
      "endDate": "2026-07-08T09:00:00Z",
      "maxCensusSize": 100,
      "questions": [{
        "title": { "default": "Do you approve?" },
        "choices": [
          { "title": { "default": "No" },  "value": 0 },
          { "title": { "default": "Yes" }, "value": 1 }
        ]
      }],
      "voteType": { "maxCount": 1, "maxValue": 1 },
      "electionType": { "autostart": true, "interruptible": true }
    }
  }'
# -> "<draftId>"   (24-hex)

# b) Publish (async) and poll the job for the on-chain id
curl -i -X POST {{API_BASE_URL}}/process/<draftId>/publish \
  -H "Authorization: Bearer $TOKEN"
# -> 202 Accepted   { "jobId": "<jobId>" }

curl {{API_BASE_URL}}/jobs/<jobId>
# -> { "status": "completed", "result": { "address": "<processId>", "status": "READY" } }

PROCESS=<processId>
```

### 6. Bundle the census and process

Voters authenticate against a bundle that ties a published census to one or more processes.

```bash
curl -X POST {{API_BASE_URL}}/process/bundle \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{ "censusId": "<censusId>", "processes": ["'"$PROCESS"'"] }'
# -> { "root": "...", "uri": ".../process/bundle/<bundleId>" }
```

The bundle id is the last path segment of the returned `uri`.

### 7. Cast a vote

The voter authenticates with the CSP, gets it to blind-sign their ephemeral voting address, builds and signs the vote envelope locally (the only client-side crypto), then relays it. The SaaS forwards the envelope without ever decoding the ballot.

**With the SDK** - recommended, it handles the envelope signing for you:

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

**With raw REST** - if you sign the protobuf vote envelope yourself:

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

> The vote package inside the envelope is `{"votes":[<choice>]}` (for example `{"votes":[1]}`). Building and signing the envelope is exactly what `buildVoteTransaction` does for you in the SDK path above.

### 8. End the election and read results

Status changes are asynchronous, like publishing. Once ended, the chain tallies and exposes final results.

```bash
# Optional: end the election early (it also ends on its own at endDate)
curl -i -X PUT {{API_BASE_URL}}/process/<draftId>/status \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{ "status": "ended" }'
# -> 202 Accepted   { "jobId": "<jobId>" }   (poll /jobs/{jobId} as before)

# Read the tally (public)
curl {{API_BASE_URL}}/process/$PROCESS/results
# -> {
#      "status": "RESULTS",
#      "voteCount": 3,
#      "finalResults": true,
#      "results": [ ["1", "2"] ],   // question 0: 1 vote for "No" (value 0), 2 for "Yes" (value 1)
#      "startDate": "2026-07-01T09:00:00Z",
#      "endDate": "2026-07-08T09:00:00Z"
#    }
```

`results[question][value]` holds the tally per choice. With the binary question above, `results[0]` has two buckets, one per choice value.

For the complete, machine-readable contract, see the [OpenAPI specification]({{SWAGGER_URL}}).
