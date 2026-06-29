---
title: SDKs and tools
lead: 'There are two ways to integrate Vocdoni: the REST API documented here, and the lower-level TypeScript SDK. Pick the one that matches how much control you need.'
group: get_started
order: 30
reference:
  title: References and repositories
  columns: 2
  items:
    - title: API conventions
      description: Base URL, identifiers, pagination, errors and multilanguage text.
      href: /developers/docs/api-conventions
      icon: book-open
    - title: TypeScript SDK
      description: Install the SDK and follow its guides.
      href: '{{SDK_URL}}'
      icon: terminal
      external: true
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
authentication, ballot encoding, and vote-submission steps. The current SDK ships as small,
tree-shakeable packages - `@vocdoni/api-client` (typed HTTP client) and `@vocdoni/api-voting` (CSP
auth, ballot encoding, vote signing) - replacing the older monolithic `@vocdoni/sdk`.

> [!NOTE] One SDK for the whole integrator API
> Beyond client-side casting, the TypeScript SDK is growing to cover **all the API relevant to
> integrators** - organization provisioning, members and groups, censuses, processes, results and
> quota - so you can drive the entire integration from typed TypeScript instead of raw HTTP.
> `@vocdoni/api-client` already wraps these endpoints; higher-level helpers are landing incrementally.

## AI agent skills

If you build with an AI coding agent, Vocdoni publishes [Agent Skills](https://github.com/vocdoni/skills) - focused guides the agent loads on demand so it writes correct Vocdoni code without guessing the API shapes. The ones most relevant here:

- **integrator-sdk** - the SaaS-first flow: API client, CSP auth, vote relay, job polling and React providers. Currently in the [integrator SDK repo]({{SDK_URL}}/tree/main/skills/integrator-sdk), soon in the marketplace.
- **vocdoni-ballot-protocol** - how a ballot encodes and how the results matrix aggregates per [voting type](/developers/docs/voting-types).

They are packaged as a Claude Code plugin marketplace, and installable via `npx` for any client that reads a skills directory (Cursor, Cline, Zed and similar):

```sh
# Claude Code: add the marketplace, then install integrator-sdk once it lands
claude plugin marketplace add vocdoni/skills
claude plugin install integrator-sdk@vocdoni

# Any skills-directory client
npx @vocdoni/skills install
```
