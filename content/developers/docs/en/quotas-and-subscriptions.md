---
title: Quotas and subscriptions
lead: Each organization has a subscription that sets which features are available and how much it can use. Read it to adapt your integration and to show plan limits to your users.
group: integrator_platform
order: 30
---

## Reading the subscription

Fetch the subscription for an organization to get its plan, the current details, and usage counters such as processes run and members imported.

- **GET** `/organizations/{address}/subscription`

```bash
curl "{{API_BASE_URL}}/organizations/$ORG/subscription" \
  -H "Authorization: Bearer $TOKEN"
# -> { "plan": { ... }, "subscriptionDetails": { ... }, "usage": { ... } }
```

## Plan features

Features describe what a plan unlocks. Check them before offering an option in your UI - for example, only show anonymous voting if the plan allows it.

| Field | Type | Description |
| --- | --- | --- |
| `anonymous` | boolean | Anonymous voting with zero-knowledge proofs. |
| `liveResults` | boolean | Live results while a process is running. |
| `whiteLabel` | boolean | White-label branding for the voting experience. |
| `overwrite` | boolean | Allow voters to change their vote. |
| `2FAemail` | integer | Quota of email second-factor messages. |
| `2FAsms` | integer | Quota of SMS second-factor messages. |

## Subscription details

The details object reports whether the subscription is active, the plan id, the maximum census size and key dates such as start and renewal.

| Field | Type | Description |
| --- | --- | --- |
| `active` | boolean | Whether the subscription is currently active. |
| `planId` | integer | The plan the organization is on. |
| `maxCensusSize` | integer | Largest census the plan permits. |
| `renewalDate` | string | When the subscription next renews. |
