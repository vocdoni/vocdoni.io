---
title: API conventions
lead: Rules that hold across the whole SaaS API - the base URL and auth header, how identifiers work, the async job pattern, pagination, errors, and how multilanguage text is encoded.
group: core_concepts
order: 5
---

## Base URL and authentication

All endpoints share one base URL. Authenticated endpoints expect an `Authorization` header carrying your scoped API key as a bearer token. Create the key in the [API Dashboard](https://platform.vocdoni.io); it is prefixed `vsk_` and grants only the [scopes](/developers/docs/api-keys) you select.

### Environments

The SaaS API runs in two independent environments. Use the base URL for the one you target - the examples in these docs use `{{API_BASE_URL}}` as a stand-in.

| Environment | Base URL | Use it for |
| --- | --- | --- |
| Staging | `https://saas-api-stg.vocdoni.net` | Wiring up and testing your integration against the latest build. Treat its data as disposable. |
| Production | `https://saas-api-prod.vocdoni.net` | Live elections. |

API keys are scoped to a single environment: create your key in the [API Dashboard](https://platform.vocdoni.io) for the environment you are calling, and a staging key will not authenticate against production.

```bash
# Authenticated request
curl {{API_BASE_URL}}/organizations/$ORG \
  -H "Authorization: Bearer vsk_your_api_key"
```

> [!TIP] Start on staging
> While the API is in alpha, build against staging first and switch to production once your flow is stable.

## Identifiers

- **Addresses and ids are hex strings** - for example `0x1234...` for an organization address.
- **A process and its questions have different ids, do not mix them.** A `processId` identifies a process (a draft until published) and addresses it everywhere server-side. Each question's `upstreamId` is the 64-hex on-chain election id, assigned at publish; voters need it to sign a ballot, but you never address the process by it.

## Asynchronous operations

Some operations take longer than a single request should wait - bulk imports, process publishing and status changes, and relaying a vote. These return `202 Accepted` with a `{ "jobId": "..." }` body. Poll the job until it finishes, then read the outcome from `result`. See [Jobs](/developers/docs/jobs) for the full model.

## Pagination

List endpoints accept `page` and `limit` query parameters and wrap results with a pagination object. Some lists also accept a search term or a type filter.

| Field | Type | Description |
| --- | --- | --- |
| `currentPage` | integer | The page you requested. |
| `previousPage` | integer | The previous page, when there is one. |
| `nextPage` | integer | The next page, when there is one. |
| `lastPage` | integer | The final page available. |
| `totalItems` | integer | Total items across all pages. |

## Errors

Errors return a consistent shape with an application code, the HTTP status and a message. Use `httpstatus` for control flow and `code` for precise handling.

```json
{
  "code": 40001,
  "httpstatus": 400,
  "error": "invalid census id",
  "logLevel": "debug"
}
```

## Multilanguage strings

Every human-readable metadata string - election titles and descriptions, question titles, choice titles, and other display text - is a **multilanguage string**, not a plain string. It is an object keyed by [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) language code, plus a special `default` key used as the fallback when the reader's language is missing.

```jsonc
"title": {
  "default": "Board election 2026",
  "en": "Board election 2026",
  "es": "Elección de la junta 2026",
  "ca": "Elecció de la junta 2026"
}
```

Provide at least `default`; add per-language keys to localize. A client renders the key that matches the voter's language and falls back to `default` when it is absent, so a single election can present its ballot in many languages without duplicating the process.

> [!NOTE] Where this comes from
> Multilanguage strings are a protocol-level type: every metadata string in the Vocdoni [entity and process metadata](https://github.com/vocdoni/dvote-protobuf/blob/master/src/metadata/entity.proto) is a locale-aware `map<language, text>`. The SaaS API exposes the same shape, which is why the snippets in these docs wrap titles in `{ "default": ... }`.
