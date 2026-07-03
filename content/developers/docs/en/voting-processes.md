---
title: Voting processes
lead: A process is an election - a set of questions run against a published census, with rules for how votes are cast and when voting opens and closes.
group: core_concepts
order: 40
---

A **process** is an election: one or more questions run against a published [census](/developers/docs/census),
governed by rules about how votes are cast and when voting opens and closes. You create it off-chain
(fully editable at first), **publish** it on-chain, voters [cast ballots](/developers/docs/casting-votes),
and you read [results](/developers/docs/results).

One **ProcessID** identifies the election throughout. `POST /process` returns it as a bare JSON
string, and you reuse the same id for publish, status, results, metadata, and bundling - before and
after publishing.

## Creating a process

Bind the process to a published census and describe it with election parameters. Titles and
descriptions are [multilanguage strings](/developers/docs/api-conventions#multilanguage-strings) -
objects keyed by language, each with a `default`.

- **POST** `/process`

```bash
PROCESS=$(curl -s "${auth[@]}" -X POST "$B/process" -d "{
  \"orgAddress\":\"$ORG\",\"censusId\":\"$CENSUS\",
  \"metadata\":{\"title\":\"Board election 2026\"},
  \"electionParams\":{
    \"title\":{\"default\":\"Board election 2026\"},
    \"description\":{\"default\":\"Elect the new board\"},
    \"questions\":[{\"title\":{\"default\":\"Who should chair the board?\"},
      \"choices\":[{\"title\":{\"default\":\"Ada Lovelace\"},\"value\":0},
                   {\"title\":{\"default\":\"Alan Turing\"},\"value\":1}]}],
    \"voteType\":{\"maxCount\":1,\"maxValue\":1},
    \"electionType\":{\"autostart\":true,\"interruptible\":true},
    \"startDate\":\"2026-07-01T09:00:00Z\",\"endDate\":\"2026-07-03T18:00:00Z\",
    \"maxCensusSize\":1000
  }}" | jq -r .)   # bare JSON string -> the ProcessID
```

### Election parameters

| Field | Type | Description |
| --- | --- | --- |
| `title` | multilang | Election title, keyed by language with a `default`. |
| `description` | multilang | Longer description of the election. |
| `startDate` | string (ISO 8601) | When voting opens. |
| `endDate` | string (ISO 8601) | When voting closes. |
| `electionType` | object | Behavioral flags such as anonymous and autostart - see below. |
| `voteType` | object | Ballot shape - see [Voting types](/developers/docs/voting-types). |
| `questions` | array | One or more questions, each with a `title` and `choices` (each choice a `title` plus a numeric `value`). |
| `maxCensusSize` | integer | Upper bound on eligible voters for the process. |
| `streamUri` | string | Optional live stream URL shown with the election. |

### Election type flags

- `autostart` - open voting automatically at `startDate`.
- `interruptible` - allow pausing or ending the process early.
- `anonymous` - hide *who* voted using zero-knowledge proofs.
- `dynamicCensus` - allow the census to change after the process starts.
- `secretUntilTheEnd` - keep results hidden until voting closes (encrypted ballots).

### Vote type

`voteType` shapes the ballot - single choice, approval/multichoice, ranked, quadratic, budget, or
multi-question. Each shape is a specific combination of `maxCount`, `maxValue`, `uniqueChoices`, and
cost fields. See **[Voting types](/developers/docs/voting-types)** for the per-field reference and the
ballot shape of each.

:::code-tabs[create a process]

```ts
const process = await client.elections.create({
  orgAddress: org,
  censusId: census,
  metadata: { title: 'Board election 2026' },
  electionParams: {
    title: { default: 'Board election 2026' },
    questions: [{
      title: { default: 'Who should chair the board?' },
      choices: [
        { title: { default: 'Ada Lovelace' }, value: 0 },
        { title: { default: 'Alan Turing' }, value: 1 },
      ],
    }],
    voteType: { maxCount: 1, maxValue: 1 },
    electionType: { autostart: true, interruptible: true },
    startDate: '2026-07-01T09:00:00Z',
    endDate: '2026-07-03T18:00:00Z',
    maxCensusSize: 1000,
  },
})
```
```csharp
var process = (await Post("/process", new {
    orgAddress = org, censusId = census,
    metadata = new { title = "Board election 2026" },
    electionParams = new {
        title = new { @default = "Board election 2026" },
        questions = new[] { new { title = new { @default = "Who should chair the board?" },
            choices = new[] { new { title = new { @default = "Ada Lovelace" }, value = 0 },
                              new { title = new { @default = "Alan Turing" }, value = 1 } } } },
        voteType = new { maxCount = 1, maxValue = 1 },
        electionType = new { autostart = true, interruptible = true },
        startDate = "2026-07-01T09:00:00Z", endDate = "2026-07-03T18:00:00Z",
        maxCensusSize = 1000,
    }})).GetString();
```
```python
process = post("/process", {
    "orgAddress": org, "censusId": census,
    "metadata": {"title": "Board election 2026"},
    "electionParams": {
        "title": {"default": "Board election 2026"},
        "questions": [{"title": {"default": "Who should chair the board?"},
                       "choices": [{"title": {"default": "Ada Lovelace"}, "value": 0},
                                   {"title": {"default": "Alan Turing"}, "value": 1}]}],
        "voteType": {"maxCount": 1, "maxValue": 1},
        "electionType": {"autostart": True, "interruptible": True},
        "startDate": "2026-07-01T09:00:00Z", "endDate": "2026-07-03T18:00:00Z",
        "maxCensusSize": 1000,
    }}).json()
```
:::

## Publishing on-chain

Publishing is **asynchronous**: it returns a `jobId` (or `200` directly if already published). Poll
the [job](/developers/docs/jobs) until it completes.

- **POST** `/process/{processId}/publish`

```bash
PJOB=$(curl -s "${auth[@]}" -X POST "$B/process/$PROCESS/publish" | jq -r .jobId)
until [ "$(curl -s "$B/jobs/$PJOB" | jq -r .status)" = "completed" ]; do sleep 2; done
```

The job's `result.address` is the **on-chain election id**. You keep addressing the process by its
**ProcessID** for everything server-side; the on-chain id surfaces only client-side, when a voter
signs a ballot.

## Changing status

Status changes (`ready`, `paused`, `ended`, `canceled`) are also asynchronous. Address by ProcessID.

- **PUT** `/process/{processId}/status`

```bash
curl "${auth[@]}" -X PUT "$B/process/$PROCESS/status" -d '{"status":"ended"}'
```

```jsonc
{ "jobId": "d4e5f6..." }   // 202 - poll /jobs/{jobId}
```

## Process bundles

A **bundle** groups one or more processes under a census and is the **voter-facing entry point** for
casting. Reference each process by its **ProcessID**. Bundles are useful when an assembly votes on
several motions in one session.

- **POST** `/process/bundle`
- **GET** `/organizations/{address}/processes`

```bash
BUNDLE_URI=$(curl -s "${auth[@]}" -X POST "$B/process/bundle" \
  -d "{\"censusId\":\"$CENSUS\",\"processes\":[\"$PROCESS\"]}" | jq -r .uri)
BUNDLE="${BUNDLE_URI##*/}"   # bundleId is the last path segment
```

```jsonc
{ "root": "deadbeef...", "uri": "https://.../process/bundle/<bundleId>" }
```

> [!TIP] Reading results
> Once a process is running you can read live or final tallies. See [Results](/developers/docs/results)
> for the response shape and how finality works.

## Gotchas

- `POST /process` returns a **bare string** (the ProcessID), not an object.
- Publish and status changes are **jobs** - read the outcome from `/jobs/{jobId}`, not the POST body.
- Address the process by its **ProcessID** everywhere server-side (status, results, metadata, bundle);
  the on-chain id is only needed client-side, to sign voter payloads.
