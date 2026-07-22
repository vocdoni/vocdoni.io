---
title: Results
lead: Read the tally for each question in a process at any time. Results are computed from the protocol and can be independently verified, so you can show live counts and a trustworthy final outcome.
group: core_concepts
order: 50
---

> [!NOTE] Coming soon
> Today each question's `results` matrix is a raw histogram you interpret according to its voting type
> (see [Voting types](/developers/docs/voting-types), or the [Interpretation](#interpretation) section
> below). A future version of the API will return results already aggregated per voting type, so you
> will not have to map the matrix yourself. The raw matrix will stay available for clients that need it.
>
> Until then, the [vocdoni-ballot-protocol agent skill](/developers/docs/sdk-quickstart#ai-agent-skills)
> walks through exactly how the matrix encodes and aggregates per type.

Results are **public** (no auth) and available both while a process runs (a live tally) and after it
ends (final). Because each question is its own election, results come back **per question**.

## Reading results

Fetch results for the whole process by `processId`. Each entry is one published question, keyed by its
`questionId` and `upstreamId`, with a `results` matrix (one row per question field, one column per
value). Per-question status and dates are not returned here - read those from the
[process](/developers/docs/voting-processes#reading-a-process) or question read.

- **GET** `/processes/{processId}/results`

```bash
curl -s "$B/processes/$PROCESS/results"
```

```jsonc
{
  "id": "6a1f...",
  "questions": [{
    "questionId": "b2c3...", "upstreamId": "a1b2...64hex...",
    "voteCount": 42, "maxVoters": 500, "finalResults": true,
    "results": [ ["25", "17"] ]
  }]
}
```

| Field | Type | Description |
| --- | --- | --- |
| `questionId` | string | The question this tally belongs to. |
| `upstreamId` | string | The question's on-chain election id. |
| `voteCount` | integer | Total votes cast on this question so far. |
| `maxVoters` | integer | Eligible voters for this question - its own `maxCensusSize`, restricted to its eligibility subset. |
| `results` | string[][] | The raw histogram - one row per field, one tally per value. |
| `finalResults` | boolean | True once the question has ended and its results are final. |

- `finalResults: false` - the question is still open; the tally is provisional.
- `finalResults: true` - voting has ended; results are final.

> [!NOTE] Results are also inline on a single question read
> Once a question reaches `RESULTS`, the same tally (a `results` object) is included **inline** on
> `GET /processes/{processId}` and the public question read (see
> [Voting processes](/developers/docs/voting-processes#reading-a-process)). The `GET /processes` **list**
> endpoint does not resolve it, so an absent `results` in a list response means "not resolved here", not
> "not final" - poll a single read for finality.

:::code-tabs[read results]

```csharp
var r = await Get($"/processes/{process}/results");
int votes = r.GetProperty("questions")[0].GetProperty("voteCount").GetInt32();
```
```python
r = get(f"/processes/{process}/results").json()
votes = r["questions"][0]["voteCount"]
```
:::

> [!NOTE] Live versus final results
> While a question is running, results reflect votes counted so far unless it was set
> `secretUntilTheEnd`. Once it ends, `finalResults` becomes true and the tally no longer changes.

## The results matrix

Each question's `results` is a matrix of strings (tallies can be large or weighted):
`results[field][value]` = the number of voters who put `value` in that field. For a single yes/no
question with choices `Yes (value 0)` and `No (value 1)`:

```
results[0] = ["25", "17"]
              └Yes  └No        -> 25 voted Yes, 17 voted No  (voteCount = 42)
```

## Interpretation

The matrix is a raw histogram; clients turn it into per-option numbers in one of two ways, picked by
the question's voting type:

- **Discrete** (count per choice) - the common case for single choice. Each inner array is read
  directly as the per-choice counts.
- **Index-weighted** - for each field, multiply each count by its column index and sum. Used by
  ranked and quadratic ballots, where the *value* carries meaning.

**Approval / multichoice reads differently again.** There the matrix has **one field per option**,
each a `[#voted-0, #voted-1]` histogram, so an option's count is the **second** number,
`results[i][1]` - not `results[0]`:

```
results = [ ["0","3"], ["1","2"] ]    # options Yes / No, 3 ballots
            └Yes        └No
Yes approved by results[0][1] = 3 ;  No approved by results[1][1] = 2
```

Reading `results[0]` here (`["0","3"]`) as "Yes 0, No 3" is the classic mistake - each voter can
approve several options, so iterate the fields, not one field's values. See
[Voting types](/developers/docs/voting-types) for which reading each ballot uses.

## Turnout

`voteCount` is how many ballots a question received; **`maxVoters`** is its eligible-voter count,
already restricted to the question's
[eligibility subset](/developers/docs/census#per-question-eligibility) - so **turnout is
`voteCount / maxVoters`**, straight from the response. A bar that fills `votesForOption / maxVoters`
reads as turnout share; one that fills against the leading option always shows the winner at 100%,
which hides participation.
