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
| `initialStatus` | string | On-chain status the questions publish with: `READY` (the default, voting opens at `startDate`) or `PAUSED` (voting stays closed until you set each question to `READY`). See [Publishing paused](#publishing-paused). |
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

:::code-tabs[create a process]

```bash
# draft created, published:false
PROCESS=$(curl -s "${auth[@]}" -X POST "$B/processes" -d @- <<JSON | jq -r .processId
{
  "orgAddress": "$ORG",
  "census": { "authFields": ["memberNumber"] },
  "title": { "default": "Board election 2027" },
  "description": { "default": "Elect the new board" },
  "startDate": "2027-07-01T09:00:00Z",
  "endDate": "2027-07-03T18:00:00Z",
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
```ts
// draft created, published:false - resolves to the processId
const processId = await client.elections.create({
  orgAddress: org,
  census: { authFields: ['memberNumber'] },
  title: 'Board election 2027', // plain strings become { default: ... }
  description: 'Elect the new board',
  startDate: '2027-07-01T09:00:00Z',
  endDate: '2027-07-03T18:00:00Z',
  questions: [
    {
      title: 'Who should chair the board?',
      choices: [
        { title: 'Ada Lovelace', value: 0 },
        { title: 'Alan Turing', value: 1 },
      ],
      type: 'singlechoice',
    },
  ],
})
```
```csharp
var processId = (await Post("/processes", new {
    orgAddress = org,
    census = new { authFields = new[] { "memberNumber" } },
    title = new { @default = "Board election 2027" },
    startDate = "2027-07-01T09:00:00Z", endDate = "2027-07-03T18:00:00Z",
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
    "title": {"default": "Board election 2027"},
    "startDate": "2027-07-01T09:00:00Z", "endDate": "2027-07-03T18:00:00Z",
    "questions": [{
        "title": {"default": "Who should chair the board?"},
        "choices": [{"title": {"default": "Ada Lovelace"}, "value": 0},
                    {"title": {"default": "Alan Turing"}, "value": 1}],
        "type": "singlechoice",
    }]}).json()["processId"]
```
:::

```jsonc
{ "processId": "6a1f..." }   // 200 - carry forward
{ "processId": "6a1f...", "missingData": ["665f...", "6660..."] }   // some members left out
```

The census is built when the draft is created, and two kinds of member are handled there rather than
at publish:

- **Members missing the data to log in** - an empty or whitespace-only `authFields` value, or no
  channel at all for the `twoFaFields` - could never authenticate, so they are **left out** of the
  census and their member ids come back in `missingData`. The draft is still created; fix their data
  and update the draft (or, once published, [grow the census](#growing-the-census)), or ignore them.
  `missingData` is absent when nobody was left out.
- **Members the census cannot tell apart** - the same login data as another member, including values
  that differ only by case, or as a participant already in the census - are refused: the request
  fails with `400` (error code `40037`) and their ids in `data.duplicates`, and nothing is created.

> [!NOTE] Not in the SDK yet
> `client.elections.create()` resolves to the `processId` alone and `client.elections.update()` to
> nothing, so both drop `missingData`. Check the census with
> [`validateCensus()`](/developers/docs/census#validating-a-census) first if you need to know who would
> be left out.

> [!WARNING] Not on your integrator organization
> Your integrator's own top-level organization cannot own processes - creating one there fails with
> `403` (error code `40174`). Create processes inside a
> [managed organization](/developers/docs/managed-organizations) instead.

> [!NOTE] Collecting a free-text answer
> To give a question an "Other" free-text option, mark one of its choices `"openValue": true`. See
> [Open-value choices](/developers/docs/voting-types#open-value-choices) for which types allow it and
> the one-per-question rule, and [Casting votes](/developers/docs/casting-votes#open-value-choices) for
> how a voter fills it in.

## Editing a draft

While a process is unpublished you can replace its fields with the same body. Once published it is
immutable - the update returns `409`. The census is rebuilt as on create, so the response carries the
same `{ processId, missingData }` shape and refuses indistinguishable members the same way.

To stop two editors overwriting each other, send the `updatedAt` you read from
`GET /processes/{processId}` in the body: the update is then rejected with `409` (error code `40171`) if
anything wrote the process in between. Without it the last write wins. The SDK types do not carry
`updatedAt` yet.

- **PUT** `/processes/{processId}`

:::code-tabs

```bash
curl "${auth[@]}" -X PUT "$B/processes/$PROCESS" -d '{ ...same shape as create... }'
```
```ts
await client.elections.update(processId, draft) // draft: the same shape you passed to create
```
:::

Delete a draft you no longer need (allowed only while unpublished):

- **DELETE** `/processes/{processId}`

:::code-tabs

```bash
curl "${auth[@]}" -X DELETE "$B/processes/$PROCESS"
```
```ts
await client.elections.delete(processId)
```
:::

## Reading a process

`GET /processes/{processId}` returns the process with every question **fully hydrated** (`upstreamId`,
synced `status`, and live per-question results). `GET /processes` lists them paginated, filterable by
`orgAddress`, question `status`, and `published` (`true` for published processes only, `false` for
drafts only, which needs a manager/admin).

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

:::code-tabs

```bash
# public read of a published process (no auth)
curl -s "$B/processes/$PROCESS"
# a manager (or voting:write key) also sees drafts and eligibleMemberIds
curl -s "${auth[@]}" "$B/processes?orgAddress=$ORG&status=READY&page=1"
```
```ts
// public read of a published process (no authToken)
const anon = new VocdoniApiClient({ apiUrl: '{{API_BASE_URL}}' })
const { questions } = await anon.elections.get(processId)
const question = await anon.elections.getQuestion(processId, questions[0].id)
// a manager (or voting:write key) also sees drafts and eligibleMemberIds
const { processes } = await client.elections.list({ orgAddress: org, status: 'READY', page: 1 })
```
:::

```jsonc
{
  "id": "6a1f...", "orgAddress": "0x...", "published": true,
  "census": { "authFields": ["memberNumber"], "size": 500, "totalWeight": 500 },
  "title": { "default": "Board election 2027" },
  "startDate": "2027-07-01T09:00:00Z", "endDate": "2027-07-03T18:00:00Z",
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

A question that was **ended early** - set to `ENDED` before its `endDate` - carries **`endedAt`**, the
moment its election actually stopped accepting votes. The process carries an `endedAt` too, the latest
of its questions', but only once every published question has one. Both are absent while voting is open
and when a question ran to its scheduled end, so display the close time as `endedAt ?? endDate`.
The values are stored, so the list carries them too - except for an older vote ended early, which gets
them only once its detail (`GET /processes/{processId}`) or one of its questions
(`GET /processes/{processId}/questions/{questionId}`) has been read.

The `census` object also carries response-only **`size`** (eligible-voter count, on every read) and
**`totalWeight`** (the sum of members' weights - equals `size` for a non-weighted census), the
denominator for turning weighted results into percentages. `totalWeight` is resolved only on the
**detail read** `GET /processes/{processId}` (not the list) and is absent when it cannot be computed.

### Elections from the previous API

Elections created before the `/processes` API also show up in these reads, as **read-only
projections** marked `legacy: true`. `GET /processes?orgAddress=...` lists them after the stored
processes (`pagination.totalItems` counts them), and `GET /processes/{processId}` accepts either a
`processId` or the election's 64-hex on-chain id. Their questions may share one `upstreamId` (one
election held the whole ballot). When the election's ballot parameters map onto its single questions,
each question carries the `ballotProtocol` read from the chain, and a `type` when that protocol matches
a named type, so its results read the same way as any other question's; otherwise `ballotProtocol` is
absent and `type` is empty. `typeSetup` may be filled from the election metadata even without a `type`. The `results` object is always there, but its inner `results` matrix is left
out when the tally cannot be split per question. They
cannot be edited or published through `/processes`. The SDK types do not carry the `legacy` flag yet.

## Checking readiness

Before publishing, dry-run the publish preconditions. It changes nothing and lists what is still
missing (dates, choices, a resolvable census, ballot params within your plan).

- **GET** `/processes/{processId}/validation`

:::code-tabs

```bash
curl "${auth[@]}" "$B/processes/$PROCESS/validation"
```
```ts
const { valid, errors } = await client.elections.validate(processId)
```
:::

```jsonc
{ "valid": true, "errors": [] }
```

## Publishing on-chain

Publishing is **asynchronous** and **atomic**: the census and one election per question are published
in a single batch. It returns a `jobId`; poll the [job](/developers/docs/jobs) until it completes.
Either all questions publish or none do.

- **POST** `/processes/{processId}/publish`

:::code-tabs

```bash
PJOB=$(curl -s "${auth[@]}" -X POST "$B/processes/$PROCESS/publish" | jq -r .jobId)
# no jobId: the process was already published, or the publish was rejected
if [ -z "$PJOB" ] || [ "$PJOB" = "null" ]; then echo "no jobId - check the publish response" >&2; else
  for i in $(seq 150); do
    S=$(curl -s "$B/jobs/$PJOB" | jq -r .status)
    [ "$S" = "completed" ] && break
    if [ "$S" = "failed" ] || [ "$i" = 150 ]; then echo "publish job $PJOB: $S" >&2; break; fi
    sleep 2
  done
fi
```
```ts
// Publishes and polls the job; throws JobFailedError if the publish fails.
// The wait gives up after 60s by default while the publish carries on; allow longer.
await client.elections.publishAndWait(processId, { timeoutMs: 5 * 60_000 })
```
:::

On success each question gains its `upstreamId` and a `status` of `READY` (or `PAUSED`, see below),
and the process flips to `published: true`. Re-read the process to get the `upstreamId`s that voters
sign against.

### Publishing paused

Set `"initialStatus": "PAUSED"` on the draft to publish every question **paused**: the elections exist
on chain, but voting does not open - not even at `startDate` - until you set each question to `READY`
with a [status change](#changing-status). Use it when an organizer must open the vote by hand. Only
`READY` (the default) and `PAUSED` are accepted; anything else is a `400`. Reads echo the value as
`initialStatus` (absent for the default); it records how the process was published, not the questions'
current status.

:::code-tabs[publish paused, open later]

```bash
# the draft is created (or updated) with "initialStatus": "PAUSED" alongside the usual fields
curl "${auth[@]}" -X PUT "$B/processes/$PROCESS" -d '{ ...same shape as create..., "initialStatus": "PAUSED" }'
# publish as usual: every question lands PAUSED
curl "${auth[@]}" -X POST "$B/processes/$PROCESS/publish"
# later, open the vote on every published question
curl "${auth[@]}" -X PUT "$B/processes/$PROCESS/questions/status" -d '{"status":"READY"}'
```
```ts
// draft: the same shape you passed to create. initialStatus is not in the SDK types yet, so cast;
// the client sends it through as is
await client.elections.update(processId, { ...draft, initialStatus: 'PAUSED' } as typeof draft)
await client.elections.publishAndWait(processId, { timeoutMs: 5 * 60_000 })
// later, open the vote on every published question
const { jobId } = await client.elections.bulkSetQuestionStatus(processId, { status: 'READY' })
await client.jobs.waitFor(jobId)
```
:::

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

:::code-tabs

```bash
curl "${auth[@]}" -X PUT "$B/processes/$PROCESS/census" -d '{"memberIds":["<id1>","<id2>"]}'
```
```ts
const { added, jobId } = await client.elections.addCensusMembers(processId, ['<id1>', '<id2>'])
if (jobId) await client.jobs.waitFor(jobId) // the on-chain resize
```
:::

```jsonc
{ "added": 2, "jobId": "e5f6a7..." }   // poll /jobs/{jobId} for the resize
```

### Removing members from the census

The reverse of growing: remove members from the process census **and from every question
eligibility list built on it**, so the credential service stops signing for them. An id naming a
member who is no longer in the census is skipped as a no-op rather than refused. At most 1000 ids
per request - page through a larger removal.

- **DELETE** `/processes/{processId}/census`

```bash
curl "${auth[@]}" -X DELETE "$B/processes/$PROCESS/census" -d '{"memberIds":["<id1>","<id2>"]}'
```

```jsonc
{ "removed": 2 }                       // 200 - removed
{ "removed": 2, "jobId": "a7b8c9..." } // 202 - resize enqueued, poll /jobs/{jobId}
```

> [!NOTE] Not in the SDK yet
> `@vocdoni/api-client` does not wrap this endpoint yet. Call it with any HTTP client, sending your
> key as the bearer token.

Removing a member the CSP has **already signed for**, while a question of the process is still
`READY` or `PAUSED`, is refused with `409` and the offending ids in `data.signedMemberIds` - once
voting closes on those questions the removal succeeds. This is the same protection that guards
[memberbase removals](/developers/docs/census#kept-in-sync-with-the-memberbase). Pruning a
question's eligibility list to empty [opens it to the whole census](#changing-a-questions-eligibility),
so a `maxCensusSize` increase may be enqueued as an async [job](/developers/docs/jobs) - the `202`
case above. Both endpoints omit `errors` unless something went wrong; on `PUT` it lists the ids that
could not be added, on `DELETE` the questions whose resize could not be enqueued.

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

> [!NOTE] Not in the SDK yet
> `@vocdoni/api-client` does not wrap this endpoint yet. Call it with any HTTP client, sending your
> key as the bearer token.

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

:::code-tabs

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
```ts
// one question
const { jobId } = await client.elections.setQuestionStatus(processId, questionId, 'ENDED')
await client.jobs.waitFor(jobId)

// many questions (omit "questions" to target all published questions)
const bulk = await client.elections.bulkSetQuestionStatus(processId, {
  status: 'ENDED',
  questions: [{ id: questionId }],
})
await client.jobs.waitFor(bulk.jobId)
```
:::

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
