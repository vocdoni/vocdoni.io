---
title: Jobs
lead: Some operations take longer than a single request should wait - bulk imports, process publishing and status changes. These return a job id you poll until the work finishes.
group: core_concepts
order: 60
---

Anything that touches the chain - publishing a process, changing its status, relaying a vote - and
bulk member imports run **asynchronously**. The write returns a **`jobId`**, and you poll one endpoint
to learn the outcome. This is the async spine of the API.

## Polling a job

The generic job endpoint is **public** - the job id is the capability. Poll it until `status` is
`completed` or `failed`, then read the result. Everyone gets the status and counters; per-row import
error detail (which can reference member data) is added **only for a logged-in manager/admin** (a
dashboard session) - scoped API keys are treated as anonymous on this endpoint.

- **GET** `/jobs/{jobId}`

```bash
curl -s "$B/jobs/$JOBID"     # public: status + counters (per-row errors only for a manager session)
```

```jsonc
{ "jobId": "a1b2c3...",
  "type": "publish_voting_process",   // org_members | publish_voting_process |
                                      //   set_process_status | relay_vote
  "status": "completed",              // pending | completed | failed
  "result": { "status": "READY",      // on status change: the new status
              "voteID": "" },         // on relay_vote: the vote nullifier
  "errors": [] }                      // per-row import failures; omitempty (absent), manager session only
```

| Field | Type | Description |
| --- | --- | --- |
| `jobId` | string | Identifier returned when the work was enqueued. |
| `type` | string | What kind of work the job performs. |
| `status` | string | pending, completed or failed. |
| `result` | object | On success, details such as an address or vote id. |
| `errors` | string[] | Per-row import failures (`line N:` prefixed), returned only to a logged-in manager/admin (dashboard session); scoped API keys and anonymous callers get status and counters only. `omitempty`, so absent when empty. |

Rules of thumb:

- The call always returns `200`, even for failures - branch on the **`status`** field.
- `completed`: read `result`. `failed`: **fail fast** (don't keep polling); read `errors` for the
  reason (per-row import detail needs a manager/admin session). Anything else: keep polling (every ~2s is plenty).

:::code-tabs[poll to completion]

```ts
// Polls until the job is done; throws JobFailedError on failure.
const job = await client.jobs.waitFor(jobId)
```
```csharp
JsonElement job;
do { await Task.Delay(2000); job = await Get($"/jobs/{jobId}"); }
while (job.GetProperty("status").GetString() == "pending");
if (job.GetProperty("status").GetString() == "failed")
    throw new Exception(job.GetProperty("errors").ToString());
```
```python
while True:
    job = get(f"/jobs/{jobId}").json()
    if job["status"] == "completed": break
    if job["status"] == "failed": raise RuntimeError(job["errors"])
    time.sleep(2)
```
:::

## Job types

- `org_members` - bulk member import.
- `publish_voting_process` - publishing a process (its census and one election per question, in one batch).
- `set_process_status` - changing a question's status.
- `relay_vote` - relaying a vote to the protocol.

## The members-job

A bulk member add is an `org_members` job - poll the same generic `GET /jobs/{jobId}`. Its `result`
carries the import counters (`added`, `total`, `progress`); top-level `errors` carries any per-row
failures:

```bash
curl -s "${auth[@]}" "$B/jobs/$JOBID"
```

```jsonc
{ "type": "org_members", "status": "pending",
  "result": { "added": 120, "total": 200, "progress": 60 } }   // errors omitempty: absent when empty
```

When present, each entry in `errors` is prefixed with `line N:` - the 1-based position of the offending
member in the list you submitted - so you can map a failure back to its input row. Per-row `errors`
detail is returned **only to a logged-in manager/admin** (a dashboard session); anonymous and API-key
polls get the counters only. Because `errors` is omitempty it is **absent** (never `[]`) when there is
nothing to report.

Wait for `result.progress: 100` before publishing a process whose census uses the members.
See [Members and groups](/developers/docs/members-and-groups#adding-members).

## Listing jobs

You can list an organization's jobs with [pagination](/developers/docs/api-conventions#pagination) and
an optional `type` filter to monitor recent imports and batch operations.

- **GET** `/jobs?orgAddress={address}`

> [!NOTE] Listing needs a dashboard session
> `GET /jobs` currently requires a logged-in manager/admin; scoped API keys are rejected (`403`). Poll a
> known job by id (`GET /jobs/{jobId}`) if you only have an API key.

> [!WARNING] Jobs expire
> Member import jobs are cleared shortly after they complete. Read the final state promptly rather than
> relying on the job being available indefinitely.
