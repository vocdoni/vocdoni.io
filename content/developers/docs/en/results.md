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
ends (final). Because each question is its own election, results come back **per question**. The one
exception is the free-text [memos](#voter-memos) on an open-value question, which are returned to a
manager/admin only.

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
| `memos` | string[] | Free-text voter memos on an [open-value](/developers/docs/voting-types#open-value-choices) question. Returned to a manager/admin only - see [Voter memos](#voter-memos). |

- `finalResults: false` - the question is still open; the tally is provisional.
- `finalResults: true` - voting has ended; results are final.

> [!NOTE] The matrix before a tally is revealed
> A published question with no votes yet returns a **zero-filled** matrix (e.g. `[["0","0"]]`,
> `voteCount: 0`). While a `secretUntilTheEnd` question is still encrypted the tally is withheld: the
> inner `results` field is **omitted entirely** (not `[]`) and only `voteCount` moves - treat a missing
> matrix as "not yet revealed" and poll.

> [!NOTE] Results are also inline on a single question read
> Every **published** question also carries its **live** tally inline (a `results` object) on
> `GET /processes/{processId}` and the public question read (see
> [Voting processes](/developers/docs/voting-processes#reading-a-process)) - `finalResults` marks live
> vs final. The object is absent only for a draft. The `GET /processes` **list** endpoint does not
> resolve it, so an absent `results` in a list response means "not resolved here", not "not final".

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

## Voter memos

A question can mark one choice [`openValue`](/developers/docs/voting-types#open-value-choices) - an
"Other" option whose voters may attach a short free-text **memo**. Those memos come back as a `memos`
array folded into the question's tally. There is no separate memos endpoint; they ride the reads you
already make:

| Read | Where `memos` sits |
| --- | --- |
| `GET /processes/{processId}/results` | `questions[].memos`, beside `results` |
| `GET /processes/{processId}` | `questions[].results.memos`, inside the results object |
| `GET /processes/{processId}/questions/{questionId}` | `results.memos` |

Mind that difference: on `/results` the field is a **sibling** of `results`, on the other two it is
**inside** it. The `GET /processes` list does not resolve memos at all.

Memos are the one part of a tally that is **not public**. Only a manager/admin of the owning
organization - or a `voting:write` API key acting as one - receives them. Everyone else gets the very
same `200` with `memos` simply absent, never a `401`, so an anonymous client cannot tell an
open-value question from an ordinary one by its results. This is the
[optional authentication](/developers/docs/api-conventions#optional-authentication) pattern.

```bash
# same URL, two answers: no key -> no memos; manager key -> memos
curl -s "$B/processes/$PROCESS/results"
curl -s -H "Authorization: Bearer $TOKEN" "$B/processes/$PROCESS/results"
```

```jsonc
{
  "id": "6a1f...",
  "questions": [{
    "questionId": "b2c3...", "upstreamId": "a1b2...64hex...",
    "voteCount": 42, "maxVoters": 500, "finalResults": true,
    "results": [ ["25", "12", "5"] ],
    "memos": [ "Grace Hopper", "Grace Hopper", "write-ins should be allowed" ]
  }]
}
```

### How to read the array

- **One entry per vote**, not per distinct text. A memo three voters sent appears three times, which
  is what lets you count it - `"Grace Hopper"` twice above means two votes, not a duplicate to
  deduplicate away.
- **Only memos that selected the open choice.** A voter who typed something but voted for a different
  choice is not represented; the memo is dropped rather than reported against the wrong option.
  Concretely: `singlechoice` matches when the ballot's single value is the open choice's `value`,
  `multichoice` when the open choice's field is `1`, `cumulative` when it is greater than `0`.
- **No voter, no order.** The array carries text only - no nullifier, no address, no timestamp, and no
  guaranteed ordering. You cannot join a memo back to a ballot, and neither can anyone else.
- **Absence is the only signal, and it is ambiguous.** The field is present only when at least one
  memo resolved; there is no empty-array case (`memos` is `omitempty`). A missing `memos` can mean any
  of: you are not a manager, the question has no open-value choice, none have been cast yet, the
  question is still encrypted, or the chain read failed. Never infer authorization or "nobody wrote
  anything" from its absence.

> [!NOTE] Encrypted questions reveal memos late
> On a `secretUntilTheEnd` question `memos` is **absent** until the tally is revealed. A memo can only be
> reported once it is known which choice the vote picked, and that needs the decrypted ballot - so the
> memos appear together with the results at `RESULTS`, not while voting runs. Unencrypted questions
> resolve live.

> [!NOTE] Resolution is best-effort
> Memos are read from the chain per request. If that read fails the API logs it and returns the tally
> with `memos` absent rather than failing the whole response - so absence is never proof that nobody
> wrote anything, and a failed read looks identical to none-cast. Poll again before concluding a
> question drew no memos.

> [!WARNING] Memos are personal data
> The API attaches no voter to a memo, but free text identifies its author often enough on its own -
> a name, a role, a turn of phrase. Memos are also cleartext on chain (see
> [Casting votes](/developers/docs/casting-votes#open-value-choices)), so a third party can read them
> without your API key; what your key gates is only the results API returning them to you, not their
> secrecy - a chain observer can tie the cleartext memo to its question regardless. Treat a memo as
> pseudonymous personal data: mind where you display it, and keep it out of exports that are meant to
> be anonymous. If confidentiality was required, the voter app must have encrypted the memo client-side
> at cast time (see [Casting votes](/developers/docs/casting-votes#open-value-choices)); this array then
> holds ciphertext you decrypt with your own key.

## The results matrix

Each question's `results` is a matrix of strings (tallies can be large or weighted):
`results[field][value]` = the number of voters who put `value` in that field. For a single yes/no
question with choices `Yes (value 0)` and `No (value 1)`:

```
results[0] = ["25", "17"]
              └Yes  └No        -> 25 voted Yes, 17 voted No  (voteCount = 42)
```

## Interpretation

The matrix is a raw histogram; clients turn it into per-option numbers in a few ways, picked by
the question's voting type:

- **Discrete** (count per choice) - the common case for single choice. Each inner array is read
  directly as the per-choice counts.
- **Index-weighted** - for each field, multiply each count by its column index and sum. Used by
  `ranked` ballots, where the *value* (the rank) carries meaning.
- **Aggregated** - each field already holds a summed amount in column 0, so read `results[i][0]`
  directly. Used by `cumulative` ballots: their `maxValue: 0` tells the protocol the field values are
  credits to add up, so the matrix is single-column and index-weighting it would return 0 for every
  option.

**Multichoice reads differently again.** There the matrix has **one field per option**,
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
