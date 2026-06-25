---
title: Managed organizations
lead: As an integrator you can provision sub-organizations on behalf of your own customers, each isolated with its own address, members and elections, all under your integrator account.
group: integrator_platform
order: 10
---

## The multi-tenant model

Your integrator organization is the parent. Each managed organization you create is a separate tenant whose data never mixes with another. You drive everything through your own credentials, so your customers do not need Vocdoni accounts.

## Creating a managed organization

Create a managed organization under your integrator address. Provide the owner email and the same descriptive fields as a normal organization. The response is the new organization, including the address you use to run its elections.

- **POST** `/organizations/{address}/managed`
- **GET** `/organizations/{address}/managed`

| Field | Type | Description |
| --- | --- | --- |
| `ownerEmail` | string | Email of the customer who owns the managed organization. |
| `type` | string | Organization category. |
| `size` | string | Approximate membership size band. |
| `country` | string | Country code. |

```bash
curl -X POST "{{API_BASE_URL}}/organizations/$ORG/managed" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ownerEmail": "customer@example.org",
    "type": "association",
    "size": "200",
    "country": "FR"
  }'
# -> the new managed OrganizationInfo, with its own address
```

## Quota and usage

Check whether your integrator features are enabled and how much of your quota you have used. Limits cover the number of managed organizations, processes and census size.

- **GET** `/organizations/{address}/integrator`

| Field | Type | Description |
| --- | --- | --- |
| `maxManagedOrgs` | integer | Maximum managed organizations you can create. |
| `maxManagedProcesses` | integer | Maximum processes across managed organizations. |
| `maxManagedCensusSize` | integer | Maximum census size per managed organization. |

```bash
curl "{{API_BASE_URL}}/organizations/$ORG/integrator" \
  -H "Authorization: Bearer $TOKEN"
# -> { "enabled": true, "limits": { ... }, "usage": { ... } }
```

> [!NOTE] Enabling integrator access
> Integrator features are enabled per account. If the enabled flag is false, contact us through the API Dashboard to turn on managed organizations for your plan.
