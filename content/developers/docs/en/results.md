---
title: Results
lead: Read the tally for a voting process at any time. Results are computed from the protocol and can be independently verified, so you can show live counts and a trustworthy final outcome.
group: core_concepts
order: 50
---

> [!NOTE] Coming soon
> Today the `results` matrix is a raw histogram you interpret according to the voting type (see [Voting types](/developers/docs/voting-types) for how to read it per type). A future version of the API will return results already aggregated per voting type, so you will not have to map the matrix yourself. The raw matrix will stay available for clients that need it.
>
> Until then, the [vocdoni-ballot-protocol agent skill](/developers/docs/sdks-and-tools#ai-agent-skills) walks through exactly how the matrix encodes and aggregates per type.

## Reading results

Fetch results by organization and process id. The results field is an array per question, with one tally per choice in the order the choices were defined.

- **GET** `/organizations/{address}/processes/{processId}/results`

| Field | Type | Description |
| --- | --- | --- |
| `status` | string | Process state, for example READY, PAUSED or ENDED. |
| `voteCount` | integer | Total number of votes cast so far. |
| `results` | string[][] | Tallies per question, one entry per choice. |
| `startDate` | string | When voting opened. |
| `endDate` | string | When voting closed. |
| `finalResults` | boolean | True once the process has ended and results are final. |

```bash
curl "{{API_BASE_URL}}/organizations/$ORG/processes/$PROCESS/results" \
  -H "Authorization: Bearer $TOKEN"

# Response (apicommon.ProcessResultsResponse)
# {
#   "status": "ENDED",
#   "voteCount": 128,
#   "results": [ ["54", "74"] ],
#   "startDate": "2026-07-01T09:00:00Z",
#   "endDate":   "2026-07-03T18:00:00Z",
#   "finalResults": true
# }
```

> [!NOTE] Live versus final results
> While a process is running, results reflect votes counted so far unless the election was configured to keep results secret until the end. Once the process ends, finalResults becomes true and the tally no longer changes.
