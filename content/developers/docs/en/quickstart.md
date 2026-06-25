---
title: Quickstart
lead: Run a full election end to end - authenticate, build a census, create a voting process and read the results. The examples use cURL; any HTTP client works the same way.
group: get_started
order: 10
---

You will need an integrator account and an organization. Every request below is authenticated with a bearer token obtained in step one. Replace the placeholders ($ORG, $CENSUS_ID, $PROCESS) with the values returned along the way.

> [!NOTE] Before you start
> Create an account in the API Dashboard and note your organization address. You can also authenticate with an API key instead of email and password for server-to-server use.

:::steps

## Authenticate

Exchange your email and password for a JWT. Send it as a bearer token on every following request.

```bash
curl -X POST {{API_BASE_URL}}/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "email": "you@example.org", "password": "••••••••" }'

# Response
# { "token": "eyJhbGciOi...", "expirity": "2026-06-24T10:00:00Z" }
```

## Create an organization

Skip this if you already have one. The response includes the organization address used in later calls.

```bash
curl -X POST {{API_BASE_URL}}/organizations \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "type": "association", "size": "100", "country": "ES" }'
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
> Read [Authentication](/developers/docs/authentication) to issue API keys, [Census](/developers/docs/census) to fine-tune voter authentication, and [Voting processes](/developers/docs/voting-processes) to configure vote types such as multiple choice or weighted voting.
