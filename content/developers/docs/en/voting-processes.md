---
title: Voting processes
lead: A process is one authoring call that bundles shared settings, an inline census, and one or more questions - each question becomes its own on-chain election. Create it as a draft, publish it in one batch, then read results.
group: core_concepts
order: 40
---

A **process** groups everything an election needs into a single object: shared settings (title,
dates, header), an inline [census](/developers/docs/census), and **one or more questions**. Each
question becomes its **own on-chain election**, so a process with three questions publishes three
elections in one batch - no separate census setup, no per-question wiring.

You create a process as a **draft** (`published: false`), edit it freely, then **publish** it. One
**`processId`** identifies it for its whole life; each published question exposes its on-chain election
id as **`upstreamId`** (voters need it to sign; you never address the process by it).

## Creating a process

`POST /processes` creates the draft and its inline census, and returns the `processId`. Titles and
descriptions are [multilanguage strings](/developers/docs/api-conventions#multilanguage-strings).

- **POST** `/processes`

| Field | Type | Description |
| --- | --- | --- |
| `orgAddress` (required) | string | The organization the process belongs to (`0x…`). |
| `census` (required) | object | Inline census - who can vote and how they authenticate. See [Census](/developers/docs/census). |
| `title` (required) | multilang | Process title, keyed by language with a `default`. |
| `description` | multilang | Longer description. |
| `startDate` (required) | string (ISO 8601) | When voting opens. |
| `endDate` (required) | string (ISO 8601) | When voting closes. |
| `header` | string | Optional banner image URL. |
| `streamUri` | string | Optional live-stream URL. |
| `questions` (required) | array | 1..N questions (see below). Each becomes one on-chain election. |

Each **question** shapes one ballot:

| Field | Type | Description |
| --- | --- | --- |
| `title` (required) | multilang | Question title. |
| `description` | multilang | Question description. |
| `choices` (required) | array | Options, each a `title` plus a numeric `value`. One choice may set `openValue: true` to collect a free-text memo - see [Open-value choices](/developers/docs/voting-types#open-value-choices). |
| `type` | string | `singlechoice`, `multichoice`, `ranked` or `cumulative`. See [Voting types](/developers/docs/voting-types). |
| `typeSetup` | object | Tuning for the type: `maxChoices` (`multichoice`), `budget` and `costExponent` (`cumulative`), `minChoices`. |
| `ballotProtocol` | object | Optional raw ballot override for shapes the named types do not cover. Takes priority over `type`/`typeSetup`. |
| `census` | object | Optional eligibility subset (`groupId`/`memberIds`) within the process census. Omit to include all census members. |
| `secretUntilTheEnd` | boolean | Keep this question's tally encrypted until it ends. |

```bash
# draft created, published:false
PROCESS=$(curl -s "${auth[@]}" -X POST "$B/processes" -d @- <<JSON | jq -r .processId
{
  "orgAddress": "$ORG",
  "census": { "authFields": ["memberNumber"] },
  "title": { "default": "Board election 2026" },
  "description": { "default": "Elect the new board" },
  "startDate": "2026-07-01T09:00:00Z",
  "endDate": "2026-07-03T18:00:00Z",
  "questions": [
    {
      "title": { "default": "Who should chair the board?" },
      "choices": [
        { "title": { "default": "Ada Lovelace" }, "value": 0 },
        { "title": { "default": "Alan Turing" }, "value": 1 }
      ],
      "type": "singlechoice"
    }
  ]
}
JSON
)
```

```jsonc
{ "processId": "6a1f..." }   // 200 - carry forward
```

:::code-tabs[create a process]

```csharp
var processId = (await Post("/processes", new {
    orgAddress = org,
    census = new { authFields = new[] { "memberNumber" } },
    title = new { @default = "Board election 2026" },
    startDate = "2026-07-01T09:00:00Z", endDate = "2026-07-03T18:00:00Z",
    questions = new[] { new {
        title = new { @default = "Who should chair the board?" },
        choices = new[] { new { title = new { @default = "Ada Lovelace" }, value = 0 },
                          new { title = new { @default = "Alan Turing" }, value = 1 } },
        type = "singlechoice",
    }}})).GetProperty("processId").GetString();
```
```python
processId = post("/processes", {
    "orgAddress": org,
    "census": {"authFields": ["memberNumber"]},
    "title": {"default": "Board election 2026"},
    "startDate": "2026-07-01T09:00:00Z", "endDate": "2026-07-03T18:00:00Z",
    "questions": [{
        "title": {"default": "Who should chair the board?"},
        "choices": [{"title": {"default": "Ada Lovelace"}, "value": 0},
                    {"title": {"default": "Alan Turing"}, "value": 1}],
        "type": "singlechoice",
    }]}).json()["processId"]
```
:::

> [!NOTE] Collecting a free-text answer
> To give a question an "Other" free-text option, mark one of its choices `"openValue": true`. See
> [Open-value choices](/developers/docs/voting-types#open-value-choices) for which types allow it and
> the one-per-question rule, and [Casting votes](/developers/docs/casting-votes#open-value-choices) for
> how a voter fills it in.

## Editing a draft

While a process is unpublished you can replace its fields with the same body. Once published it is
immutable - the update returns `409`.

- **PUT** `/processes/{processId}`

```bash
curl "${auth[@]}" -X PUT "$B/processes/$PROCESS" -d '{ ...same shape as create... }'
```

Delete a draft you no longer need (allowed only while unpublished):

- **DELETE** `/processes/{processId}`

```bash
curl "${auth[@]}" -X DELETE "$B/processes/$PROCESS"
```

## Reading a process

`GET /processes/{processId}` returns the process with every question **fully hydrated** (`upstreamId`,
synced `status`, and live per-question results). `GET /processes` lists them paginated, filterable by
`orgAddress` and question `status`.

These reads are **public for published processes** - anyone can read them, no API key. Three things are
gated to a **manager/admin** of the org (or a `voting:write` API key acting as one):

- **drafts** (`published: false`) - the single read returns `404` for everyone else (hiding existence),
  and the list returns published processes only;
- **`eligibleMemberIds`** on each question (who may vote) - stripped for non-managers. A voter checks
  their *own* per-question eligibility with
  [`POST /processes/{processId}/check`](/developers/docs/casting-votes#voter-status);
- **`results.memos`** on an [open-value](/developers/docs/voting-types#open-value-choices) question -
  the free-text voter memos, returned only to a manager and absent for everyone else. See
  [Voter memos](/developers/docs/results#voter-memos).

- **GET** `/processes/{processId}`
- **GET** `/processes`
- **GET** `/processes/{processId}/questions/{questionId}`

```bash
# public read of a published process (no auth)
curl -s "$B/processes/$PROCESS"
# a manager (or voting:write key) also sees drafts and eligibleMemberIds
curl -s "${auth[@]}" "$B/processes?orgAddress=$ORG&status=READY&page=1"
```

```jsonc
{
  "id": "6a1f...", "orgAddress": "0x...", "published": true,
  "census": { "authFields": ["memberNumber"], "size": 500, "totalWeight": 500 },
  "title": { "default": "Board election 2026" },
  "startDate": "2026-07-01T09:00:00Z", "endDate": "2026-07-03T18:00:00Z",
  "questions": [{
    "id": "b2c3...", "upstreamId": "a1b2...64hex...", "parentProcessId": "6a1f...",
    "status": "READY", "type": "singlechoice",
    "title": { "default": "Who should chair the board?" },
    "choices": [ /* ... */ ],
    "results": { "voteCount": 12, "maxVoters": 500, "finalResults": false, "results": [ ["7", "5"] ] }
  }]
}
```

The per-question read (`/questions/{questionId}`) is **public** - voter UIs use it to render a
question and its status without authenticating. A question's `id` is the value used as the
`{questionId}` path parameter, and as `questionId` in the results and status payloads.

A question created with `secretUntilTheEnd` also carries **`encryptionKeys`** (an array of
`{ index, key }`) - the on-chain keys voters seal their ballots with. The field is **absent until the
keykeepers publish the keys**, so treat its absence as "not yet published" and poll. See
[Casting votes](/developers/docs/casting-votes) for the encrypted-vote flow.

Every **published** question carries its **live** tally inline as a `results` object (`voteCount`,
`maxVoters`, `finalResults`, and the `results` matrix); `finalResults` marks live vs final. The object
is absent only for a **draft** (no election yet). A published question with no votes yet has a
**zero-filled** matrix; while a `secretUntilTheEnd` question is still encrypted the inner `results` is
**omitted** (only `voteCount` moves) - poll until it appears. On an
[open-value](/developers/docs/voting-types#open-value-choices) question a manager/admin also gets a
`memos` array inside this object; it is absent for everyone else. The `GET /processes` **list** does
not resolve results. See [Results](/developers/docs/results).

The `census` object also carries response-only **`size`** (eligible-voter count, on every read) and
**`totalWeight`** (the sum of members' weights - equals `size` for a non-weighted census), the
denominator for turning weighted results into percentages. `totalWeight` is resolved only on the
**detail read** `GET /processes/{processId}` (not the list) and is absent when it cannot be computed.

## Checking readiness

Before publishing, dry-run the publish preconditions. It changes nothing and lists what is still
missing (dates, choices, a resolvable census, ballot params within your plan).

- **GET** `/processes/{processId}/validation`

```bash
curl "${auth[@]}" "$B/processes/$PROCESS/validation"
```

```jsonc
{ "valid": true, "errors": [] }
```

## Publishing on-chain

Publishing is **asynchronous** and **atomic**: the census and one election per question are published
in a single batch. It returns a `jobId`; poll the [job](/developers/docs/jobs) until it completes.
Either all questions publish or none do.

- **POST** `/processes/{processId}/publish`

```bash
PJOB=$(curl -s "${auth[@]}" -X POST "$B/processes/$PROCESS/publish" | jq -r .jobId)
until [ "$(curl -s "$B/jobs/$PJOB" | jq -r .status)" = "completed" ]; do sleep 2; done
```

On success each question gains its `upstreamId` and a `status` of `READY`, and the process flips to
`published: true`. Re-read the process to get the `upstreamId`s that voters sign against.

## Managing a published census

Publishing does not freeze the census. You can still grow the process census with new members,
remove members from it, and replace a question's
[eligibility subset](/developers/docs/census#per-question-eligibility) - even while voting is
ongoing. Changes to the memberbase itself also cascade into live censuses - see
[Kept in sync with the memberbase](/developers/docs/census#kept-in-sync-with-the-memberbase).

### Growing the census

After publishing you can add more members to the census - `PUT /processes/{processId}/census` adds
existing organization members and raises each affected election's `maxCensusSize` so they can vote.
Members are added synchronously; the on-chain resize runs as an async job (`jobId`). Questions with an
[eligibility subset](/developers/docs/census#per-question-eligibility) keep their fixed size and are
unaffected.

- **PUT** `/processes/{processId}/census`

```bash
curl "${auth[@]}" -X PUT "$B/processes/$PROCESS/census" -d '{"memberIds":["<id1>","<id2>"]}'
```

```jsonc
{ "added": 2, "errors": [], "jobId": "e5f6a7..." }   // poll /jobs/{jobId} for the resize
```

### Removing members from the census

The reverse of growing: remove members from the process census **and from every question
eligibility list built on it**, so the credential service stops signing for them. An id naming a
member who is no longer in the census is skipped as a no-op rather than refused.

- **DELETE** `/processes/{processId}/census`

```bash
curl "${auth[@]}" -X DELETE "$B/processes/$PROCESS/census" -d '{"memberIds":["<id1>","<id2>"]}'
```

```jsonc
{ "removed": 2, "errors": [] }                       // 200 - removed
{ "removed": 2, "errors": [], "jobId": "a7b8c9..." } // 202 - resize enqueued, poll /jobs/{jobId}
```

Removing a member the CSP has **already signed for**, while a question of the process is still
`READY` or `PAUSED`, is refused with `409` and the offending ids in `data.signedMemberIds` - once
voting closes on those questions the removal succeeds. This is the same protection that guards
[memberbase removals](/developers/docs/census#kept-in-sync-with-the-memberbase). Pruning a
question's eligibility list to empty [opens it to the whole census](#changing-a-questions-eligibility),
so a `maxCensusSize` increase may be enqueued as an async [job](/developers/docs/jobs) - the `202`
case above.

### Changing a question's eligibility

Replace the set of members eligible to vote one question - on a draft or a **published** process,
even mid-vote. The body is the **complete desired list, not a delta**, so the request is idempotent:
resend the whole list to change it. Every id must already be a participant of the process census
(grow the census first if not); input order is preserved and duplicates are dropped. Requires a
manager/admin of the org, or a `voting:write` API key.

- **PUT** `/processes/{processId}/questions/{questionId}/census`

```bash
curl "${auth[@]}" -X PUT "$B/processes/$PROCESS/questions/$QID/census" \
  -d '{"memberIds":["<id1>","<id2>"]}'
```

```jsonc
{ "eligible": 2 }        // 200 - updated, no on-chain resize needed
{ "eligible": 9, "jobId": "f6a7b8..." }   // 202 - resize enqueued, poll /jobs/{jobId}
```

> [!NOTE] An empty list means "no restriction", not "nobody"
> Sending `{"memberIds": []}` **reopens the question to every member of the process census**. A
> response of `eligible: 0` therefore means the question is open to everyone.

Because reopening a restricted question can multiply its electorate beyond what its election was
sized for on chain, a `maxCensusSize` increase is enqueued as an async [job](/developers/docs/jobs)
whenever the question needs more room than it was published with - the `202` case above.

Removing a member the CSP has **already signed for**, while a question of the process is still
`READY` or `PAUSED`, is refused with `409` and the offending ids in `data.signedMemberIds` - the
same protection that guards [memberbase removals](/developers/docs/census#kept-in-sync-with-the-memberbase).
A `409` is also returned while a publish is in progress or when the list changed concurrently.

## Changing status

Move published questions through `READY`, `PAUSED`, `ENDED`, or `CANCELED` - one at a time or in bulk.
Both are asynchronous jobs. Only published questions (those with an `upstreamId`) can change status.
Status is case-insensitive on input and returned uppercase. Reads may also show `RESULTS` once a
question has been tallied - a terminal state you observe but cannot set.

- **PUT** `/processes/{processId}/questions/{questionId}/status`
- **PUT** `/processes/{processId}/questions/status`

```bash
# one question
curl "${auth[@]}" -X PUT "$B/processes/$PROCESS/questions/$QID/status" -d '{"status":"ENDED"}'

# many questions (omit "questions" to target all published questions)
curl "${auth[@]}" -X PUT "$B/processes/$PROCESS/questions/status" -d @- <<JSON
{
  "status": "ENDED",
  "questions": [ { "id": "$QID" } ]
}
JSON
```

```jsonc
{ "jobId": "d4e5f6..." }   // 202 - poll /jobs/{jobId}
```

> [!TIP] Reading results
> Each question tallies independently. See [Results](/developers/docs/results) for the per-question
> response shape and how finality works.

## Gotchas

- A process is a **draft** until you publish it; edits are allowed only while `published: false`.
- Publish and status changes are **jobs** - read the outcome from `/jobs/{jobId}`, not the POST body.
- Address the process by its **`processId`** everywhere server-side. A question's **`upstreamId`** is
  only needed client-side, when a voter signs a ballot for that question.
- The inline census id is internal - you never send or receive it. See [Census](/developers/docs/census).
