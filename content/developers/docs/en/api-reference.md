---
title: API reference
lead: A map of the SaaS API - base URL, authentication, the conventions shared across endpoints, and every endpoint grouped by resource. For machine-readable detail, use the OpenAPI specification.
group: api_reference
order: 10
---

## Base URL and authentication

All endpoints share one base URL. Authenticated endpoints expect an Authorization header with a bearer token in JWT format, obtained by logging in or from an API key.

```bash
# Base URL
{{API_BASE_URL}}

# Authenticated request
curl {{API_BASE_URL}}/organizations/$ORG \
  -H "Authorization: Bearer $TOKEN"
```

> [!NOTE] Confirm your base URL
> Use the production host shown in your API Dashboard. The examples in these docs use a representative base URL.

## Pagination

List endpoints accept page and limit query parameters and wrap results with a pagination object. Some lists also accept a search term or a type filter.

| Field | Type | Description |
| --- | --- | --- |
| `currentPage` | integer | The page you requested. |
| `nextPage` | integer | The next page, when there is one. |
| `lastPage` | integer | The final page available. |
| `totalItems` | integer | Total items across all pages. |

## Errors

Errors return a consistent shape with an application code, the HTTP status and a message. Use httpstatus for control flow and code for precise handling.

```json
{
  "code": 40001,
  "httpstatus": 400,
  "error": "invalid census id",
  "logLevel": "debug"
}
```

## Endpoints by resource

### Authentication

- **POST** `/auth/login`
- **POST** `/auth/refresh`
- **POST** `/oauth/login`
- **POST** `/auth/oauth/link`
- **DELETE** `/auth/oauth/{provider}`

### Organizations

- **POST** `/organizations`
- **GET** `/organizations/{address}`
- **PUT** `/organizations/{address}`
- **GET** `/organizations/{address}/users`
- **POST** `/organizations/{address}/users`
- **GET** `/organizations/{address}/subscription`

### Members and groups

- **GET** `/organizations/{address}/members`
- **POST** `/organizations/{address}/members`
- **PUT** `/organizations/{address}/members`
- **DELETE** `/organizations/{address}/member`
- **GET** `/organizations/{address}/groups`
- **POST** `/organizations/{address}/groups`
- **POST** `/organizations/{address}/groups/{groupID}/validate`

### Census

- **POST** `/census`
- **GET** `/census/{id}`
- **POST** `/census/{id}`
- **POST** `/census/{id}/publish`
- **POST** `/census/{id}/group/{groupid}/publish`

### Processes and results

- **POST** `/organizations/{address}/processes`
- **GET** `/organizations/{address}/processes`
- **POST** `/organizations/{address}/processes/bundle`
- **POST** `/organizations/{address}/processes/{processId}/status`
- **GET** `/organizations/{address}/processes/{processId}/results`

### Jobs and integrator

- **GET** `/jobs/{jobId}`
- **GET** `/organizations/{address}/jobs`
- **GET** `/organizations/{address}/apikeys`
- **POST** `/organizations/{address}/apikeys`
- **DELETE** `/organizations/{address}/apikeys/{keyID}`
- **GET** `/organizations/{address}/managed`
- **POST** `/organizations/{address}/managed`
- **GET** `/organizations/{address}/integrator`

For the complete, machine-readable contract, see the [OpenAPI specification]({{SWAGGER_URL}}).
