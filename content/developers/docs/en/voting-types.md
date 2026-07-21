---
title: Voting types
lead: How to shape a question's ballot - single choice or multichoice out of the box, and approval, ranked or quadratic through a raw override. Each question in a process picks its own type, so one process can mix them.
group: core_concepts
order: 42
---

Each **question** in a [process](/developers/docs/voting-processes) shapes its own ballot. You pick a
named `type` and tune it with `typeSetup`, or drop to a raw `ballotProtocol` override for shapes that
do not have a named preset yet. Because the type is per question, one process can mix a single-choice
question with an approval question.

## Named types

Set `type` and, optionally, `typeSetup` on the question:

| `type` | Ballot | `typeSetup` |
| --- | --- | --- |
| `singlechoice` | Pick one of N options - the ballot is `[chosenIndex]`. | - |
| `multichoice` | Approve a subset of N options - the ballot is `[0/1 per option]`. | `maxChoices` caps how many may be selected; `minChoices` is a validation hint. |

```jsonc
// single choice: pick one of the choices
{ "type": "singlechoice",
  "choices": [ { "title": { "default": "Ada Lovelace" }, "value": 0 },
               { "title": { "default": "Alan Turing" }, "value": 1 } ] }

// multichoice: approve up to 2 of the choices
{ "type": "multichoice",
  "typeSetup": { "minChoices": 1, "maxChoices": 2, "uniqueChoices": false },
  "choices": [ /* N options */ ] }
```

`typeSetup` fields:

| Field | Type | Description |
| --- | --- | --- |
| `minChoices` | integer | Validation hint for the minimum selections (not enforced on-chain). |
| `maxChoices` | integer | Maximum selections for `multichoice`. |
| `uniqueChoices` | boolean | Require every field in the ballot to hold a distinct value. |

## Raw ballot override

For approval variants, ranked, or quadratic voting, set `ballotProtocol` on the question. When present
it **takes priority** over `type`/`typeSetup` and maps directly onto the on-chain election parameters.
Note the field names differ from `typeSetup`: the raw override uses `maxCount`/`maxValue`/`uniqueValues`
(protocol names), where `typeSetup` used `maxChoices`/`uniqueChoices`.

| Field | Type | Description |
| --- | --- | --- |
| `maxCount` | integer | Number of fields in the ballot. |
| `maxValue` | integer | Largest value any field may take (`0` = values are amounts to aggregate). |
| `uniqueValues` | boolean | Require distinct values across fields (ranked). |
| `costExponent` | integer | Exponent applied per value when computing ballot cost (quadratic uses a squared cost). |
| `maxTotalCost` | integer | Cap on the summed cost across the ballot (e.g. the number of approvals, or a credit budget). |
| `costFromWeight` | boolean | Use each voter's census weight as their credit budget. |
| `maxVoteOverwrites` | integer | How many times a voter may change their vote. |

- **Ranked** - `uniqueValues: true` with `maxValue = choices - 1`, so each rank is used once.
- **Quadratic / budget** - `maxValue: 0` with a `costExponent` and a `maxTotalCost` budget (or
  `costFromWeight: true` to derive the budget from a weighted census).

```jsonc
// quadratic: allocate a credit budget across options, squared cost
{ "ballotProtocol": {
    "maxCount": 4, "maxValue": 0,
    "costExponent": 2, "maxTotalCost": 100
  },
  "choices": [ /* 4 options to fund */ ] }
```

> [!WARNING] Exact encoding
> `ballotProtocol` is the raw protocol contract - the precise numeric encoding (including any cost
> scaling) is defined by the ballot protocol, not the SaaS. Confirm values against the
> [OpenAPI specification]({{SWAGGER_URL}}) and the
> [vocdoni-ballot-protocol skill](/developers/docs/sdk-quickstart#ai-agent-skills) before relying on a
> particular curve. Shapes that need a minimum value or an exactly-K selection count are not yet
> expressible.

> [!NOTE] Secret results
> Set `"secretUntilTheEnd": true` on a question to keep its tally encrypted until it ends.

## Reading the results

Whatever the type, a question's results come back as `results[field][value]`. Single choice reads
discretely; approval reads the per-option `results[i][1]`; ranked and quadratic read index-weighted.
See [Results](/developers/docs/results) for the response shape and the reading each type uses.

For the complete, machine-readable contract, see the [OpenAPI specification]({{SWAGGER_URL}}).
