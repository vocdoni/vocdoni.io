---
title: Census
lead: A census is the who-can-vote list and how they prove who they are. It is declared inline when you create a process - no separate create-and-publish step - and its type is inferred from the fields you pick.
group: core_concepts
order: 30
---

A **census** is the eligible-voter list plus the rules for how a voter authenticates. You no longer
build and publish it separately: you declare it **inline** in the `census` object of
[`POST /processes`](/developers/docs/voting-processes), and the server materializes and publishes it
for you at [publish](/developers/docs/voting-processes#publishing-on-chain) time. Its internal id is
never sent or returned.

## The census object

```jsonc
{
  "weighted": false,          // when true, each member's weight counts as vote weight
  "authFields": ["memberNumber"],
  "twoFaFields": [],          // e.g. ["email"] for an email OTP second factor
  "groupId": "",              // populate from a group's members...
  "memberIds": []             // ...or list member ids explicitly
}
```

| Field | Type | Description |
| --- | --- | --- |
| `authFields` | string[] | Optional. Identity fields a voter must present (e.g. `memberNumber`). |
| `twoFaFields` | string[] | Optional. Channels for a one-time-code second factor: `email` or `phone`. |
| `weighted` | boolean | Count each member's `weight` as their vote weight. |
| `groupId` | string | Populate the census from a [group's](/developers/docs/members-and-groups) members. |
| `memberIds` | string[] | Populate the census from an explicit list of member ids. |

Populate the census from a `groupId` **or** an explicit `memberIds` list - both reference the
organization's [members and groups](/developers/docs/members-and-groups). Use the auto "All members"
group to include everyone.

The fields above are what you **send**. A process read adds response-only `size` and `totalWeight` to
the census object - see [Reading a process](/developers/docs/voting-processes#reading-a-process).

## Authentication

`authFields` and `twoFaFields` are **two independent settings, each optional**. Set **either, or both**:

- **`authFields` only** - an **auth-only** census: the voter authenticates purely by presenting these
  identity fields, no second factor.
- **`twoFaFields` only** - a 2FA census with **no `authFields` required**: the voter identifies by the
  contact channel (email or phone), receives a one-time code, and enters it. Turning on 2FA does not
  require any auth fields.
- **both** - identity fields **and** a one-time code.

The census **type** is inferred from `twoFaFields` (you never set it directly); `authFields` can be
combined with any of them:

| Type | `twoFaFields` | Second factor |
| --- | --- | --- |
| `auth` | none | none (auth-only) |
| `mail` | `["email"]` | email OTP |
| `sms` | `["phone"]` | SMS OTP |
| `sms_or_mail` | `["email","phone"]` | voter's choice |

- `authFields` options: `name`, `surname`, `memberNumber`, `nationalId`, `birthDate`.
- `twoFaFields` options: `email`, `phone`.

> [!WARNING] The identifying field must be unique
> Whatever field identifies a voter - an `authFields` value like `memberNumber` on an auth-only census,
> or the `email`/`phone` used for the code - must be **unique** across the members you include;
> duplicates fail the publish [readiness check](/developers/docs/voting-processes#checking-readiness).

> [!NOTE] Weighted voting
> Set `"weighted": true` to make each member's `weight` count as their vote weight - use it for
> shareholder meetings or any vote where members do not count equally.

## Per-question eligibility

The process census is the full electorate. A single **question** can narrow it to a subset with its
own optional `census` object (a `groupId` or `memberIds`, always within the process census); omit it and
every census member may vote on that question. Reads expose the resolved subset as `eligibleMemberIds`,
but **only to a manager/admin** (or a `voting:write` key) - it is stripped from the public process
reads. An **empty** subset means no restriction: the question is open to the whole census. A voter
checks their own per-question eligibility with
[`POST /processes/{processId}/check`](/developers/docs/casting-votes#voter-status).

The subset is not fixed at publish time: replace it later - even while voting is ongoing - with
[`PUT /processes/{processId}/questions/{questionId}/census`](/developers/docs/voting-processes#changing-a-questions-eligibility).

```jsonc
"questions": [{
  "title": { "default": "Board seat (full members only)" },
  "choices": [ /* ... */ ],
  "census": { "groupId": "<full-members-group>" }   // subset of the process census
}]
```

Identity and weight always come from the process census; the subset only decides **which** members may
vote on **which** question. This is how one process runs questions with different electorates without
building multiple censuses.

## Validating a census

Dry-run a census spec before you create the process. It flags the common problems - duplicate or
missing auth-field data across the members it resolves - without creating anything.

- **POST** `/processes/census/validation`

```bash
curl "${auth[@]}" -X POST "$B/processes/census/validation" -d @- <<JSON
{
  "orgAddress": "$ORG",
  "census": { "authFields": ["memberNumber"], "groupId": "$GROUP" }
}
JSON
```

```jsonc
{ "valid": true, "errors": [] }   // errors may carry the offending member ids
```

## Kept in sync with the memberbase

The memberbase is the source of truth: a process census is a **snapshot of it taken through a group
or a member list, kept in sync** after publishing. Changes to
[members and groups](/developers/docs/members-and-groups) cascade to the censuses of ongoing
processes:

- **Additions propagate.** A member added to the group a live census was built from (including new
  members landing in an auto "All members" group) joins that census and can vote; the affected
  elections are resized on chain automatically. Additions are gated by your plan's census quota.
- **Removals cascade, but voters are protected.** Deleting a member or removing them from a group
  strips them from the affected censuses and question eligibility lists, so the credential service
  stops signing for them. If the CSP has **already signed** for the member on a question that is
  still `READY` or `PAUSED`, the removal is **refused** with a `409` (error code `40173`) and the
  offending ids in `data.signedMemberIds` - once voting closes it succeeds.
- The census can also be edited directly on the process - adding members, removing them, or
  replacing a question's eligibility list - see
  [Managing a published census](/developers/docs/voting-processes#managing-a-published-census).
