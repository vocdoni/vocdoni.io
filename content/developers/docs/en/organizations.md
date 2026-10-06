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

> [!NOTE] Session-only
> Creating and updating an organization are not open to API keys - a `vsk_` key gets `403`. Call them
> with a logged-in user's session token (`POST /auth/login`, or `client.auth.login()` in the SDK). As an
> integrator, provision customers with [managed organizations](/developers/docs/managed-organizations).

- **POST** `/organizations`

| Field | Type | Description |
| --- | --- | --- |
| `name` | multilang | Display name. Shorthand for `meta.name`: a plain string is stored as `{ "default": ... }`. |
| `type` | string | Organization category, for example association or company. |
| `size` | string | Approximate membership size band. |
| `country` | string | Country code for the organization. |
| `timezone` | string | Default timezone used for election scheduling. |
| `website` | string | Public website URL. |

:::code-tabs

```bash
# $SESSION: the token returned by POST /auth/login - an API key gets 403 here
curl -H "Authorization: Bearer $SESSION" -H "Content-Type: application/json" -X POST "$B/organizations" \
  -d '{
    "name": "Maple Street HOA",
    "type": "association",
    "size": "500",
    "country": "ES",
    "timezone": "Europe/Madrid",
    "website": "https://example.org"
  }'
```
```ts
// A client authenticated as a user (an API key gets 403 here)
const session = new VocdoniApiClient({ apiUrl: '{{API_BASE_URL}}' })
session.setAuthToken((await session.auth.login(email, password)).token)

const { address: org } = await session.organizations.create({
  name: 'Maple Street HOA',
  type: 'association',
  size: '500',
  country: 'ES',
  timezone: 'Europe/Madrid',
  website: 'https://example.org',
})
```
:::

## Reading an organization

:::code-tabs[read an organization]

```bash
curl "${auth[@]}" "$B/organizations/$ORG"
```
```ts
const info = await client.organizations.get(org)
const name = info.name?.default // a locale map, like meta.name
```
```csharp
var info = await Get($"/organizations/{org}");
var name = info.GetProperty("name").GetProperty("default").GetString(); // a locale map
```
```python
info = get(f"/organizations/{org}").json()
name = info["name"]["default"]  # a locale map, like meta.name
```
:::

```jsonc
{ "address": "0x4a3b...", "type": "association", "name": { "default": "Maple Street HOA" },
  "meta": { "name": { "default": "Maple Street HOA" } } }
```

## Updating organization info

Update the descriptive metadata (name, type, and other `meta` fields). The on-chain identity - the
`address` - never changes. Like creation, this needs a user session token, not an API key.

:::code-tabs

```bash
curl -H "Authorization: Bearer $SESSION" -H "Content-Type: application/json" -X PUT "$B/organizations/$ORG" \
  -d '{"type":"association","meta":{"name":"Maple Street HOA","city":"Springfield"}}'
```
```ts
await session.organizations.update(org, { // the user-session client from above
  type: 'association',
  meta: { name: 'Maple Street HOA', city: 'Springfield' },
})
```
:::

## The integrator relationship

Your **integrator organization** is the parent account; each managed organization is an isolated
tenant beneath it, with its own address, members, groups, and processes. Customers never need a
Vocdoni account - your integrator key acts as the admin of every org it creates.

- To **provision** a managed org, see [Managed organizations](/developers/docs/managed-organizations).
- To add people to it, see [Members and groups](/developers/docs/members-and-groups).
- To check how many orgs/processes/seats you've used against your limits, see
  [Quotas and subscriptions](/developers/docs/quotas-and-subscriptions).
