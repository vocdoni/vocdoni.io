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
every census member may vote on that question. Reads expose the resolved subset as
`eligibleMemberIds`.

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
curl "${auth[@]}" -X POST "$B/processes/census/validation" \
  -d "{\"orgAddress\":\"$ORG\",\"census\":{\"authFields\":[\"memberNumber\"],\"groupId\":\"$GROUP\"}}"
```

```jsonc
{ "valid": true, "errors": [] }   // errors may carry the offending member ids
```

## Growing the census after publishing

The census is fixed at [publish](/developers/docs/voting-processes#publishing-on-chain), but you can
add more members later without re-creating the process - see
[Growing a published census](/developers/docs/voting-processes#growing-a-published-census). Questions
with an eligibility subset keep their fixed size.
