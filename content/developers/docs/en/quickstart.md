---
title: Quickstart
lead: Run a full election end to end - create a managed organization, add a voter, open a voting process with an inline census, publish it, and read the tally. Examples are cURL, with TypeScript SDK, C# and Python variants; any HTTP client works the same way.
group: get_started
order: 10
---

This runs the entire lifecycle once: create a managed organization for a customer, add a voter, open a
yes/no process whose census is declared inline, publish it on-chain, and read the tally. There is no
separate census create-and-publish step - the process carries its census.

The one step omitted here is **casting a ballot** - voter-facing client-side cryptography, done in the
browser by the SDK. The Quickstart proves the full server-side path up to reading results; see
[Casting votes](/developers/docs/casting-votes) for the rest.

> [!NOTE] Before you start
> Create an account in the [API Dashboard](https://platform.vocdoni.io) and mint an **API key** under
> your integrator organization. To run this whole flow the key needs the `managed:write`, `managed:read`,
> `quota:read`, `members:write` and `voting:write` scopes - see [API keys](/developers/docs/api-keys).
> Every request carries `Authorization: Bearer <your-api-key>`; the key *is* your integrator identity,
> so the integrator endpoints take no address in the path. The key is shown only once - store it safely.
> For the base URL and environments, see [API conventions](/developers/docs/api-conventions).

> [!NOTE] One managed organization on the free tier
> The free tier allows **one managed organization**. Delete it (see
> [Managed organizations](/developers/docs/managed-organizations)) or request more quota to run the
> Quickstart repeatedly.

:::steps

## Set up a client

Export your key and base URL once; every `curl` below reuses them. Writes also send
`Content-Type: application/json`.

```bash
export VOCDONI_BASE_URL="{{API_BASE_URL}}"
export VOCDONI_API_TOKEN="vsk_your_key_here"
auth=(-H "Authorization: Bearer $VOCDONI_API_TOKEN" -H "Content-Type: application/json")
B="$VOCDONI_BASE_URL"
```

## Create a managed organization

The integrator is resolved from the key, so this endpoint is path-less. Carry forward the returned
`address`.

```bash
ORG=$(curl -s "${auth[@]}" -X POST "$B/integrator/organizations" \
  -d '{"type":"association","meta":{"name":"Maple Street HOA"}}' | jq -r .address)
```

## Add a member

With `?async=true` bulk member writes run as a job: the call returns a `jobId` you poll until `progress: 100`.

```bash
JOB=$(curl -s "${auth[@]}" -X POST "$B/organizations/$ORG/members?async=true" -d '{
  "members": [
    { "name": "Alice", "memberNumber": "A-101", "email": "alice@example.org", "weight": "1" }
  ]
}' | jq -r .jobId)
# a members-job never fails: a row that cannot be stored leaves it pending, so poll with a deadline
if [ -z "$JOB" ] || [ "$JOB" = "null" ]; then echo "no jobId - check the import response" >&2; else
  for i in $(seq 120); do
    [ "$(curl -s "${auth[@]}" "$B/jobs/$JOB" | jq -r .status)" = "completed" ] && break
    [ "$i" = 120 ] && echo "members-job $JOB did not complete - do not build the census yet" >&2
    sleep 1
  done
fi
```

## Create an all-members group

The group is what the inline census points at to include your members.

```bash
GROUP=$(curl -s "${auth[@]}" -X POST "$B/organizations/$ORG/groups" \
  -d '{"title":"All voters","includeAllMembers":true}' | jq -r .id)
```

## Create a voting process

One call carries the inline census (auth-only by member number, populated from the group) and the
question. It returns the `processId` as a draft.

```bash
PROCESS=$(curl -s "${auth[@]}" -X POST "$B/processes" -d @- <<JSON | jq -r .processId
{
  "orgAddress": "$ORG",
  "census": { "authFields": ["memberNumber"], "groupId": "$GROUP" },
  "title": { "default": "Repaint the fence?" },
  "description": { "default": "Annual maintenance vote" },
  "startDate": "2027-07-01T09:00:00Z",
  "endDate": "2027-07-08T09:00:00Z",
  "questions": [
    {
      "title": { "default": "Repaint the fence?" },
      "choices": [
        { "title": { "default": "Yes" }, "value": 0 },
        { "title": { "default": "No" }, "value": 1 }
      ],
      "type": "singlechoice"
    }
  ]
}
JSON
)
```

## Publish on-chain

Publishing is asynchronous and atomic (census + one election per question); poll the job until it
completes. Voters then cast ballots client-side - see [Casting votes](/developers/docs/casting-votes).

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

## Read the results

Public, no auth - addressed by the `processId`, one tally per question.

```bash
curl -s "$B/processes/$PROCESS/results" | jq
```

:::

> [!TIP] Next steps
> Read [Members and groups](/developers/docs/members-and-groups) for bulk imports and the members-job,
> [Census](/developers/docs/census) for auth types and per-question eligibility,
> [Voting processes](/developers/docs/voting-processes) for the full authoring API,
> [Casting votes](/developers/docs/casting-votes) for the client-side ballot flow, and
> [Voting types](/developers/docs/voting-types) for the four named ballot types (single choice,
> multichoice, ranked, cumulative) and the raw override.

## The same flow with TypeScript, C# and Python

The bash steps above translate directly. The TypeScript variant uses the
[integrator SDK](/developers/docs/sdk-quickstart) (`@vocdoni/api-client`); the C# and Python variants
define the `Post`/`Get` helpers they reuse.

:::code-tabs[client setup - the SDK client, or the Post / Get helpers the flow reuses]

```ts
import { VocdoniApiClient } from '@vocdoni/api-client'

const client = new VocdoniApiClient({
  apiUrl: '{{API_BASE_URL}}',
  authToken: process.env.VOCDONI_API_TOKEN,
})
```
```csharp
using System.Net.Http.Json;
using System.Text.Json;

var http = new HttpClient { BaseAddress = new Uri("{{API_BASE_URL}}") };
http.DefaultRequestHeaders.Authorization =
    new("Bearer", Environment.GetEnvironmentVariable("VOCDONI_API_TOKEN"));

async Task<JsonElement> Post(string path, object? body)
{
    var res = await http.PostAsJsonAsync(path, body);
    res.EnsureSuccessStatusCode(); // fail on an API error, like GetFromJsonAsync and raise_for_status
    return await res.Content.ReadFromJsonAsync<JsonElement>();
}
async Task<JsonElement> Get(string path) => await http.GetFromJsonAsync<JsonElement>(path);
```
```python
import os, time, requests

B = "{{API_BASE_URL}}"
s = requests.Session()
s.headers.update({"Authorization": f"Bearer {os.environ['VOCDONI_API_TOKEN']}",
                  "Content-Type": "application/json"})

def post(path, body=None): r = s.post(B + path, json=body); r.raise_for_status(); return r
def get(path):             r = s.get(B + path);             r.raise_for_status(); return r
```
:::

:::code-tabs[full election flow - end to end]

```ts
// 1. managed org
const { address: org } = await client.organizations.createManaged({
  name: 'Maple Street HOA',
  type: 'association',
})

// 2. member (async) -> wait for the members-job
const { jobId } = await client.organizations.addMembers(
  org,
  [{ name: 'Alice', memberNumber: 'A-101', email: 'alice@example.org' }], // weight defaults to 1
  { async: true },
)
if (jobId) await client.jobs.waitFor(jobId)

// 3. all-members group
const { id: group } = await client.organizations.createGroup(org, {
  title: 'All voters',
  includeAllMembers: true,
})

// 4. create the process draft (inline census + question) -> processId
const processId = await client.elections.create({
  orgAddress: org,
  census: { authFields: ['memberNumber'], groupId: group },
  title: 'Repaint the fence?',
  description: 'Annual maintenance vote',
  startDate: '2027-07-01T09:00:00Z',
  endDate: '2027-07-08T09:00:00Z',
  questions: [
    {
      title: 'Repaint the fence?',
      choices: [
        { title: 'Yes', value: 0 },
        { title: 'No', value: 1 },
      ],
      type: 'singlechoice',
    },
  ],
})

// 5. publish (async) -> wait for the job
// The wait gives up after 60s by default while the publish carries on; allow longer.
await client.elections.publishAndWait(processId, { timeoutMs: 5 * 60_000 })

// 6. results - one tally per question
console.log(await client.elections.getResults(processId))
```
```csharp
// 1. managed org
var org = (await Post("/integrator/organizations",
    new { type = "association", meta = new { name = "Maple Street HOA" } })).GetProperty("address").GetString();

// 2. member (async) -> poll the members-job until progress == 100
var job = (await Post($"/organizations/{org}/members?async=true",
    new { members = new[] { new { name = "Alice", memberNumber = "A-101",
                                  email = "alice@example.org", weight = "1" } } })).GetProperty("jobId").GetString();
// completes at progress 100; a failed row keeps it pending, hence the deadline
for (var i = 1; (await Get($"/jobs/{job}")).GetProperty("status").GetString() != "completed"; i++)
{
    if (i == 120) throw new Exception($"members-job {job} did not complete");
    await Task.Delay(1000);
}

// 3. all-members group
var group = (await Post($"/organizations/{org}/groups",
    new { title = "All voters", includeAllMembers = true })).GetProperty("id").GetString();

// 4. create the process draft (inline census + question) -> { processId }
var process = (await Post("/processes", new {
    orgAddress = org,
    census = new { authFields = new[] { "memberNumber" }, groupId = group },
    title = new { @default = "Repaint the fence?" },
    description = new { @default = "Annual maintenance vote" },
    startDate = "2027-07-01T09:00:00Z", endDate = "2027-07-08T09:00:00Z",
    questions = new[] { new {
        title = new { @default = "Repaint the fence?" },
        choices = new[] { new { title = new { @default = "Yes" }, value = 0 },
                          new { title = new { @default = "No" },  value = 1 } },
        type = "singlechoice",
    }}})).GetProperty("processId").GetString();

// 5. publish (async) -> wait for the job
// no jobId on a 200: the process was already published (an API error throws in Post)
if ((await Post($"/processes/{process}/publish", null)).TryGetProperty("jobId", out var pj))
{
    var pjob = pj.GetString();
    for (var i = 1; ; i++)
    {
        await Task.Delay(2000);
        var status = (await Get($"/jobs/{pjob}")).GetProperty("status").GetString();
        if (status == "completed") break;
        if (status == "failed" || i == 150) throw new Exception($"publish job {pjob}: {status}");
    }
}

// 6. results - one tally per question
Console.WriteLine(await Get($"/processes/{process}/results"));
```
```python
# 1. managed org
org = post("/integrator/organizations",
           {"type": "association", "meta": {"name": "Maple Street HOA"}}).json()["address"]

# 2. member (async) -> poll the members-job
job = post(f"/organizations/{org}/members?async=true",
           {"members": [{"name": "Alice", "memberNumber": "A-101",
                         "email": "alice@example.org", "weight": "1"}]}).json()["jobId"]
for _ in range(120):  # completes at progress 100; a failed row keeps it pending, hence the deadline
    if get(f"/jobs/{job}").json()["status"] == "completed":
        break
    time.sleep(1)
else:
    raise RuntimeError(f"members-job {job} did not complete")

# 3. all-members group
group = post(f"/organizations/{org}/groups",
             {"title": "All voters", "includeAllMembers": True}).json()["id"]

# 4. create the process draft (inline census + question) -> { processId }
process = post("/processes", {
    "orgAddress": org,
    "census": {"authFields": ["memberNumber"], "groupId": group},
    "title": {"default": "Repaint the fence?"},
    "description": {"default": "Annual maintenance vote"},
    "startDate": "2027-07-01T09:00:00Z", "endDate": "2027-07-08T09:00:00Z",
    "questions": [{"title": {"default": "Repaint the fence?"},
                   "choices": [{"title": {"default": "Yes"}, "value": 0},
                               {"title": {"default": "No"}, "value": 1}],
                   "type": "singlechoice"}]}).json()["processId"]

# 5. publish (async) -> wait for the job
pjob = post(f"/processes/{process}/publish").json().get("jobId")  # None: already published
for _ in range(150 if pjob else 0):
    status = get(f"/jobs/{pjob}").json()["status"]
    if status == "completed":
        break
    if status == "failed":
        raise RuntimeError(f"publish job {pjob} failed")
    time.sleep(2)
else:
    if pjob:
        raise RuntimeError(f"publish job {pjob} did not complete")

# 6. results - one tally per question
print(get(f"/processes/{process}/results").json())
```
:::
