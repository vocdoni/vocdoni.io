---
title: Census
lead: A census is the list of who can vote in an election and how they prove who they are. Publishing a census produces a cryptographic root that binds the eligible voters to a process.
group: core_concepts
order: 30
---

A **census** is the eligible-voter list for an election, anchored to a cryptographic **root** that the
election binds to. When you create a census you also choose **how voters prove who they are**.

## Authentication fields

- `authFields` - the fields a voter must present to authenticate (e.g. `memberNumber`). With only
  `authFields` set, the census is **auth-only**: no second factor.
- `twoFaFields` - fields used for a one-time-code second factor: `email` or `phone`.

These combine into four census types: **`auth`** (auth-only), **`mail`**, **`sms`**, and
**`sms_or_mail`**. The type is derived from the two-factor fields you choose.

`authFields` options: `name`, `surname`, `memberNumber`, `nationalId`, `birthDate`.
`twoFaFields` options: `email`, `phone`.

## Creating a census

Create a census for an organization, declaring the authentication and two-factor fields it will use.
The response returns the census id.

- **POST** `/census`

| Field | Type | Description |
| --- | --- | --- |
| `orgAddress` (required) | string | The organization the census belongs to. |
| `authFields` | string[] | Fields the voter must provide to authenticate. |
| `twoFaFields` | string[] | Channels for the second factor: email or phone. |

```bash
CENSUS=$(curl -s "${auth[@]}" -X POST "$B/census" \
  -d "{\"orgAddress\":\"$ORG\",\"authFields\":[\"memberNumber\"]}" | jq -r .id)
```

```jsonc
{ "id": "6a1f..." }   // carry forward: census id
```

Add `"twoFaFields":["email"]` for an email-OTP census.

<details><summary><b>C#</b> / <b>Python</b> · create a census</summary>

```csharp
var census = (await Post("/census",
    new { orgAddress = org, authFields = new[] { "memberNumber" } })).GetProperty("id").GetString();
```
```python
census = post("/census", {"orgAddress": org, "authFields": ["memberNumber"]}).json()["id"]
```
</details>

## Adding participants

For a **2FA** census, add organization members by id before publishing. **Auth-only** censuses are
populated from their group at publish time, so they skip this step. Members already present are
skipped.

- **POST** `/census/{id}`

```bash
curl "${auth[@]}" -X POST "$B/census/$CENSUS" \
  -d '{ "memberIds": ["<id1>", "<id2>"] }'
```

## Publishing a census

Publishing locks the participant list and produces the root the election binds to. **How you publish
depends on the census type** - this is the single most common stumble.

- **POST** `/census/{id}/publish`
- **POST** `/census/{id}/group/{groupID}/publish`

**2FA types** (`mail` / `sms` / `sms_or_mail`) publish directly:

```bash
curl "${auth[@]}" -X POST "$B/census/$CENSUS/publish"
```

**Auth-only** censuses are **rejected** by the plain publish (`census type not found`). Publish them
**through a group** instead - this both supports auth-only and populates participants from the group:

```bash
curl "${auth[@]}" -X POST "$B/census/$CENSUS/group/$GROUP/publish" \
  -d '{"authFields":["memberNumber"],"weighted":false}'
```

Either way you get the published census:

```jsonc
{ "root": "deadbeef...", "size": 1, "uri": "https://..." }
```

The `size` is the eligible-voter count - useful later for turnout (see [Results](/developers/docs/results)). Set
`"weighted": true` to make each member's `weight` count as vote weight.

<details><summary><b>C#</b> / <b>Python</b> · auth-only via group</summary>

```csharp
await Post($"/census/{census}/group/{group}/publish",
           new { authFields = new[] { "memberNumber" }, weighted = false });
```
```python
post(f"/census/{census}/group/{group}/publish",
     {"authFields": ["memberNumber"], "weighted": False})
```
</details>

> [!NOTE] Weighted voting
> Set `"weighted": true` when publishing to make each member's `weight` field count as their vote
> weight - use it for shareholder meetings or any vote where members do not count equally.

## Inspecting participants

- **GET** `/census/{id}/participants`

```bash
curl "${auth[@]}" "$B/census/$CENSUS/participants"
```

```jsonc
{ "censusId": "6a1f...", "memberIds": ["..."] }
```

## Gotchas

- **Auth-only must be published via a group** (`/census/{id}/group/{groupId}/publish`). The plain
  `/publish` rejects it.
- The auth-only credential is derived from the auth field, so **`memberNumber` must be unique** across
  the census - duplicates fail at publish.
- One published census can back **multiple** processes - reuse it across votes.
