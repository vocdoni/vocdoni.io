---
title: SDK quickstart
lead: Install the TypeScript SDK, initialize the API client, and cast your first vote. The SDK talks only to the Vocdoni SaaS API - never the blockchain directly.
group: get_started
order: 35
reference:
  title: Where to go next
  columns: 3
  items:
    - title: SDKs and tools
      description: When to use the REST API vs the SDK.
      href: /developers/docs/sdks-and-tools
      icon: terminal
    - title: Casting votes
      description: The full client-side ballot flow, step by step.
      href: /developers/docs/casting-votes
      icon: vote
    - title: SDK on GitHub
      description: Source, packages and examples for the integrator SDK.
      href: '{{SDK_URL}}'
      icon: github
      external: true
---

The TypeScript SDK is the client-side half of an integration: it runs in the voter's browser to
authenticate against the Credential Service Provider (CSP), encode the ballot and sign the vote
transaction. It talks **only to the Vocdoni SaaS API** - it never reaches the chain directly. For the
server-side lifecycle (organizations, members, censuses, processes and results) use the
[REST API](/developers/docs); see [SDKs and tools](/developers/docs/sdks-and-tools) for when to use each.

This page is the bare minimum to get a client running. For the complete casting flow, see
[Casting votes](/developers/docs/casting-votes).

> [!NOTE] Two small packages, not one monolith
> The SDK ships as tree-shakeable packages that replace the older `@vocdoni/sdk`:
> `@vocdoni/api-client` (typed HTTP client for the SaaS API) and `@vocdoni/api-voting` (CSP auth,
> ballot encoding and vote signing). The api-client surface is still evolving - check the
> [SDK repository]({{SDK_URL}}) for the current method names.

::::steps

## Install

Add the two packages with your package manager of choice.

:::code-tabs

```npm
npm install @vocdoni/api-client @vocdoni/api-voting
```
```pnpm
pnpm add @vocdoni/api-client @vocdoni/api-voting
```
```yarn
yarn add @vocdoni/api-client @vocdoni/api-voting
```
:::

## Initialize the client

Create a `VocdoniApiClient` pointing at the SaaS API. For public voter flows you don't need a token;
pass one only for authenticated (integrator or logged-in user) calls.

```ts
import { VocdoniApiClient } from '@vocdoni/api-client'

const client = new VocdoniApiClient({ apiUrl: '{{API_BASE_URL}}' })
```

The client exposes typed sub-clients for each part of the API - `client.bundle`, `client.elections`,
`client.census`, `client.organizations`, `client.jobs` and `client.auth`.

## Cast a vote

Casting adds `@vocdoni/api-voting` on top of the client. Every vote follows the same path: read the
bundle, authenticate the voter, check membership, get a CSP signature, then build and relay the
transaction. This is the condensed version - [Casting votes](/developers/docs/casting-votes) covers
2FA censuses, encrypted elections and error handling.

```ts
import { VocdoniApiClient } from '@vocdoni/api-client'
import { EphemeralSigner, VotingClient } from '@vocdoni/api-voting'

const client = new VocdoniApiClient({ apiUrl: '{{API_BASE_URL}}' })
const voting = new VotingClient({ client })

// 1. Bundle info (chainId, census config)
const bundle = await client.bundle.get(bundleId)

// 2. Authenticate the voter (auth-only census - no 2FA step)
const { authToken } = await client.bundle.authStep0(bundleId, { memberNumber: '42' })

// 3. Resolve the on-chain election (the SDK endpoints expect election.address, not the ProcessID)
const election = await client.elections.get(processId)

// 4. Confirm the voter belongs and hasn't voted yet
const { belongs, hasVoted } = await client.bundle.check(bundleId, { authToken, electionId: election.address })
if (!belongs || hasVoted) throw new Error('Cannot vote')

// 5. Get a CSP signature over an ephemeral voter address
const signer = new EphemeralSigner()
const { signature, weight } = await client.bundle.sign(bundleId, {
  authToken,
  electionId: election.address,
  payload: signer.address,
})

// 6. Build, relay and poll for the vote nullifier
const jobId = await voting.vote({
  processId: election.address,
  chainId: election.chainId ?? bundle.chainId!,
  choices: [0],
  signer,
  cspSignature: signature,
  cspWeight: weight,
})
const job = await client.jobs.waitFor(jobId)
console.log('voteID:', job.result?.voteID)
```

::::

> [!TIP] Building with React
> `@vocdoni/react-providers` wraps the client in context providers and hooks (`BundleProvider`,
> `ElectionProvider`, `useElection`) that automate the whole flow, and `@vocdoni/react-components`
> adds unstyled UI on top. See the [SDK repository]({{SDK_URL}}) for the React packages.

## AI agent skills

If you build with an AI coding agent, Vocdoni publishes [Agent Skills](https://github.com/vocdoni/skills) - focused guides the agent loads on demand so it writes correct Vocdoni code without guessing the API shapes. The ones most relevant to the SDK:

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
