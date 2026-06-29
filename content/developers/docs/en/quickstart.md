---
title: Quickstart
lead: Run a full election end to end - authenticate, build a census, create a voting process and read the results. The examples use cURL; any HTTP client works the same way.
group: get_started
order: 10
---

You will need a scoped API key and your organization address. Every request below sends the key as a bearer token. Replace the placeholders ($ORG, $CENSUS_ID, $PROCESS) with your values.

> [!NOTE] Before you start
> Create an account in the [API Dashboard](https://platform.vocdoni.io), generate a scoped API key, and copy your organization address. The key is shown only once - store it safely. See [API keys](/developers/docs/api-keys) for the available scopes and handling.

:::steps

## Set your API key

Every request authenticates with your scoped API key from the Dashboard, sent as a bearer token - there is no login step. This walkthrough needs a key with the `members:write` and `voting:write` scopes.

```bash
export TOKEN=vsk_your_api_key     # from platform.vocdoni.io
export ORG=0xyour_org_address     # your organization address
```

## Add members

Import the people in your organization. For large lists, pass ?async=true and poll the returned job id.

```bash
curl -X POST "{{API_BASE_URL}}/organizations/$ORG/members" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "members": [
      { "memberNumber": "0001", "name": "Ada",  "surname": "Lovelace", "email": "ada@example.org" },
      { "memberNumber": "0002", "name": "Alan", "surname": "Turing",   "email": "alan@example.org" }
    ]
  }'
```

## Build and publish a census

A census defines who can vote and how they authenticate. Publishing produces a cryptographic root that the election is bound to.

```bash
# 1. Create a census for the organization
curl -X POST {{API_BASE_URL}}/census \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "orgAddress": "$ORG", "authFields": ["memberNumber"], "twoFaFields": ["email"] }'
# -> { "id": "$CENSUS_ID" }

# 2. Add organization members to the census
curl -X POST "{{API_BASE_URL}}/census/$CENSUS_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "memberIds": ["<memberId1>", "<memberId2>"] }'

# 3. Publish the census to lock it for voting
curl -X POST "{{API_BASE_URL}}/census/$CENSUS_ID/publish" \
  -H "Authorization: Bearer $TOKEN"
# -> { "uri": "...", "root": "deadbeef...", "size": 2 }
```

## Create a voting process

Define the questions, choices and timing, and bind the process to the published census. The process is your election.

```bash
curl -X POST "{{API_BASE_URL}}/organizations/$ORG/processes" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "censusId": "$CENSUS_ID",
    "electionParams": {
      "title": { "default": "Board election 2026" },
      "startDate": "2026-07-01T09:00:00Z",
      "endDate":   "2026-07-03T18:00:00Z",
      "questions": [{
        "title": { "default": "Who should chair the board?" },
        "choices": [
          { "title": { "default": "Ada Lovelace" }, "value": 0 },
          { "title": { "default": "Alan Turing" },  "value": 1 }
        ]
      }]
    }
  }'
# -> { "address": "0xprocess...", "status": "READY" }
```

## Read the results

Poll the results endpoint at any time. Results are verifiable against the protocol and marked final once the process ends.

```bash
curl "{{API_BASE_URL}}/organizations/$ORG/processes/$PROCESS/results" \
  -H "Authorization: Bearer $TOKEN"
# -> { "status": "ENDED", "voteCount": 2, "results": [["1","1"]], "finalResults": true }
```

:::

> [!TIP] Next steps
> Read [API keys](/developers/docs/api-keys) for scopes and key handling, [Census](/developers/docs/census) to fine-tune voter authentication, and [Voting processes](/developers/docs/voting-processes) to configure vote types such as multiple choice or weighted voting.
