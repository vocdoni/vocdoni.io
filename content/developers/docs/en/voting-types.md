---
title: Voting types
lead: How to shape a ballot - single choice, multiple questions, rating, approval, ranked, and weighted or quadratic voting - through the electionParams vote type. Each type is the same create-process call with different voteType fields; this page maps each one to its ballot shape and how its results read.
group: core_concepts
order: 42
---

> [!NOTE] Coming soon
> Reading results per voting type - mapping the raw histogram to a tally, as described below - will be abstracted away in a future version of the API and the [SDK]({{SDK_URL}}): results will come back already aggregated according to the voting type, so you will not have to collapse the histogram yourself. The raw matrix stays available for clients that need it.
>
> Until then, the [vocdoni-ballot-protocol agent skill](/developers/docs/sdk-quickstart#ai-agent-skills) walks through exactly how a ballot encodes and how the matrix aggregates per type.

## How a ballot is shaped

A ballot is an array of natural numbers, one entry per **field**. A field is either a question (you pick one option per question) or an option of a single question (you give each option a value). The `voteType` block inside `electionParams` decides how many fields a ballot has and what values each may take, so the same [create-process call](/developers/docs/voting-processes) produces every voting type below just by changing those fields.

Results are returned as a histogram matrix, not a per-option tally: `results[field][value]` is the number of voters who put `value` in that field. See [Results](/developers/docs/results) for the response shape, and the [ballot protocol post](https://blog.vocdoni.io/vocdoni-ballot-protocol/) for the full data model.

## The vote type fields

These are the fields the SaaS reads from `electionParams.voteType` and writes straight onto the on-chain process.

| Field | Type | Description |
| --- | --- | --- |
| `maxCount` | integer | Number of fields in the ballot (questions, or options of a single question). |
| `maxValue` | integer | Largest value any field may take. `0` is a marker meaning "values are amounts to aggregate" (budget and quadratic). |
| `uniqueChoices` | boolean | Require every field in a ballot to hold a distinct value (used by ranked voting). |
| `costExponent` | integer | Exponent applied per value when computing ballot cost, **scaled by 10000** on-chain: `10000` is linear (budget), `20000` is quadratic. |
| `costFromWeight` | boolean | Use each voter's census weight as their credit budget. This is how budget and quadratic votes get their cap. |
| `maxVoteOverwrites` | integer | How many times a voter may change their vote. |

> [!NOTE] What the SaaS does not expose
> A SaaS election only sets the fields above. There is no `maxTotalCost`/`minTotalCost` or `minValue`, so a fixed shared budget or an exact "pick exactly K" selection count is not enforceable through `electionParams`. Budget and quadratic caps come from the **census weight** (`costFromWeight: true` with a weighted census). If you need hard total-cost or min/max-selection limits enforced on-chain, drive the protocol directly with the [TypeScript SDK]({{SDK_URL}}).

## Voting types

Every snippet below is the `electionParams` body of `POST {{API_BASE_URL}}/process` (see the [Quickstart](/developers/docs/quickstart) for the full request). The `type` field is an optional metadata hint that tells result readers how to display the tally.

### Single choice

One question, voter picks exactly one of N options. The ballot is one value, the chosen option index.

```jsonc
"voteType": { "maxCount": 1, "maxValue": 1 },   // maxValue = options - 1
"questions": [{
  "title": { "default": "Who should chair the board?" },
  "choices": [
    { "title": { "default": "Ada Lovelace" }, "value": 0 },
    { "title": { "default": "Alan Turing" },  "value": 1 }
  ]
}]
```

Ballot: `[0]` or `[1]`. Results: `results[0]` is the count per candidate.

### Multiple questions, one choice each

Several independent questions, one selection per question. `maxCount` is the number of questions; `maxValue` is the largest `choices - 1` across them.

```jsonc
"voteType": { "maxCount": 3, "maxValue": 4 },   // 3 questions, up to 5 options each
"questions": [
  { "title": { "default": "CEO" },  "choices": [ /* 5 candidates, values 0..4 */ ] },
  { "title": { "default": "COO" },  "choices": [ /* ... */ ] },
  { "title": { "default": "CFO" },  "choices": [ /* ... */ ] }
]
```

Ballot: `[ceoChoice, cooChoice, cfoChoice]`, for example `[4, 2, 3]`. Read each field independently (discrete counting).

### Rating / scoring

Score each of N options on a `0..M` scale. Each option is its own field.

```jsonc
"voteType": { "maxCount": 3, "maxValue": 5 },   // 3 options, rated 0..5
"questions": [{
  "title": { "default": "Rate each proposal" },
  "choices": [
    { "title": { "default": "Proposal A" }, "value": 0 },
    { "title": { "default": "Proposal B" }, "value": 1 },
    { "title": { "default": "Proposal C" }, "value": 2 }
  ]
}],
"type": { "name": "rating" }
```

Ballot: `[4, 0, 5]` (A gets 4, B gets 0, C gets 5). The score per option is the index-weighted sum of its histogram row.

### Approval

Pick any subset of N options: each option is approved (`1`) or not (`0`). `maxCount` is the number of options, `maxValue` is `1`.

```jsonc
"voteType": { "maxCount": 4, "maxValue": 1 },
"questions": [{
  "title": { "default": "Pick your favourites" },
  "choices": [
    { "title": { "default": "Green" },  "value": 0 },
    { "title": { "default": "Blue" },   "value": 1 },
    { "title": { "default": "Pink" },   "value": 2 },
    { "title": { "default": "Orange" }, "value": 3 }
  ]
}],
"type": { "name": "approval" }
```

Ballot: `[0, 1, 0, 1]` approves Blue and Orange. The approvals per option are `results[option][1]`. The SaaS does not cap the number of approvals (no exact-count limit).

### Ranked (linear weighted)

Rank N options `0..N-1`, each rank used once. `uniqueChoices: true` enforces distinct values.

```jsonc
"voteType": { "maxCount": 5, "maxValue": 4, "uniqueChoices": true },
"questions": [{
  "title": { "default": "Rank these by preference" },
  "choices": [ /* 5 options, values 0..4 */ ]
}],
"type": { "name": "ranked" }
```

Ballot: `[rank0, rank1, ...]`, all distinct, for example `[2, 0, 4, 1, 3]` (option 1 ranked first). A repeated rank is rejected on-chain.

### Weighted budget and quadratic

Each voter allocates credits across options, capped by their **census weight**. Use a weighted census, set `costFromWeight: true`, and pick the cost curve with `costExponent`:

- `costExponent: 10000` - linear budget. Spending 5 on an option costs 5 credits.
- `costExponent: 20000` - quadratic. Spending 5 costs 25 credits (`value^2`), which dampens whales.

```jsonc
"voteType": {
  "maxCount": 4,            // 4 options to fund
  "maxValue": 0,            // values are aggregable amounts, not a per-field cap
  "costExponent": 20000,    // quadratic; use 10000 for a linear budget
  "costFromWeight": true    // budget per voter = their census weight
},
"questions": [{
  "title": { "default": "Allocate the grant" },
  "choices": [ /* 4 NGOs, values 0..3 */ ]
}],
"type": { "name": "quadratic" }
```

Ballot: `[c0, c1, c2, c3]` credits per option. A voter with weight 14 can cast `[1, 0, 3, 2]` (quadratic cost `1 + 0 + 9 + 4 = 14`). Because the budget is the census weight, this voting type needs a weighted census and the weighted-voting plan feature.

## Reading the results

Whatever the type, results come back as `results[field][value]`. Two ways to collapse the histogram into a tally:

- **Index-weighted** - multiply each count by its column index and sum. Use for rating, single and multiple choice, ranked, and quadratic.
- **Discrete counting** - read each cell as a standalone count. Use only for the multi-question, one-choice-per-question case.

The `type.name` hint you set at creation travels in the election metadata so UIs and indexers know which interpretation to apply. See [Results](/developers/docs/results) for fetching live and final tallies.

## Behaviour and plan-gated flags

Set these on `electionParams.electionType`:

- `autostart` - open voting automatically at the start date.
- `interruptible` - allow pausing, ending or canceling early.
- `secretUntilTheEnd` - keep the tally encrypted until voting closes.
- `dynamicCensus` - allow the census to change after voting starts.
- `anonymous` - hide who voted with zero-knowledge proofs. Requires the anonymous-voting plan feature.

Two `voteType` fields are also plan-gated: `costFromWeight` (weighted voting) needs the weighted feature, and `maxVoteOverwrites` greater than zero needs the vote-overwrite feature. See [Quotas and subscriptions](/developers/docs/quotas-and-subscriptions).

For the complete, machine-readable contract, see the [OpenAPI specification]({{SWAGGER_URL}}).
