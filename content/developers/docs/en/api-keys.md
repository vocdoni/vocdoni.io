---
title: API keys
lead: API keys let your backend authenticate without a password. Each key belongs to an organization, carries a set of scopes and an optional expiry, and can be revoked at any time.
group: integrator_platform
order: 20
---

An **API key** authenticates your backend without a password. The key *is* your integrator identity:
the server resolves your integrator organization from it, which is why the integrator endpoints take no
address in the path. Each key carries a set of **scopes** and an optional expiry, and can be revoked at
any time.

Create your keys in the [API Dashboard](https://platform.vocdoni.io); API keys can only be created
under integrator organizations. The full secret is shown only once, at creation - store it in your
secret manager immediately. Afterwards only the key metadata (id, prefix, scopes and timestamps) is
available.

## Using a key

Send the key as a bearer token on every request, exactly like a session token - the same header for
every call in this documentation. The plaintext secret is prefixed `vsk_`; the prefix (e.g. `vsk_ab12`)
is safe to log for identification, the full secret is not.

```bash
curl "{{API_BASE_URL}}/organizations/$ORG/processes" \
  -H "Authorization: Bearer vsk_your_api_key"
```

A key works only on endpoints its scopes allow, and only on the organization that owns it.

## Scopes

A key only works on an endpoint if it carries the right scope. Scopes are deny-by-default, so mint keys
with exactly what the integration needs.

| Scope | Grants |
| --- | --- |
| `managed:write` | Create and delete managed organizations (`POST` / `DELETE /integrator/organizations`). |
| `managed:read` | List managed organizations (`GET /integrator/organizations`). |
| `quota:read` | Read integrator quota and usage (`GET /integrator`). |
| `members:write` | Manage members and groups inside a managed org (`/organizations/{addr}/members` and `/groups`). |
| `voting:write` | Run the election lifecycle: census, process, bundle and vote relay (`/census`, `/process`, `/vote`). |

The election lifecycle inside a managed org is split across `members:write` (members and groups) and
`voting:write` (census, process, bundle, vote relay), so an integration that runs a vote end to end
needs **both**, in addition to the `managed:*` scopes it uses to provision the org. An admin user
logging in with email/password carries these implicitly; an API key must be granted each one
explicitly.

> [!TIP] Least privilege
> Grant the minimum scopes a workload needs, use a separate key per environment, set an expiry where
> you can, and rotate keys periodically. Revoke immediately any key that may be compromised. The
> available scopes are shown in the API Dashboard during key creation.

## Managing keys

Review and revoke keys in the [API Dashboard](https://platform.vocdoni.io). The same operations are
available programmatically for multi-tenant provisioning:

- **GET** `/organizations/{address}/apikeys`
- **DELETE** `/organizations/{address}/apikeys/{keyID}`

```bash
curl "${auth[@]}" "$B/organizations/$ORG/apikeys"                  # list
curl "${auth[@]}" -X DELETE "$B/organizations/$ORG/apikeys/$KEYID" # revoke
```

Listing returns only metadata (id, prefix, scopes, timestamps) - never the secret.

## Authentication failure modes

| Status | Meaning | Fix |
| --- | --- | --- |
| `401 Unauthorized` | Missing or invalid key. | Check the `Authorization` header and key value. |
| `403` insufficient scope | The key lacks the endpoint's scope. | Re-mint with the needed scope (`managed:write` / `managed:read` / `quota:read` / `members:write` / `voting:write`). |
| `403` not an integrator | The resolved organization isn't an integrator. | Use a key minted under your integrator organization. |
