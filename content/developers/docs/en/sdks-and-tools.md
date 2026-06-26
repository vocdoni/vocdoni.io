---
title: SDKs and tools
lead: 'There are two ways to integrate Vocdoni: the REST API documented here, and the lower-level TypeScript SDK. Pick the one that matches how much control you need.'
group: get_started
order: 30
reference:
  title: References and repositories
  columns: 2
  items:
    - title: API reference
      description: Every endpoint, schema and field of the SaaS API.
      href: /developers/docs/api-reference
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

## When to use the REST API

The SaaS REST API is the fastest path for most teams. It manages organizations, members, censuses, processes and results for you, handles the cryptography behind the scenes, and works from any language with an HTTP client. Use it when you want managed elections without operating protocol internals.

## When to use the SDK

The TypeScript SDK talks to the voting protocol more directly and is a good fit when you need fine-grained control over census and voting operations, or when you are building a custom voting client. It can be combined with the API where it makes sense.

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
