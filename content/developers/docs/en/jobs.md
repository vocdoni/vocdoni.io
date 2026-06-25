---
title: Jobs
lead: Some operations take longer than a single request should wait - bulk imports, census publishing, process publishing and status changes. These return a job id you poll until the work finishes.
group: core_concepts
order: 60
---

## The async pattern

When an endpoint runs asynchronously it responds immediately with a job id. Poll the job until its status is completed or failed, then read the result. Keep polling intervals reasonable - a few seconds is usually enough.

- **GET** `/jobs/{jobId}`

| Field | Type | Description |
| --- | --- | --- |
| `jobId` | string | Identifier returned when the work was enqueued. |
| `type` | string | What kind of work the job performs. |
| `status` | string | pending, completed or failed. |
| `result` | object | On success, details such as an address or vote id. |
| `error` | string | On failure, a human-readable reason. |

```bash
curl "{{API_BASE_URL}}/jobs/$JOB_ID" \
  -H "Authorization: Bearer $TOKEN"

# Pending
# { "jobId": "a1b2c3", "type": "publish_process", "status": "pending" }

# Completed
# { "jobId": "a1b2c3", "type": "publish_process", "status": "completed",
#   "result": { "address": "0xprocess...", "status": "READY" } }

# Failed
# { "jobId": "a1b2c3", "type": "publish_process", "status": "failed", "error": "..." }
```

## Job types

- `org_members` - bulk member import.
- `census_participants` - adding participants to a census.
- `publish_process` - publishing a voting process.
- `set_process_status` - changing a process status.
- `relay_vote` - relaying a vote to the protocol.

## Listing jobs

You can list an organization's jobs with pagination and an optional type filter to monitor recent imports and batch operations.

- **GET** `/organizations/{address}/jobs`

> [!WARNING] Jobs expire
> Member import jobs are cleared shortly after they complete. Read the final state promptly rather than relying on the job being available indefinitely.
