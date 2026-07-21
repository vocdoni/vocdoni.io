---
title: Organizations
lead: An organization is the account that owns members, groups, processes and API keys. Almost every endpoint is scoped to an organization address.
group: core_concepts
order: 10
---

> [!NOTE] Managing organizations for customers?
> If you're an integrator provisioning organizations on behalf of your customers, also see
> [Managed organizations](/developers/docs/managed-organizations) for creating, listing and deleting
> them with your integrator key. Everything on this page applies to those organizations too.

An **organization** is the tenant that owns members, groups, and processes. As an integrator you
don't operate one shared org - you create one **managed organization per customer** and run everything
inside it with your integrator key. This page covers what an organization is and how to read and
update it; creating and deleting managed organizations is covered in
[Managed organizations](/developers/docs/managed-organizations).

## Anatomy

| Field | Type | Description |
| --- | --- | --- |
| `address` | hex string | The organization's on-chain account. It identifies the org in every path and is the value you carry forward after creation. See [Identifiers](/developers/docs/api-conventions#identifiers). |
| `type` | string | A free-form classification, for example `association`, `company` or `cooperative`. |
| `meta` | object | A free-form metadata map - at minimum a `name`. Display values are [multilanguage strings](/developers/docs/api-conventions#multilanguage-strings). |

## Creating an organization

Create an organization with a few descriptive fields. The response returns the full organization,
including the `address` you use to scope later requests. To provision an organization on behalf of a
customer, use the integrator flow in [Managed organizations](/developers/docs/managed-organizations).

- **POST** `/organizations`

| Field | Type | Description |
| --- | --- | --- |
| `type` | string | Organization category, for example association or company. |
| `size` | string | Approximate membership size band. |
| `country` | string | Country code for the organization. |
| `timezone` | string | Default timezone used for election scheduling. |
| `website` | string | Public website URL. |

```bash
curl "${auth[@]}" -X POST "$B/organizations" \
  -d '{
    "type": "association",
    "size": "500",
    "country": "ES",
    "timezone": "Europe/Madrid",
    "website": "https://example.org"
  }'
```

## Reading an organization

```bash
curl "${auth[@]}" "$B/organizations/$ORG"
```

```jsonc
{ "address": "0x4a3b...", "type": "association", "meta": { "name": "Maple Street HOA" } }
```

:::code-tabs[read an organization]

```ts
const org = await client.organizations.get(address)
const name = org.meta.name
```
```csharp
var org = await Get($"/organizations/{address}");
var name = org.GetProperty("meta").GetProperty("name").GetString();
```
```python
org = get(f"/organizations/{address}").json()
name = org["meta"]["name"]
```
:::

## Updating organization info

Update the descriptive metadata (name, type, and other `meta` fields). The on-chain identity - the
`address` - never changes.

```bash
curl "${auth[@]}" -X PUT "$B/organizations/$ORG" \
  -d '{"type":"association","meta":{"name":"Maple Street HOA","city":"Springfield"}}'
```

## The integrator relationship

Your **integrator organization** is the parent account; each managed organization is an isolated
tenant beneath it, with its own address, members, groups, and processes. Customers never need a
Vocdoni account - your integrator key acts as the admin of every org it creates.

- To **provision** a managed org, see [Managed organizations](/developers/docs/managed-organizations).
- To add people to it, see [Members and groups](/developers/docs/members-and-groups).
- To check how many orgs/processes/seats you've used against your limits, see
  [Quotas and subscriptions](/developers/docs/quotas-and-subscriptions).
