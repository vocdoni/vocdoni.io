---
title: Overview
lead: The Vocdoni API lets you add secure, anonymous and end-to-end verifiable voting to your own product. This section explains how the pieces fit together and where to go next.
group: get_started
order: 0
reference:
  title: Where to go next
  columns: 3
  items:
    - title: Quickstart
      description: Run a full election in a few API calls.
      href: /developers/docs/quickstart
      icon: rocket
    - title: API keys
      description: Authenticate with a scoped API key.
      href: /developers/docs/api-keys
      icon: key
    - title: Organizations
      description: Create the account that owns elections.
      href: /developers/docs/organizations
      icon: boxes
    - title: Census
      description: Decide who can vote and how.
      href: /developers/docs/census
      icon: users
    - title: Voting processes
      description: Configure ballots and run elections.
      href: /developers/docs/voting-processes
      icon: vote
    - title: Results
      description: Read verifiable tallies.
      href: /developers/docs/results
      icon: list-checks
---

> [!WARNING] Alpha
> The Vocdoni API is in **alpha**. Endpoints, fields and responses may still change between versions. Build against it for evaluation and early integration, and check the [OpenAPI specification]({{SWAGGER_URL}}) for the current contract.

## Who this is for

These docs are written for integrators: developers who want to run elections from their own software. You bring the product and the voters; Vocdoni provides the voting infrastructure, cryptography and verifiable results.

## How the API fits together

Most integrations follow the same path. Each step maps to a small group of endpoints you will find in this documentation.

- **Organization** - the account that owns elections, members and API keys. Everything is scoped to an organization address.
- **Members** - the people in your organization. Import them once, then reuse them across many elections.
- **Census** - the list of who can vote in a given election, with how they authenticate. Publishing a census produces a cryptographic root.
- **Process** - a voting process (an election) with its questions, vote type and timing, run against a published census.
- **Results** - live or final tallies that anyone can verify against the protocol.

> [!TIP] Heavy work runs asynchronously
> Bulk imports, census publishing and process publishing can take time, so they return a job id you poll until completion. See the jobs page for the pattern.

## Two ways to integrate

Most teams use the REST API documented here, which handles organizations, members, censuses, processes and results for you. If you need lower-level control over the protocol, the TypeScript SDK is also available - see [SDKs and tools](/developers/docs/sdks-and-tools).
