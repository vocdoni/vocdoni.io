---
title: Census
lead: A census is the list of who can vote in an election and how they prove who they are. Publishing a census produces a cryptographic root that binds the eligible voters to a process.
group: core_concepts
order: 30
---

## Authentication types

A census has a type that determines how voters authenticate. You can require fields the voter must know (auth fields) and a second factor delivered to them (two-factor fields).

- `auth` - voters authenticate with known fields only.
- `mail` - a code is sent by email as a second factor.
- `sms` - a code is sent by SMS as a second factor.
- `sms_or_mail` - the voter can choose SMS or email for the second factor.

Auth fields can include memberNumber, name, surname, nationalId and birthDate. Two-factor fields can be email or phone. The type is derived from the two-factor fields you choose.

## Creating a census

Create a census for an organization, declaring the authentication and two-factor fields it will use. The response returns the census id.

- **POST** `/census`

| Field | Type | Description |
| --- | --- | --- |
| `orgAddress` (required) | string | The organization the census belongs to. |
| `authFields` | string[] | Fields the voter must provide to authenticate. |
| `twoFaFields` | string[] | Channels for the second factor: email or phone. |

```bash
curl -X POST {{API_BASE_URL}}/census \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "orgAddress": "$ORG",
    "authFields": ["memberNumber", "birthDate"],
    "twoFaFields": ["email"]
  }'
# -> { "id": "$CENSUS_ID" }
```

## Adding voters and publishing

Add existing organization members to the census, then publish it. Members already present are skipped. Publishing returns the census root, its URI and final size - after this the census is locked for voting.

- **POST** `/census/{id}`
- **GET** `/census/{id}/participants`
- **POST** `/census/{id}/publish`

```bash
# Add organization members, then publish
curl -X POST "{{API_BASE_URL}}/census/$CENSUS_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "memberIds": ["<id1>", "<id2>"] }'

curl -X POST "{{API_BASE_URL}}/census/$CENSUS_ID/publish" \
  -H "Authorization: Bearer $TOKEN"
# -> { "uri": "...", "root": "deadbeef...", "size": 2 }
```

## Publishing from a group

You can publish a census directly from a member group, optionally weighting votes by the member weight field. This is the quickest way to turn a saved group into an eligible voter list.

- **POST** `/census/{id}/group/{groupid}/publish`

```bash
curl -X POST "{{API_BASE_URL}}/census/$CENSUS_ID/group/$GROUP_ID/publish" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "weighted": true, "authFields": ["memberNumber"], "twoFaFields": ["email"] }'
```

> [!NOTE] Weighted voting
> When a census is weighted, each voter carries the weight set on their member record. Use it for shareholder meetings or any vote where members do not count equally.
