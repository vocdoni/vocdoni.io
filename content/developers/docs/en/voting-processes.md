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
| `choices` (required) | array | Options, each a `title` plus a numeric `value`. |
| `type` | string | `singlechoice` or `multichoice`. See [Voting types](/developers/docs/voting-types). |
| `typeSetup` | object | `minChoices`, `maxChoices`, `uniqueChoices`. |
| `ballotProtocol` | object | Optional raw ballot override (approval, ranked, quadratic). Takes priority over `type`/`typeSetup`. |
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

`GET /processes/{processId}` returns the process with every question **fully hydrated**, including its
`upstreamId` and synced `status`. `GET /processes` lists them paginated, filterable by `orgAddress`
and question `status`.

- **GET** `/processes/{processId}`
- **GET** `/processes`
- **GET** `/processes/{processId}/questions/{questionId}`

```bash
curl "${auth[@]}" "$B/processes/$PROCESS"
curl "${auth[@]}" "$B/processes?orgAddress=$ORG&status=READY&page=1"
```

```jsonc
{
  "id": "6a1f...", "orgAddress": "0x...", "published": true,
  "census": { "authFields": ["memberNumber"] },
  "title": { "default": "Board election 2026" },
  "startDate": "2026-07-01T09:00:00Z", "endDate": "2026-07-03T18:00:00Z",
  "questions": [{
    "id": "b2c3...", "upstreamId": "a1b2...64hex...", "parentProcessId": "6a1f...",
    "status": "READY", "type": "singlechoice",
    "title": { "default": "Who should chair the board?" },
    "choices": [ /* ... */ ], "eligibleMemberIds": []
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

Once a question reaches `RESULTS`, both single reads (`GET /processes/{processId}` and the public
`GET /processes/{processId}/questions/{questionId}`) also carry its tally **inline** as a `results`
object (`voteCount`, `maxVoters`, `finalResults`, `results`) - absent until then, so poll. The
`GET /processes` list does not resolve it. See [Results](/developers/docs/results).

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

## Growing a published census

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
