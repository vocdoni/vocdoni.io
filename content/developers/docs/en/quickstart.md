---
title: Quickstart
lead: Run a full election end to end - create a managed organization, build a census, open a voting process and read the tally. Examples are cURL, with C# and Python variants; any HTTP client works the same way.
group: get_started
order: 10
---

This runs the entire lifecycle once: create a managed organization for a customer, add a voter, build
an auth-only census, open a yes/no election, publish it on-chain, and read the tally.

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

Bulk member writes are asynchronous: the call returns a `jobId` you poll until `progress: 100`.

```bash
JOB=$(curl -s "${auth[@]}" -X POST "$B/organizations/$ORG/members" \
  -d '{"members":[{"name":"Alice","memberNumber":"A-101","email":"alice@example.org","weight":"1"}]}' \
  | jq -r .jobId)
until [ "$(curl -s "${auth[@]}" "$B/organizations/$ORG/members/job/$JOB" | jq -r .progress)" = "100" ]; do sleep 1; done
```

## Create an all-members group

The group is the bridge to publishing an auth-only census.

```bash
GROUP=$(curl -s "${auth[@]}" -X POST "$B/organizations/$ORG/groups" \
  -d '{"title":"All voters","includeAllMembers":true}' | jq -r .id)
```

## Create an auth-only census

Voters authenticate by member number; no second factor.

```bash
CENSUS=$(curl -s "${auth[@]}" -X POST "$B/census" \
  -d "{\"orgAddress\":\"$ORG\",\"authFields\":[\"memberNumber\"]}" | jq -r .id)
```

## Publish the census through the group

Auth-only censuses must be published **through a group** - the plain `/publish` rejects them.

```bash
curl -s "${auth[@]}" -X POST "$B/census/$CENSUS/group/$GROUP/publish" \
  -d '{"authFields":["memberNumber"],"weighted":false}' >/dev/null
```

## Create a voting process

`POST /process` returns the ProcessID as a bare JSON string.

```bash
PROCESS=$(curl -s "${auth[@]}" -X POST "$B/process" -d "{
  \"orgAddress\":\"$ORG\",\"censusId\":\"$CENSUS\",
  \"metadata\":{\"title\":\"Repaint the fence?\"},
  \"electionParams\":{
    \"title\":{\"default\":\"Repaint the fence?\"},
    \"description\":{\"default\":\"Annual maintenance vote\"},
    \"questions\":[{\"title\":{\"default\":\"Repaint the fence?\"},
      \"choices\":[{\"title\":{\"default\":\"Yes\"},\"value\":0},
                   {\"title\":{\"default\":\"No\"},\"value\":1}]}],
    \"voteType\":{\"maxCount\":1,\"maxValue\":1},
    \"electionType\":{\"autostart\":true,\"interruptible\":true},
    \"startDate\":\"2026-07-01T09:00:00Z\",\"endDate\":\"2026-07-08T09:00:00Z\",
    \"maxCensusSize\":1000
  }}" | jq -r .)
```

## Publish on-chain

Publishing is asynchronous; poll the job until it completes. Voters then cast ballots client-side with
the SDK.

```bash
PJOB=$(curl -s "${auth[@]}" -X POST "$B/process/$PROCESS/publish" | jq -r .jobId)
until [ "$(curl -s "$B/jobs/$PJOB" | jq -r .status)" = "completed" ]; do sleep 2; done
```

## Read the results

Public, no auth - addressed by the ProcessID.

```bash
curl -s "$B/process/$PROCESS/results" | jq
```

:::

> [!TIP] Next steps
> Read [Members and groups](/developers/docs/members-and-groups) for bulk imports and the members-job,
> [Census](/developers/docs/census) for auth-only vs. 2FA, [Voting processes](/developers/docs/voting-processes)
> for parameters and bundles, [Casting votes](/developers/docs/casting-votes) for the client-side ballot
> flow, and [Voting types](/developers/docs/voting-types) for single choice, approval, ranked and
> quadratic ballots.

## The same flow in C# and Python

The bash steps above translate directly. The client setup defines the `Post`/`Get` helpers the flow
reuses.

:::code-tabs[client setup - the Post / Get helpers the flow reuses]

