---
title: Members and groups
lead: Members are the people in your organization. Import them once, organize them into groups, and reuse them in the census of many processes.
group: core_concepts
order: 20
---

**Members** are an organization's people - your customer's voters. **Groups** are named subsets of
members, and a group can **populate a process census** by reference (see
[Census](/developers/docs/census)).

## The member object

A member carries identity and contact fields plus an optional census weight and arbitrary custom
fields. Provide whatever your authentication strategy needs; you do not have to fill every field.

| Field | Type | Description |
| --- | --- | --- |
| `memberNumber` | string | Your identifier for the member, unique within the organization. |
| `name` | string | Given name. |
| `surname` | string | Family name. |
| `email` | string | Email, used for email-based authentication and reminders. |
| `phone` | string | Phone number, used for SMS authentication. |
| `nationalId` | string | National identity document, when used to authenticate. |
| `birthDate` | string | Date of birth in YYYY-MM-DD format. |
| `weight` | string | Vote weight for weighted censuses. A string, e.g. `"1"`. Defaults to 1. |
| `other` | object | Custom key-value fields specific to your organization. |

## Adding members

Member imports are **bulk**. Add `?async=true` (`{ async: true }` in the SDK) to run them as a job: the
call returns a `jobId`, and you poll a members-job until it reports `progress: 100`. Without it the call
imports synchronously and answers `{ "added": N }` with no `jobId`.

- **POST** `/organizations/{address}/members`

```bash
JOB=$(curl -s "${auth[@]}" -X POST "$B/organizations/$ORG/members?async=true" -d '{
  "members": [
    { "name": "Alice", "surname": "Doe", "email": "alice@example.org",
      "memberNumber": "A-101", "weight": "1" }
  ]
}' | jq -r .jobId)

# poll the members-job until done
# a members-job never fails: a row that cannot be stored leaves it pending, so poll with a deadline
for _ in $(seq 120); do
  [ "$(curl -s "${auth[@]}" "$B/jobs/$JOB" | jq -r .status)" = "completed" ] && break; sleep 1
done
```

```jsonc
// GET /jobs/{jobId}
{ "type": "org_members", "status": "completed",
  "result": { "added": 1, "total": 1, "progress": 100 } }   // errors omitempty: absent when empty
```

:::code-tabs[add members (async)]

```ts
const { jobId } = await client.organizations.addMembers(
  org,
  // weight defaults to 1. The API expects it as a string ("2"); the SDK types it as a number, and
  // sending a number fails with 400 - omit it or cast a string until the SDK type is fixed.
  [{ name: 'Alice', surname: 'Doe', email: 'alice@example.org', memberNumber: 'A-101' }],
  { async: true },
)
// Polls the members-job until progress 100. A members-job never reports `failed`: if a row cannot be
// stored it stays pending below 100, so this times out (60s by default - raise timeoutMs for large imports).
if (jobId) await client.jobs.waitFor(jobId, { timeoutMs: 10 * 60_000 })
```
```csharp
var job = (await Post($"/organizations/{org}/members?async=true",
    new { members = new[] { new { name = "Alice", memberNumber = "A-101", weight = "1" } } }))
    .GetProperty("jobId").GetString();
for (var i = 0; i < 120 && (await Get($"/jobs/{job}")).GetProperty("status").GetString() != "completed"; i++)
    await Task.Delay(1000); // completes at progress 100; a failed row keeps it pending, hence the deadline
```
```python
job = post(f"/organizations/{org}/members?async=true",
           {"members": [{"name": "Alice", "memberNumber": "A-101", "weight": "1"}]}).json()["jobId"]
for _ in range(120):  # completes at progress 100; a failed row keeps it pending, hence the deadline
    if get(f"/jobs/{job}").json()["status"] == "completed":
        break
    time.sleep(1)
```
:::

> [!WARNING] Wait for the import job
> Don't build the census until the members-job reaches `progress: 100` - the participants won't be
> there yet. A members-job never reports `failed`: when a row cannot be stored the job stays `pending`
> with `progress` below 100 (or absent), so give your poll loop a deadline instead of waiting forever.
> See [Jobs](/developers/docs/jobs) for the full job model.

## Listing members

