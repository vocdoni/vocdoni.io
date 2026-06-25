---
title: Voting processes
lead: A process is an election - a set of questions run against a published census, with rules for how votes are cast and when voting opens and closes.
group: core_concepts
order: 40
---

## Creating a process

Bind a process to a published census and describe it with election parameters. Titles and descriptions are multilingual objects keyed by language, with a default value.

- **POST** `/organizations/{address}/processes`

### Election parameters

| Field | Type | Description |
| --- | --- | --- |
| `title` | multilang | Election title, keyed by language with a default. |
| `description` | multilang | Longer description of the election. |
| `startDate` | string | When voting opens (ISO 8601). |
| `endDate` | string | When voting closes (ISO 8601). |
| `electionType` | object | Behaviour flags such as anonymous and autostart. |
| `voteType` | object | Ballot rules such as how many choices a voter may select. |
| `questions` | array | One or more questions, each with a list of choices. |
| `streamUri` | string | Optional live stream URL shown with the election. |

### Election type flags

- `anonymous` - hide who voted using zero-knowledge proofs.
- `autostart` - open voting automatically at the start date.
- `interruptible` - allow pausing or ending the process early.
- `dynamicCensus` - allow the census to change after the process starts.
- `secretUntilTheEnd` - keep results hidden until voting closes.

### Vote type

The vote type shapes the ballot. Combine these fields to express single choice, multiple choice, ranked or weighted voting.

| Field | Type | Description |
| --- | --- | --- |
| `maxCount` | integer | How many choices a voter may select. |
| `maxValue` | integer | Maximum value allowed per choice. |
| `uniqueChoices` | boolean | Require every selected choice to be distinct. |
| `costExponent` | integer | Cost curve for quadratic-style voting. |
| `costFromWeight` | boolean | Derive vote credits from the voter weight. |
| `maxVoteOverwrites` | integer | How many times a voter may change their vote. |

```bash
curl -X POST "{{API_BASE_URL}}/organizations/$ORG/processes" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "censusId": "$CENSUS_ID",
    "electionParams": {
      "title":       { "default": "Board election 2026" },
      "description": { "default": "Elect the new board" },
      "startDate":   "2026-07-01T09:00:00Z",
      "endDate":     "2026-07-03T18:00:00Z",
      "electionType": { "anonymous": true, "autostart": true, "interruptible": true },
      "voteType":     { "maxCount": 1, "maxValue": 1, "uniqueChoices": true },
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

## Changing status

Move a process between states - ready, paused, ended or canceled. Status changes run asynchronously and return a job id to poll.

- **POST** `/organizations/{address}/processes/{processId}/status`

```bash
curl -X POST "{{API_BASE_URL}}/organizations/$ORG/processes/$PROCESS/status" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "status": "paused" }'
# -> { "jobId": "a1b2c3" }  (poll /jobs/{jobId})
```

## Process bundles

A bundle groups several processes under one census so a voter can complete them together - useful when an assembly votes on multiple motions in a single session.

- **POST** `/organizations/{address}/processes/bundle`
- **GET** `/organizations/{address}/processes`

```bash
curl -X POST "{{API_BASE_URL}}/organizations/$ORG/processes/bundle" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "censusId": "$CENSUS_ID", "processes": ["0xprocessA", "0xprocessB"] }'
# -> { "uri": "...", "root": "deadbeef..." }
```

> [!TIP] Reading results
> Once a process is running you can read live or final tallies. See [Results](/developers/docs/results) for the response shape and how finality works.
