---
name: add-testimonial
description: "Add a client testimonial to vocdoni.io: the 325x325 round avatar in assets/logos, the entry in lib/testimonials-data.ts and the testimonials_marquee.items.N copy in all 11 locales. Use for 'nou testimonial', 'afegeix un testimoni', 'nuevo testimonio', 'añade un testimonio', 'add a testimonial', 'quote from <org> for the home', '/add-testimonial'."
argument-hint: "[organization] [quote, source file or notes]"
---

# Add a testimonial

Testimonials feed the home marquee (`pages/index/+Page.tsx` → `TestimonialsComponent` → `TestimonialCard`) and the
quote slots of the solutions landings (`pages/solutions/*/+Page.tsx`, which pick a quote by `platformName`). One
testimonial is three pieces, shipped in one commit:

| Piece | Where | Shape |
| --- | --- | --- |
| Avatar | `assets/logos/logo_<org>_round.webp` | 325x325 `.webp` with alpha, full-bleed disc |
| Data entry | `lib/testimonials-data.ts`, appended to `getTestimonialsData` | `t('testimonials_marquee.items.N.*', 'English default')` |
| Copy | `locales/<lang>/common.json` → `testimonials_marquee.items.N` | `content`, `handle`, `title` in all 11 locales |

The card renders `title`, `content`, the avatar (`logo`, a 40px circle with `object-cover`), `name` and `handle`.
`rating`, `platformImage` and `platformName` are not displayed: `platformName` is the key the solutions pages look
the quote up by, and the avatar alt text.

## 1. Collect the facts

Ask for anything missing; never invent or embellish:

- Person: full name as they sign it, role, and the organization name as the organization writes it (accents, acronyms).
- The quote in its source language (usually Catalan or Spanish) and confirmation that the person approved publishing it.
- Logo source: ideally the organization's own round avatar (social profile picture) or its symbol as PNG/SVG. The wide
  wordmark is a last resort, it is unreadable at 40px.
- Brand colour (hex) when the symbol has to sit on a disc.

## 2. Make the round logo

Every avatar has the same shape so the marquee reads as one set: a disc that fills the whole 325x325 canvas, transparent
corners, the symbol centred, no padding ring (PR #110 replaced a padded badge for exactly this reason). References:
`logo_coib_round.webp`, `logo_ustec_round.webp`, `logo_foodcoop_round.webp`. Do not hand-crop in another tool and do
not ship a different size.

Use the bundled script (needs ImageMagick 7 and cwebp: `brew install imagemagick webp`):

```bash
# source already a disc or a square avatar: cover-crop it into the circle
.claude/skills/add-testimonial/make-round-logo.sh --src ~/Downloads/org-avatar.png --out assets/logos/logo_<org>_round.webp

# source is a symbol on a transparent (or, with --key-white, white) background: centre it on a brand-colour disc
.claude/skills/add-testimonial/make-round-logo.sh --src ~/Downloads/org-symbol.png --out assets/logos/logo_<org>_round.webp \
  --bg '#A50044' --scale 0.62 [--key-white]
```

Open the output with the Read tool and check: the disc touches all four edges, the symbol is centred and would still be
legible at 40px, no white box or halo around the symbol, 3-15 KB. Adjust `--scale` (0.55-0.75) or `--bg` and re-run
until it matches the references. Name it `logo_<org>_round.webp`, lowercase, no spaces.

Add a `logo_<org>_colour.webp` (horizontal colour logo on transparent) only if the organization will also sit in a
trust band (`components/app/SocialProof.tsx`, the solutions pages' `ORGANIZATIONS` maps). The marquee needs the round one only.

## 3. Add the data entry

`N` is the next index: the keys under `testimonials_marquee.items` in `locales/en/common.json` run from `0`, so `N` is
their count. Append to the array in `lib/testimonials-data.ts`, adding the import next to the other `_round` imports:

```ts
import logoOrgRound from '@/assets/logos/logo_<org>_round.webp'
// ...
    {
      name: 'First Last',
      handle: t('testimonials_marquee.items.N.handle', 'Role · Organization'),
      rating: 5,
      title: t('testimonials_marquee.items.N.title', 'Benefit-led headline in sentence case'),
      content: t(
        'testimonials_marquee.items.N.content',
        'The quote, in English.'
      ),
      platformName: 'Organization',
      platformImage: logoOrgRound,
      logo: logoOrgRound,
    },
```

- `handle` is `Role · Organization` with a spaced middle dot (`·`, U+00B7) in every locale. `pt-br` once shipped a `-`
  and needed a follow-up fix.
- `platformName` is a fixed string, never `t(...)`: the solutions pages compare it literally, and a translated one only
  matches in English. Use the short name the organization uses (`COIB`, `Foodcoop BCN`).
- `title` is a short benefit the quote itself supports, 5-9 words, sentence case. `content` is the quote, faithful,
  grammar edits only; keep `\n\n` only for a real paragraph break.
- Sentence case, no em dash, no "blockchain", "Web3" or "electronic voting" wording (say "online voting").
- Use the round logo for both `platformImage` and `logo` unless a `_colour` variant exists.

## 4. Add the copy to all 11 locales

Locales (`locales/index.ts`): `ca`, `de`, `el`, `en`, `es`, `eu`, `fr`, `hi`, `it`, `pt`, `pt-br`. In each
`locales/<lang>/common.json`, under `testimonials_marquee.items`, add:

```json
"N": {
  "content": "...",
  "handle": "Role · Organization",
  "title": "..."
}
```

- `en` values must be byte-identical to the defaults in the data file.
- The source-language locale gets the original quote verbatim. Every other locale is a real translation: no English left
  behind (the `no-copy` guardrail fails on it) and no empty strings (the `non-empty` guardrail fails on those).
- Translate the role, keep the organization name, keep figures. Read two neighbouring items in that locale first and
  match their register (ca and es are informal). Hindi is Devanagari with Latin brand names.
- Run `pnpm translations` (it sorts the files and must change nothing else), then `pnpm guardrails`.
- If `.claude/agents/locale-qa.md` exists, run the `locale-qa` agent on each non-English fragment against the English one
  and apply its blockers. Otherwise back-translate every value yourself and fix any drift.

## 5. Optional: a solutions landing

Only when the organization belongs to a vertical and agreed to appear there. Add it to that page's `ORGANIZATIONS` map
(`pages/solutions/<vertical>/+Page.tsx`, which needs the `_colour` logo for the band) and name it in
`lib/solutions/verticalProof.ts`: in the default set, or in a per-locale override when it is the first reference from
that market.

## 6. Verify

- `pnpm validate`.
- `pnpm dev`, open `/` and scroll to the testimonials marquee: title, quote, avatar filling the circle, name, handle.
  Spot-check `/ca/` and `/es/`.
- No test counts testimonials, so `tests/` stays untouched.

## 7. Ship

One commit with logo, data and locales: `feat(testimonials): add <Organization> testimonial localized in all languages`.
Fill `.github/pull_request_template.md` (summary, validation checklist) and state where the logo came from and who
approved the quote.

## Checklist

- [ ] `assets/logos/logo_<org>_round.webp`: 325x325, alpha, full-bleed disc, viewed and compared with the references
- [ ] `lib/testimonials-data.ts`: entry `N`, fixed `platformName`, `Role · Organization` handle
- [ ] `testimonials_marquee.items.N` in all 11 locales, `en` equal to the defaults, no copied English
- [ ] `pnpm translations` changed nothing but ordering; `pnpm validate` passes
- [ ] marquee checked in the dev server
