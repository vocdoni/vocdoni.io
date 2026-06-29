---
title: API keys
lead: API keys let your backend authenticate without a password. Each key belongs to an organization, carries a set of scopes and an optional expiry, and can be revoked at any time.
group: integrator_platform
order: 20
---

Create your keys in the [API Dashboard](https://platform.vocdoni.io). The full secret is shown only once, at creation - store it in your secret manager immediately. Afterwards only the key metadata (id, prefix, scopes and timestamps) is available.

## Using a key

Send the key as a bearer token on every request, exactly like a session token. The plaintext secret is prefixed `vsk_`; the prefix is safe to log for identification, the full secret is not.

```bash
curl "{{API_BASE_URL}}/organizations/$ORG/processes" \
  -H "Authorization: Bearer vsk_your_api_key"
```

A key works only on endpoints its scopes allow, and only on the organization that owns it.

## Scopes

Scopes are deny-by-default: a key can do nothing until you grant scopes, so grant only what a workload needs. Pick these when you create the key.

| Scope | Grants |
| --- | --- |
| `members:write` | Import, update and delete organization members and groups. |
| `voting:write` | Create censuses, create and publish processes, bundle them, and relay votes. |
| `quota:read` | Read the organization's subscription, features and usage counters. |
| `managed:read` | Read sub-organizations provisioned for your customers. |
| `managed:write` | Create and manage sub-organizations on behalf of your customers. |

> [!TIP] Key hygiene
> Use a separate key per environment, grant the minimum scopes, set an expiry where you can, and rotate keys periodically. Revoke immediately any key that may be compromised.

## Managing keys

Review and revoke keys in the [API Dashboard](https://platform.vocdoni.io). The same operations are available programmatically for multi-tenant provisioning.

- **GET** `/organizations/{address}/apikeys`
- **DELETE** `/organizations/{address}/apikeys/{keyID}`
