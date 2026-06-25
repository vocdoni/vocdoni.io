---
title: Authentication
lead: The Vocdoni API authenticates requests with a bearer token. You obtain a token by logging in with email and password or OAuth, or you issue a long-lived API key for server-to-server use.
group: get_started
order: 20
---

All authenticated endpoints expect an Authorization header. The security scheme is a standard HTTP bearer token in JWT format.

## Logging in

Exchange credentials for a token. The response contains the token and its expiry time.

- **POST** `/auth/login`

| Field | Type | Description |
| --- | --- | --- |
| `email` (required) | string | The account email address. |
| `password` (required) | string | The account password. |

```bash
curl -X POST {{API_BASE_URL}}/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "email": "you@example.org", "password": "••••••••" }'

# Response (apicommon.LoginResponse)
# { "token": "eyJhbGciOi...", "expirity": "2026-06-24T10:00:00Z" }
```

## Using the token

Send the token as a bearer token on every request. Tokens are short lived, so treat them as session credentials rather than long-term secrets.

```bash
curl {{API_BASE_URL}}/organizations/$ORG \
  -H "Authorization: Bearer eyJhbGciOi..."
```

## Refreshing a token

Before a token expires, call refresh with the current token to receive a new one without asking the user to log in again.

- **POST** `/auth/refresh`

```bash
curl -X POST {{API_BASE_URL}}/auth/refresh \
  -H "Authorization: Bearer $TOKEN"
# -> a fresh { "token", "expirity" } pair
```

## OAuth

Users can also authenticate through Google, GitHub or Facebook. The login call returns a registered flag indicating whether a new account was created. You can link or unlink providers on an existing account.

- **POST** `/oauth/login`
- **POST** `/auth/oauth/link`
- **DELETE** `/auth/oauth/{provider}`

```bash
curl -X POST {{API_BASE_URL}}/oauth/login \
  -H "Content-Type: application/json" \
  -d '{
    "provider": "google",
    "email": "you@example.org",
    "oauthSignature": "...",
    "userOAuthSignature": "..."
  }'
# -> { "token", "expirity", "registered": true }
```

## API keys

For automated, server-to-server integrations, issue a scoped API key instead of logging in with a password. Keys are created per organization, carry a set of scopes and an optional expiry, and can be revoked at any time.

- **POST** `/organizations/{address}/apikeys`

> [!WARNING] The secret is shown once
> The full API key secret is returned only when you create it. Store it securely - it cannot be retrieved again, only revoked and replaced.

See [API keys](/developers/docs/api-keys) for the full lifecycle and best practices.
