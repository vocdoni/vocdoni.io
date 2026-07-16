---
title: SDKs and tools
lead: 'There are two ways to integrate Vocdoni: the REST API documented here, and the lower-level TypeScript SDK. Pick the one that matches how much control you need.'
group: get_started
order: 30
skill: integrator-sdk
reference:
  title: References and repositories
  columns: 2
  items:
    - title: API conventions
      description: Base URL, identifiers, pagination, errors and multilanguage text.
      href: /developers/docs/api-conventions
      icon: book-open
    - title: SDK quickstart
      description: Install the SDK, initialize the client and cast a vote.
      href: /developers/docs/sdk-quickstart
      icon: terminal
    - title: OpenAPI specification
      description: The raw swagger spec to generate clients.
      href: '{{SWAGGER_URL}}'
      icon: file-json
      external: true
    - title: GitHub
      description: Open-source repositories, issues and examples.
      href: '{{GITHUB_URL}}'
      icon: github
      external: true
---

There are two ways to integrate with Vocdoni: the documented **REST API**, and a lower-level
**TypeScript SDK** for the voter's browser. Choose based on how much control you need - and combine
them where it makes sense.

## When to use the REST API

The SaaS REST API is the quickest path for most teams. It manages organizations, members, censuses,
processes, and results, handles the protocol cryptography internally, and works from any language with
an HTTP client. Use it when you want **managed elections without operating protocol internals** - it's
what every page in this documentation targets, and it covers the entire server-side lifecycle from
provisioning a tenant to reading a tally.

## When to use the SDK

Casting a ballot is voter-facing cryptography: encoding the ballot, authenticating to the Credential
Service Provider (CSP), and signing the vote transaction. That part runs **client-side**, in the
voter's browser, via the TypeScript SDK. The SDK talks **only to this REST API** - it never reaches
the chain directly - and is the other half of the casting flow described in
[Casting votes](/developers/docs/casting-votes).

Reach for it when you build a custom voting client, or need fine-grained control over the
authentication, ballot encoding, and vote-submission steps. The
[SDK quickstart](/developers/docs/sdk-quickstart) covers installing the packages, initializing the
client and casting a first vote.

> [!NOTE] One SDK for the whole integrator API
> Beyond client-side casting, the TypeScript SDK is growing to cover **all the API relevant to
> integrators** - organization provisioning, members and groups, censuses, processes, results and
> quota - so you can drive the entire integration from typed TypeScript instead of raw HTTP.
> `@vocdoni/api-client` already wraps these endpoints; higher-level helpers are landing incrementally.

Building with an AI coding agent? The [SDK quickstart](/developers/docs/sdk-quickstart) lists the
Vocdoni agent skills that teach assistants to write correct SDK code.
