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