The list is **paginated** (default `limit` is small) - see
[Pagination](/developers/docs/api-conventions#pagination). Walk every page so large memberbases aren't
silently truncated.

```bash
curl "${auth[@]}" "$B/organizations/$ORG/members?page=1&limit=100"
```

```jsonc
{ "members": [ { "id": "...", "memberNumber": "A-101", "name": "Alice" } ],
  "pagination": { "currentPage": 1, "lastPage": 1, "totalItems": 1 } }
```

**Python · walk every page**

```python
members, page = [], 1
while True:
    r = get(f"/organizations/{org}/members?page={page}&limit=100").json()
    members += r["members"]
    p = r.get("pagination")
    if not r["members"] or not p or p["currentPage"] >= p["lastPage"]:
        break
    page += 1
```

**TypeScript · walk every page**

```ts
const members = []
for (let page = 1; ; page++) {
  const r = await client.organizations.listMembers(org, page)
  members.push(...r.members)
  const p = r.pagination
  if (!r.members.length || !p || p.currentPage >= p.lastPage) break
}
```

## Updating and deleting members

Update a single member, or delete members by id. Note the delete path is **plural** with a body of
`ids`; the singular `/member` returns 404 on the deployed backend.

- **PUT** `/organizations/{address}/members`
- **DELETE** `/organizations/{address}/members`

An update rewrites `weight` too: leave it out and the member's weight resets to `1`, which changes
their vote in a weighted census. Always resend the member's current weight.

```bash
curl "${auth[@]}" -X PUT "$B/organizations/$ORG/members" \
  -d '{"id":"<memberId>","memberNumber":"A-101","email":"alice@example.org","weight":"1"}'
curl "${auth[@]}" -X DELETE "$B/organizations/$ORG/members" -d '{"ids":["<memberId>"]}'
```

```ts
// Resend the current weight: an update without it resets the member to 1. The API wants a string,
// while the SDK types it as a number, so cast until the SDK type is fixed.
await client.organizations.upsertMember(org, {
  id: memberId,
  memberNumber: 'A-101',
  email: 'alice@example.org',
  weight: '1' as unknown as number,
})
await client.organizations.deleteMembers(org, { ids: [memberId] })
```

Member and group changes **cascade to the censuses of ongoing processes** - the memberbase is the
source of truth (see [Census](/developers/docs/census#kept-in-sync-with-the-memberbase)). Two
consequences for these endpoints:

- **Deleting a voter who already got their ballot signed is refused.** If the credential service has
  already signed for a member on a question that is still `READY` or `PAUSED`, the delete returns a
  `409` (error code `40173`) with the offending ids in `data.signedMemberIds` - one entry per
  member, in the order you sent them. Retry once voting closes on those questions; deletion is never
  permanently blocked. The same guard applies to removing such a member from a group a live census
  was built from.
- **Additions propagate.** A new member, or a member added to a group, joins the live censuses built
  from that group and can vote; creations are gated by your plan's census quota.

Malformed or unknown ids in the delete body are ignored rather than failing the request.

## Groups

A group is a named subset of members. The common case is an **all-members group**, which a process
[census](/developers/docs/census) can reference by `groupId` to include everyone. You can also build a
group from explicit member ids, and validate that its members carry the fields a census will require.

- **GET** `/organizations/{address}/groups`
- **POST** `/organizations/{address}/groups`
- **PUT** `/organizations/{address}/groups/{groupID}`
- **POST** `/organizations/{address}/groups/{groupID}/validate`

```bash
GROUP=$(curl -s "${auth[@]}" -X POST "$B/organizations/$ORG/groups" \
  -d '{"title":"All voters","includeAllMembers":true}' | jq -r .id)
```

```jsonc
{ "id": "665f..." }   // carry forward: group id
```

:::code-tabs[create an all-members group]

```ts
const { id: group } = await client.organizations.createGroup(org, {
  title: 'All voters',
  includeAllMembers: true,
})
```
```csharp
var group = (await Post($"/organizations/{org}/groups",
    new { title = "All voters", includeAllMembers = true })).GetProperty("id").GetString();
```
```python
group = post(f"/organizations/{org}/groups",
             {"title": "All voters", "includeAllMembers": True}).json()["id"]
```
:::

## Gotchas

- Adding members with `?async=true` is a **job** - wait for `progress: 100` before building a census.
- Listing is **paginated** - walk the pages.
- Delete is `DELETE /organizations/{addr}/members` (**plural**), with `{ "ids": [...] }`.
- For an **auth-only** census, each `memberNumber` must be **unique** - it becomes the voting
  credential (see [Census](/developers/docs/census)).
