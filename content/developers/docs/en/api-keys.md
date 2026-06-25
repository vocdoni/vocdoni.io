---
title: API keys
lead: API keys let your backend authenticate without a password. Each key belongs to an organization, carries a set of scopes and an optional expiry, and can be revoked at any time.
group: integrator_platform
order: 20
---

## Creating a key

Create a key with a descriptive label and the scopes it needs. The full secret is returned only in this response - store it immediately in your secret manager.

- **POST** `/organizations/{address}/apikeys`

| Field | Type | Description |
| --- | --- | --- |
| `label` (required) | string | A human-readable name to recognise the key later. |
| `scopes` (required) | string[] | The permissions the key grants. Request only what you need. |
| `expiresAt` | string | Optional expiry timestamp; omit for a non-expiring key. |

```bash
curl -X POST "{{API_BASE_URL}}/organizations/$ORG/apikeys" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "label": "CI server", "scopes": ["processes", "census"], "expiresAt": "2027-01-01T00:00:00Z" }'

# Response (apicommon.CreateAPIKeyResponse) - the secret is shown only here
# { "id": "key_123", "prefix": "vk_live_ab12", "secret": "vk_live_ab12....", "scopes": ["processes","census"], "revoked": false }
```

> [!WARNING] Store the secret now
> The secret cannot be retrieved after creation. If you lose it, revoke the key and create a new one. Only the key metadata - id, prefix, scopes and timestamps - is available afterwards.

## Using a key

Send the key as a bearer token, exactly like a login token. The prefix is safe to log for identification; the full secret is not.

```bash
curl "{{API_BASE_URL}}/organizations/$ORG/processes" \
  -H "Authorization: Bearer vk_live_ab12...."
```

## Listing and revoking

List the keys for an organization to review their scopes and last use, and revoke any key immediately when it is no longer needed or may be compromised.

- **GET** `/organizations/{address}/apikeys`
- **DELETE** `/organizations/{address}/apikeys/{keyID}`

> [!TIP] About scopes
> Scopes restrict what a key can do. Grant the minimum a workload needs, use separate keys per environment, and rotate them periodically. The scopes available to you are shown in the API Dashboard when you create a key.
