---
title: Organizations
lead: An organization is the account that owns members, censuses, processes and API keys. Almost every endpoint is scoped to an organization address.
group: core_concepts
order: 10
---

## Creating an organization

Create an organization with a few descriptive fields. The response returns the full organization, including the address you use to scope later requests.

- **POST** `/organizations`

| Field | Type | Description |
| --- | --- | --- |
| `type` | string | Organization category, for example association or company. |
| `size` | string | Approximate membership size band. |
| `country` | string | Country code for the organization. |
| `timezone` | string | Default timezone used for election scheduling. |
| `website` | string | Public website URL. |

```bash
curl -X POST {{API_BASE_URL}}/organizations \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "association",
    "size": "500",
    "country": "ES",
    "timezone": "Europe/Madrid",
    "website": "https://example.org"
  }'
```

## Reading and updating

Fetch or update an organization by its address. Updates accept the same fields as creation.

- **GET** `/organizations/{address}`
- **PUT** `/organizations/{address}`

## Users and roles

Organizations can have multiple users, each with a role. Invite teammates by email and assign the access level they need.

- `admin` - full control, including billing, users and API keys.
- `manager` - can create and run elections, but not manage the account.
- `viewer` - read-only access to organization data and results.

- **GET** `/organizations/{address}/users`
- **POST** `/organizations/{address}/users`

```bash
curl -X POST "{{API_BASE_URL}}/organizations/$ORG/users" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "email": "teammate@example.org", "role": "manager" }'
```

> [!NOTE] Building for many customers?
> Integrators can create sub-organizations on behalf of their own customers. See [Managed organizations](/developers/docs/managed-organizations) for the multi-tenant model.
