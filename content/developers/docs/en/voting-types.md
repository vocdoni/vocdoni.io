---
title: Voting types
lead: How to shape a question's ballot - four named types out of the box, and anything else through a raw override. Each question in a process picks its own type, so one process can mix them.
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
| `singlechoice` | Pick one of N options - the ballot is `[chosenValue]`. | - |
| `multichoice` | Approve a subset of N options - the ballot is `[0/1 per option]`. | `maxChoices` caps how many may be selected. |
| `ranked` | Rank every option, each rank used once - the ballot is one field per option holding its rank `0..N-1`, highest wins. Needs at least 2 choices. | - |
| `cumulative` | Spread a credit budget across the options - the ballot is one field per option holding the credits it received. | `budget` (required) is the total credits; `costExponent` (required) is `1` for a linear budget or `2` for quadratic. |

```jsonc
// single choice: pick one of the choices
{ "type": "singlechoice",
  "choices": [ { "title": { "default": "Ada Lovelace" }, "value": 0 },
               { "title": { "default": "Alan Turing" }, "value": 1 } ] }

// multichoice: approve up to 2 of the choices
{ "type": "multichoice",
  "typeSetup": { "maxChoices": 2 },
  "choices": [ /* N options */ ] }

// ranked: rank all the choices, each rank used once
{ "type": "ranked",
  "choices": [ /* N options to rank */ ] }

// cumulative: split 100 credits across the choices, quadratic cost
{ "type": "cumulative",
  "typeSetup": { "budget": 100, "costExponent": 2 },
  "choices": [ /* N options to fund */ ] }
```

`typeSetup` fields:

| Field | Type | Description |
| --- | --- | --- |
| `maxChoices` | integer | Maximum selections for `multichoice`. |
| `budget` | integer | Total credits a voter distributes in a `cumulative` ballot. Required and greater than zero for that type. |
| `costExponent` | integer | Cost curve for `cumulative`: `1` linear, `2` quadratic. Required for that type; no other value is accepted. |
| `minChoices` | integer | Client-side validation hint only. The protocol has no minimum-count field, so it is **not enforced on-chain**. |
| `uniqueChoices` | boolean | **Ignored by the named types** - only `ranked` needs distinct values and it derives that from the type. Setting it on a `multichoice` is rejected, because on that layout no ballot could satisfy it and the question would tally to zero. Use `uniqueValues` in a raw override if you really need the flag. |

## Raw ballot override

The four named types above are presets over the same on-chain parameters. For a shape none of them
expresses - or to reach a knob `typeSetup` has no field for, such as `maxVoteOverwrites` or
`costFromWeight` - set `ballotProtocol` on the question instead. When present it **takes priority**
over `type`/`typeSetup` and maps directly onto the on-chain election parameters. Note the field names
differ from `typeSetup`: the raw override uses `maxCount`/`maxValue`/`uniqueValues` (protocol names),
where `typeSetup` uses `maxChoices`/`uniqueChoices`.

| Field | Type | Description |
| --- | --- | --- |
| `maxCount` | integer | Number of fields in the ballot. |
| `maxValue` | integer | Largest value any field may take (`0` = values are amounts to aggregate). |
| `uniqueValues` | boolean | Require distinct values across fields (ranked). |
| `costExponent` | integer | Exponent applied per value when computing ballot cost (quadratic uses a squared cost). |
| `maxTotalCost` | integer | Cap on the summed cost across the ballot (e.g. the number of approvals, or a credit budget). |
| `costFromWeight` | boolean | Use each voter's census weight as their credit budget. |
| `maxVoteOverwrites` | integer | How many times a voter may change their vote. |

Each named type is exactly one point in this space, so the table doubles as a map of what they emit
over `N` choices:

| `type` | Equivalent `ballotProtocol` |
| --- | --- |
| `singlechoice` | `maxCount: 1`, `maxValue` = the highest `value` among the choices. |
| `multichoice` | `maxCount: N`, `maxValue: 1`, `costExponent: 1`, `maxTotalCost` = `maxChoices`. |
| `ranked` | `maxCount: N`, `maxValue: N - 1`, `uniqueValues: true`. |
| `cumulative` | `maxCount: N`, `maxValue: 0`, `costExponent` and `maxTotalCost` = `budget`. |

So reach for the override when you need something off that map - a vote a voter may change, or a
budget taken from each voter's census weight rather than a fixed number:

```jsonc
// budget derived from each voter's census weight, and votes may be changed twice
{ "ballotProtocol": {
    "maxCount": 4, "maxValue": 0,
    "costExponent": 2, "costFromWeight": true,
    "maxVoteOverwrites": 2
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
> Set `"secretUntilTheEnd": true` on a question to keep its tally encrypted until it ends. Voters seal
> their ballots with the question's on-chain encryption keys - see
> [Casting votes](/developers/docs/casting-votes).

## Reading the results

Whatever the type, a question's results come back as `results[field][value]`. Single choice reads
discretely; approval reads the per-option `results[i][1]`; ranked and quadratic read index-weighted.
See [Results](/developers/docs/results) for the response shape and the reading each type uses.

For the complete, machine-readable contract, see the [OpenAPI specification]({{SWAGGER_URL}}).