```csharp
using System.Net.Http.Json;
using System.Text.Json;

var http = new HttpClient { BaseAddress = new Uri("{{API_BASE_URL}}") };
http.DefaultRequestHeaders.Authorization =
    new("Bearer", Environment.GetEnvironmentVariable("VOCDONI_API_TOKEN"));

async Task<JsonElement> Post(string path, object? body) =>
    await (await http.PostAsJsonAsync(path, body)).Content.ReadFromJsonAsync<JsonElement>();
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

:::code-tabs[full election flow - all eight steps, end to end]

```csharp
// 1. managed org
var org = (await Post("/integrator/organizations",
    new { type = "association", meta = new { name = "Maple Street HOA" } })).GetProperty("address").GetString();

// 2. member (async) -> poll the members-job until progress == 100
var job = (await Post($"/organizations/{org}/members",
    new { members = new[] { new { name = "Alice", memberNumber = "A-101",
                                  email = "alice@example.org", weight = "1" } } })).GetProperty("jobId").GetString();
while ((await Get($"/organizations/{org}/members/job/{job}")).GetProperty("progress").GetInt32() < 100)
    await Task.Delay(1000);

// 3. group   4. census (auth-only)   5. group-publish
var group = (await Post($"/organizations/{org}/groups",
    new { title = "All voters", includeAllMembers = true })).GetProperty("id").GetString();
var census = (await Post("/census", new { orgAddress = org, authFields = new[] { "memberNumber" } })).GetProperty("id").GetString();
await Post($"/census/{census}/group/{group}/publish", new { authFields = new[] { "memberNumber" }, weighted = false });

// 6. create the process -> bare JSON string (the ProcessID)
var process = (await Post("/process", new {
    orgAddress = org, censusId = census,
    metadata = new { title = "Repaint the fence?" },
    electionParams = new {
        title = new { @default = "Repaint the fence?" },
        description = new { @default = "Annual maintenance vote" },
        questions = new[] { new { title = new { @default = "Repaint the fence?" },
            choices = new[] { new { title = new { @default = "Yes" }, value = 0 },
                              new { title = new { @default = "No" },  value = 1 } } } },
        voteType = new { maxCount = 1, maxValue = 1 },
        electionType = new { autostart = true, interruptible = true },
        startDate = "2026-07-01T09:00:00Z", endDate = "2026-07-08T09:00:00Z",
        maxCensusSize = 1000,
    }})).GetString();

// 7. publish (async) -> wait for the job
var pjob = (await Post($"/process/{process}/publish", null)).GetProperty("jobId").GetString();
JsonElement j;
do { await Task.Delay(2000); j = await Get($"/jobs/{pjob}"); }
while (j.GetProperty("status").GetString() != "completed");

// 8. results - addressed by the ProcessID
Console.WriteLine(await Get($"/process/{process}/results"));
```
```python
# 1. managed org
org = post("/integrator/organizations",
           {"type": "association", "meta": {"name": "Maple Street HOA"}}).json()["address"]

# 2. member (async) -> poll the members-job
job = post(f"/organizations/{org}/members",
           {"members": [{"name": "Alice", "memberNumber": "A-101",
                         "email": "alice@example.org", "weight": "1"}]}).json()["jobId"]
while get(f"/organizations/{org}/members/job/{job}").json()["progress"] < 100:
    time.sleep(1)

# 3. group   4. census (auth-only)   5. group-publish
group = post(f"/organizations/{org}/groups",
             {"title": "All voters", "includeAllMembers": True}).json()["id"]
census = post("/census", {"orgAddress": org, "authFields": ["memberNumber"]}).json()["id"]
post(f"/census/{census}/group/{group}/publish", {"authFields": ["memberNumber"], "weighted": False})

# 6. create the process -> bare JSON string (the ProcessID)
process = post("/process", {
    "orgAddress": org, "censusId": census,
    "metadata": {"title": "Repaint the fence?"},
    "electionParams": {
        "title": {"default": "Repaint the fence?"},
        "description": {"default": "Annual maintenance vote"},
        "questions": [{"title": {"default": "Repaint the fence?"},
                       "choices": [{"title": {"default": "Yes"}, "value": 0},
                                   {"title": {"default": "No"}, "value": 1}]}],
        "voteType": {"maxCount": 1, "maxValue": 1},
        "electionType": {"autostart": True, "interruptible": True},
        "startDate": "2026-07-01T09:00:00Z", "endDate": "2026-07-08T09:00:00Z",
        "maxCensusSize": 1000,
    }}).json()

# 7. publish (async) -> wait for the job
pjob = post(f"/process/{process}/publish").json()["jobId"]
while get(f"/jobs/{pjob}").json()["status"] != "completed":
    time.sleep(2)

# 8. results - addressed by the ProcessID
print(get(f"/process/{process}/results").json())
```
:::
