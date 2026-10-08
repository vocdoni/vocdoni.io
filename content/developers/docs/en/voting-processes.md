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
id as **`upstreamId`** (voters need it to sign; you never address the process by it). The process also
publishes a metadata-only **parent election** holding its own title, description and media - see
[The on-chain metadata](#the-on-chain-metadata).

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
| `header` | string | Optional banner image URL, [imported](#images) into the SaaS storage on save. |
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
| `metadata` | object | Optional free-form display info, published in the question's election document. Each entry of `metadata.choices` (`{ value, description, image, ... }`) becomes the display info of the choice with that `value`; every other key goes to the question. Choice images are [imported](#images) on save. |

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

While a process is unpublished you can replace its fields with the same body. Once published this
update returns `409`: the ballot, dates and census are fixed, and only the text can still change,
through [`PUT /processes/{processId}/metadata`](#editing-the-content-of-a-published-process).

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
  "upstreamId": "e4f5...64hex...",   // the parent election
  "metadataURL": "https://.../storage/0b7c....json", "metadataHash": "5d41...64hex...",
  "census": { "authFields": ["memberNumber"], "size": 500, "totalWeight": 500 },
  "title": { "default": "Board election 2026" },
  "startDate": "2026-07-01T09:00:00Z", "endDate": "2026-07-03T18:00:00Z",
  "questions": [{
    "id": "b2c3...", "upstreamId": "a1b2...64hex...", "parentProcessId": "6a1f...",
    "status": "READY", "type": "singlechoice",
    "metadataURL": "https://.../storage/4f2a....json", "metadataHash": "9f86d081...64hex...",
    "parentUpstreamId": "e4f5...64hex...",
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

A published process carries its **parent election** as `upstreamId`, `metadataURL` and `metadataHash`,
and each published question its own **`metadataURL`** (where the metadata document its election points
to is served), **`metadataHash`** (the SHA-256 of the exact bytes served there, as committed on chain)
and **`parentUpstreamId`** (the parent it is linked to). Every vote attests both the question's and the
process's `metadataHash`, so a voter app reads them from the same response it renders the ballot from -
see [Casting votes](/developers/docs/casting-votes#the-ballot-metadata-hashes) - and anyone can use them
to [audit the ballot](#auditing-on-chain). All are absent on a draft.

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

Publishing is **asynchronous** and **atomic**: the census, the metadata-only
[parent election](#the-on-chain-metadata) and one election per question are published in a single
batch. It returns a `jobId`; poll the [job](/developers/docs/jobs) until it completes.
Either all questions publish or none do.

- **POST** `/processes/{processId}/publish`

```bash
PJOB=$(curl -s "${auth[@]}" -X POST "$B/processes/$PROCESS/publish" | jq -r .jobId)
until [ "$(curl -s "$B/jobs/$PJOB" | jq -r .status)" = "completed" ]; do sleep 2; done
```

On success the process gains the parent's `upstreamId`, each question its own `upstreamId` and a
`status` of `READY`, and the process flips to `published: true` - only once every election is
confirmed; a retry publishes only what is missing. Re-read the process to get the `upstreamId`s that voters sign against.

## Editing the content of a published process

What voters read stays editable after publishing - to fix a typo or a translation, or swap an image.
A dedicated endpoint pair reads and writes only that content: the process `title`, `description`,
`header` and `streamUri`, and each question's `title`, `description` and choices - each choice's
`title` and its display info `meta` (`description`, `image`...). Nothing structural can change: the
body has no field for a question's type, setup, choice values or ballot protocol, nor for dates or
census.

- **GET** `/processes/{processId}/metadata`
- **PUT** `/processes/{processId}/metadata`

The read is public for a published process; a draft is visible only to a manager/admin of the org (or a
`voting:write` API key) and is a `404` for everyone else. The write requires a manager/admin, or a
`voting:write` API key. Both use the same shape, so read it, change the content, and send it back:

```bash
curl -s "$B/processes/$PROCESS/metadata" > meta.json
# edit meta.json, keeping every question and choice in place
curl "${auth[@]}" -X PUT "$B/processes/$PROCESS/metadata" -d @meta.json
```

```jsonc
{
  "title": { "default": "Board election 2026" },
  "description": { "default": "Elect the new board" },
  "header": "https://.../storage/1c9e....png",
  "streamUri": "https://www.youtube.com/watch?v=...",
  "questions": [{
    "title": { "default": "Who should chair the board?" },
    "choices": [
      { "title": { "default": "Ada Lovelace" },
        "meta": { "description": { "default": "Mathematician" }, "image": "https://.../storage/77ab....png" } },
      { "title": { "default": "Alan Turing" } }
    ]
  }]
}
```

Questions and choices carry no ids: they are **matched by position**, so the body must keep the order
the read returned and the **same number** of questions, and of choices in each question - otherwise the
call is a `400`. A choice sent without `meta` keeps its display info; `"meta": {}` clears it. New
external images are [imported](#images) as on create - a `422` (`40179`) names the field and URL of one
that cannot be, and nothing is changed.

What happens next depends on the process:

- **Draft** - the content is stored right away: `200`.
- **Published, nothing changed** - an edit that changes no metadata document answers `200` without
  touching the chain. This is the only case of a published process that does not create a job.
- **Published, content changed** - every election whose
  [metadata document](#the-on-chain-metadata) changes gets a new document at a new `metadataURL`,
  committed on chain with a `SET_PROCESS_METADATA` transaction: the process's **parent election** when
  its `title`, `description`, `header` or `streamUri` change, and **each question** whose title,
  description or choices change. The call answers `202` with a `jobId` to poll - a
  `set_process_metadata` [job](/developers/docs/jobs#job-types) whose result has a `parent` entry (when
  the parent changes) and one `questions` entry per changed question, each with the
  `metadataURL`/`metadataHash` its transaction commits and its own status.

```jsonc
{ "jobId": "c7d8e9..." }   // 202 - poll /jobs/{jobId}
```

The stored content, `metadataURL` and `metadataHash` change only **once the transaction is mined**, so
what the API serves always matches what the election commits to on chain. A transaction can also never
be mined - the chain may drop it, for example when the organization's balance is insufficient or the
election is no longer `READY` or `PAUSED`. That entry then ends as `failed` in the job and the election
**keeps its previous version**, which stays valid for voting. If some entries failed, send the same edit
again - the elections already updated are skipped. Earlier documents stay served at their old URLs, so
what a voter was shown at any time remains checkable.

Only one edit per process is in flight at a time: a second `PUT` is refused with `409` (`40905`) until
the previous edit is final - every transaction mined or dropped, which takes at most about ten minutes.
Poll its job, then edit again.

The chain accepts a metadata update only while the election is `READY` or `PAUSED`. The `PUT` returns
`409` with one of these codes:

| Code | When |
| --- | --- |
| `40903` | A publish of the process is in progress. |
| `40905` | A previous metadata edit of the process is not final yet (mined or dropped) - poll its job, then edit again. |
| `40906` | An election whose metadata would change is no longer `READY` or `PAUSED` (ended, canceled, results). |

> [!WARNING] Voters holding the old ballot must reload
> Every vote attests the metadata hashes of the ballot the voter was shown - the question's and the
> parent's. While an edit is pending, votes attesting either the current or the pending version are
> relayed and the chain decides which one it accepts. A vote attesting any other version is refused
> with `409` code `40904`, and the voter app must reload the process and show the updated ballot before
> letting them vote. See [Casting votes](/developers/docs/casting-votes#the-ballot-metadata-hashes).
> Edit a live process only when the correction is worth that interruption.

## The on-chain metadata

The text and images a voter is shown are not stored on chain - only a pointer to them is. Every
election commits two things: the `metadataURL` of its metadata document, and the `metadataHash`, the
SHA-256 (lowercase hex) of the exact bytes served there. A process publishes:

- a **parent election**, metadata-only: no vote options or census, so it can never be voted on. Its
  document holds the process `title`, `description`, `header` and `streamUri`, with no questions. The
  process read exposes it as the process's `upstreamId`, `metadataURL` and `metadataHash`;
- **one election per question**, linked to the parent on chain (the question's `parentUpstreamId`).
  Its document holds the question's title, description and choices, with the question's display info
  in `questions[0].meta` and each choice's in `choices[i].meta`.

Every vote carries **both hashes** - its question's and the parent's - and the chain refuses it unless
both match the elections' current ones. So a voter never needs to check anything: the ballot they vote
on is, by construction, the one committed on chain.

The hash pins the bytes of the document, and the document pins the **images** it references:
`meta.mediaHashes` maps each image URL to the SHA-256 of its bytes - the `header` in the parent's
document, the choice images in each question's:

```jsonc
{
  "title": { "default": "Who should chair the board?" },
  "questions": [{
    "title": { "default": "Who should chair the board?" },
    "choices": [{
      "title": { "default": "Ada Lovelace" }, "value": 0,
      "meta": { "description": { "default": "Mathematician" }, "image": "https://.../storage/77ab....png" }
    }]
  }],
  "meta": { "mediaHashes": { "https://.../storage/77ab....png": "3a7bd3e2...64hex..." } }
}
```

The video (`streamUri`) and images embedded inside descriptions are covered **by URL only**: the hash
fixes which URL was shown, not the bytes behind it.

### Images

So that every image can be hashed by content, images are **imported into the SaaS storage when the
process is saved** - on create, on a draft update and on a metadata edit. The process `header` and the
choice images (a choice's `image`, as a URL or as `default`/`thumbnail` URLs) are fetched, stored, and
their URL is replaced with the stored copy's. Only public `http`/`https` URLs are fetched, and only
JPEG and PNG images up to 32 MiB are accepted. If one cannot be imported the save fails with `422`,
code `40179`, naming the field and the URL, and nothing is stored.

### Auditing on chain

Anyone can audit a process without trusting the SaaS. Fetch each document and compare its SHA-256 with
the committed hash:

```bash
P=$(curl -s "$B/processes/$PROCESS")
curl -s "$(jq -r .metadataURL <<<"$P")" | sha256sum                # the parent: = .metadataHash
curl -s "$(jq -r '.questions[0].metadataURL' <<<"$P")" | sha256sum  # a question: = .questions[0].metadataHash
```

To check against the chain itself, read the elections from a Vochain API node (`/v2`):

- `GET /elections/{electionId}` - the election's current `metadataURL` and `metadataHash`, plus
  `parentElectionId` on a question election and `metadataOnly: true` on the parent;
- `GET /elections/{electionId}/children` - the question elections linked to a parent;
- `GET /elections/{electionId}/metadata/history` - every version the election has had, oldest first:
  the one it was published with and each [later edit](#editing-the-content-of-a-published-process),
  with the block, transaction and time that set it.

```jsonc
{ "versions": [
  { "metadataURL": "https://.../storage/4f2a....json", "metadataHash": "9f86...",
    "blockHeight": 123400, "txIndex": 0, "txHash": "a1b2...", "timestamp": "2026-07-01T08:59:12Z" },
  { "metadataURL": "https://.../storage/8e31....json", "metadataHash": "2c26...",
    "blockHeight": 124010, "txIndex": 3, "txHash": "c3d4...", "timestamp": "2026-07-01T10:14:40Z" }
] }
```

The `@vocdoni/metadata-verify` package of the SDK implements both: `verifyProcessMetadata()` checks
the documents and images a page shows against the hashes in the process read, and
`auditProcessMetadata()` walks the metadata history of the parent and every question on the Vochain
API, diffing each version against the previous one.

> [!NOTE] Unreleased protocol support
> The parent election and the parent hash on votes need protocol versions that are not released yet:
> `@vocdoni/proto` 1.18.0, and a vocdoni-node release with the parent-process soft fork (`ParentFork`)
> scheduled on the chain.

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

- A process is a **draft** until you publish it; full edits are allowed only while `published: false`.
  After publishing only the content voters read can change, through `PUT /processes/{processId}/metadata`.
- Publish, status changes and metadata edits of a published process are **jobs** - read the outcome
  from `/jobs/{jobId}`, not the POST body.
- Address the process by its **`processId`** everywhere server-side. A question's **`upstreamId`** is
  only needed client-side, when a voter signs a ballot for that question. The process's own
  `upstreamId` is its parent election, which is never voted on - a vote sent to it is a `404`.
- The inline census id is internal - you never send or receive it. See [Census](/developers/docs/census).
