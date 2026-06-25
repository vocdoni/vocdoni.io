---
title: Members and groups
lead: Members are the people in your organization. Import them once, organize them into groups, and reuse them to build censuses for many elections.
group: core_concepts
order: 20
---

## The member object

A member carries identity and contact fields plus an optional census weight and arbitrary custom fields. Provide whatever your authentication strategy needs; you do not have to fill every field.

| Field | Type | Description |
| --- | --- | --- |
| `memberNumber` | string | Your identifier for the member, unique within the organization. |
| `name` | string | Given name. |
| `surname` | string | Family name. |
| `email` | string | Email, used for email-based authentication and reminders. |
| `phone` | string | Phone number, used for SMS authentication. |
| `nationalId` | string | National identity document, when used to authenticate. |
| `birthDate` | string | Date of birth in YYYY-MM-DD format. |
| `weight` | string | Vote weight for weighted censuses. Defaults to 1. |
| `other` | object | Custom key-value fields specific to your organization. |

## Adding members

Add members in bulk. Small batches run synchronously and return the count and any per-member errors. For large imports, pass async=true to get a job id you poll until it completes.

- **POST** `/organizations/{address}/members`

```bash
# Synchronous: returns the count immediately
curl -X POST "{{API_BASE_URL}}/organizations/$ORG/members" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "members": [ { "memberNumber": "0001", "name": "Ada", "surname": "Lovelace", "email": "ada@example.org", "weight": "1" } ] }'
# -> { "added": 1, "errors": [] }
```

> [!TIP] Large lists run asynchronously
> With async=true the request returns immediately with a jobId. Poll the members job endpoint for progress as a percentage. Jobs are cleared shortly after they finish, so read the final state promptly.

```bash
# Asynchronous: returns a job id to poll
curl -X POST "{{API_BASE_URL}}/organizations/$ORG/members?async=true" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "members": [ /* thousands of members */ ] }'
# -> { "added": 0, "errors": [], "jobId": "deadbeef" }

# Poll progress
curl "{{API_BASE_URL}}/organizations/$ORG/members/job/deadbeef" \
  -H "Authorization: Bearer $TOKEN"
# -> { "added": 5400, "total": 9000, "errors": [], "progress": 60 }
```

## Listing, updating and deleting

List members with pagination and an optional search term, update a single member, or delete specific members or all of them.

- **GET** `/organizations/{address}/members`
- **PUT** `/organizations/{address}/members`
- **DELETE** `/organizations/{address}/member`

## Groups

Groups are reusable subsets of members - for example everyone eligible for a particular election. You can create a census directly from a group, and validate that members carry the fields a census will require.

- **GET** `/organizations/{address}/groups`
- **POST** `/organizations/{address}/groups`
- **PUT** `/organizations/{address}/groups/{groupID}`
- **POST** `/organizations/{address}/groups/{groupID}/validate`

```bash
curl -X POST "{{API_BASE_URL}}/organizations/$ORG/groups" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "title": "Board 2026", "description": "Eligible board voters", "memberIds": ["<id1>", "<id2>"] }'
```
