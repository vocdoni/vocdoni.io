---
title: Integrator quota
lead: As an integrator you have provisioning limits - how many managed organizations you can create, processes you can publish, votes you can relay and OTP messages you can send. Read them to stay ahead of your usage and know when to upgrade.
group: integrator_platform
order: 30
---

Your **integrator account** has provisioning limits that cap how much you can provision across all of
your managed organizations. They are separate from any single organization's plan: this page is about
*your* limits as an integrator, not an end customer's subscription. Read them to gate your own UI and
to avoid hitting a wall mid-flow.

> [!NOTE] Staging ignores quotas
> Limits apply in **production** only. On [staging](/developers/docs/api-conventions#environments) no
> integrator quota is enforced, so you can provision organizations, processes, votes and OTPs freely
> while building and testing.

## Reading your quota

- **GET** `/integrator`

```bash
curl "${auth[@]}" "$B/integrator"
```

```jsonc
{ "enabled": true,
  "limits": { "maxManagedOrgs": 1, "maxManagedProcesses": 10, "maxVotes": 1000,
              "maxEmails": 500, "maxSMS": 200 },
  "usage":  { "managedOrgs": 1, "managedProcesses": 2, "sentVotes": 134,
              "sentEmails": 87, "sentSMS": 12 } }
```

:::code-tabs[read your quota]

```ts
const { limits, usage } = await client.organizations.getIntegratorInfo()
const orgsLeft = limits.maxManagedOrgs - usage.managedOrgs
```
```csharp
var q = await Get("/integrator");
var limits = q.GetProperty("limits");
int orgsLeft = limits.GetProperty("maxManagedOrgs").GetInt32()
             - q.GetProperty("usage").GetProperty("managedOrgs").GetInt32();
```
```python
q = get("/integrator").json()
orgs_left = q["limits"]["maxManagedOrgs"] - q["usage"]["managedOrgs"]
```
:::

## Limits and usage

Every limit has a matching counter under `usage`. Compare the two to see how much headroom you have
before you provision more.

| Limit | Usage counter | Caps |
| --- | --- | --- |
| `maxManagedOrgs` | `managedOrgs` | Managed organizations you can provision. |
| `maxManagedProcesses` | `managedProcesses` | Published voting processes across your managed orgs. |
| `maxVotes` | `sentVotes` | Votes relayed to the protocol. |
| `maxEmails` | `sentEmails` | Email OTP (second-factor) messages sent. |
| `maxSMS` | `sentSMS` | SMS OTP (second-factor) messages sent. |

> [!NOTE] Reading the limits
> A `0` limit means **unlimited**. `enabled: false` means integrator features aren't turned on for your
> plan - enable integrator access or upgrade from the [API Dashboard](https://platform.vocdoni.io).

## Tiers

**Free tier.** Allows **one managed organization** with modest limits on processes, votes and OTP
messages - enough to build and test a full integration. Deleting the managed org frees the slot, and
the cascade also rolls back your usage counters. See
[Managed organizations](/developers/docs/managed-organizations) to provision and delete them.

**Custom tier.** Beyond the free tier, integrator limits are set on a **custom plan agreed directly
with Vocdoni**. After the agreement, your negotiated allowances - how many managed organizations and
published processes you can run, how many votes you can relay, and your email/SMS OTP budget - are
provisioned on your integrator account and surface in `GET /integrator`. There is no self-serve
upgrade for integrator quotas: to raise a limit, talk to the Vocdoni team through the
[API Dashboard](https://platform.vocdoni.io) or your account contact, and the new values take effect
once your plan is updated.

> [!TIP] Check headroom before you provision
> Read `GET /integrator` and compare each limit with its `usage` counter before creating an org,
> publishing a process, or sending OTPs - so a customer-facing action never fails on a quota you could
> have seen coming. On a custom plan a `0` limit means that allowance is unlimited.
