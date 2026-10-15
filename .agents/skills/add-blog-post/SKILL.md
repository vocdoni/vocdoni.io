---
name: add-blog-post
description: "Write and ship a vocdoni.io blog post (success story, announcement, product update): the English .mdoc, a cover rendered from the scripts/blog-cover template, translations in all 11 locales, cross-links, validation and the PR. Use for 'nou blogpost', 'nou post', 'escriu un article', 'nuevo post', 'nueva entrada', 'new blog post', 'success story for <org>', '/add-blog-post'."
argument-hint: "[organization or topic] [source material]"
---

# Add a blog post

Read [`content/blog/AGENTS.md`](../../../content/blog/AGENTS.md) first: it is the schema (frontmatter fields, authors,
categories, locales, image paths). This skill is the workflow on top of it. Latest references in `content/blog/en/`:
`fc-barcelona-supporters-clubs-online-election.mdoc` (PR #211) and `foodcoopbcn-hybrid-general-assembly.mdoc` (PR #237).

## 0. Inputs

- Type: success story (the common case), announcement, product update, partnership, technology.
- Material: interview notes or the client's text, every figure with its source (official announcement, organizer
  email), the organization name as they write it, dates, the approved quote if any, the colour logo, and a photo only
  if they gave permission to use it.
- Publication: date, author slug (`content/blog/authors/`), category slug(s) (`content/blog/categories/`), and whether
  the post goes live on merge.

Ask for what is missing. Never invent figures, names or quotes; a number you cannot source does not go in.

## 1. Slug and file

- Slug: short, English, hyphenated, stable, `<org>-<what>`: `fc-barcelona-supporters-clubs-online-election`,
  `foodcoopbcn-hybrid-general-assembly`. It is the filename in every locale and the URL, never the title.
- Write `content/blog/en/<slug>.mdoc` first (or the source-language file first when the material is Catalan or
  Spanish, then English; the other locales are translated from English).

## 2. Frontmatter

```yaml
---
title: "How <Org> ran <what> with Vocdoni"
publishedDate: 'YYYY-MM-DD'
excerpt: "One or two sentences with the headline figure."
coverImage: /blog/images/YYYY/MM/header_vocdoni_<org>.webp
coverAlt: "<same as title>"
authors:
  - ferran
categories:
  - success-stories
featured: false
draft: false
seo:
  metaTitle: "<Org> <what> | Vocdoni"
  metaDescription: "Up to 160 characters, with the figure and the method."
---
```

Double-quote every free-text value: an apostrophe inside single quotes ("supporters' clubs", "l'assemblea") breaks
the YAML and the blog build.

`featured: true` only for the one flagship post of the moment (it takes the hero of `/blog`). `draft: true` hides the
post on the live site but not in `pnpm dev`.

## 3. Body

Plain Markdown. Success stories follow this shape (check the two references before writing):

1. Bold lead: who the organization is, one sentence, linking their site.
2. Context paragraph, then a "The result:" paragraph with the headline numbers in bold.
3. `## Key facts`: bullets for Organization, Vote, Date, Format or voting method, Votes cast or turnout, Online voting
   properties, Results.
4. `## What <org> is`
5. `## The challenge: ...` with the needs as a bold-led list.
6. `## How the vote worked`: numbered steps as the voter saw them, then a `### Anyone can check the result, no one can
   see your vote` paragraph in plain prose.
7. The quote, if there is one, as a blockquote with `\- Name, role at Org` as its last line (see the FoodcoopBCN post).
8. `## The results: ...`: bullets plus a one-line takeaway.
9. `## What <segment> can learn`: link two related success stories and `/solutions/<segment>`.
10. `## Bring your members' vote online` (or a title of the same spirit): CTA bullets, a `---` rule, a closing paragraph
    with `https://app.vocdoni.io/en/account/signup?type=<segment>` and `[Talk to our team](/contact)`.

Other types mirror the closest existing post in `content/blog/en/`.

Editorial rules:

- Sentence case in headings, never an em dash, no custom Markdoc tags.
- Links: absolute for external sites, root-relative for internal pages (`/blog/<slug>`, `/solutions/<segment>`,
  `/app`, `/contact`), no locale prefix.
- Vocabulary: "online voting", never "electronic voting", "blockchain" or "Web3". "Anonymous vote" in prose ("secret
  ballot" only in the SEO meta if useful). "Verifiable" means anyone can check the result; "census" is the roll of
  eligible voters.
- Anonymity is explained in plain prose (identity and ballot kept apart, ballots encrypted until the close). Never link
  `/blog/anonymous-voting-zksnarks` or `/blog/road-to-anonymous-voting`, and do not present zk-SNARKs as the mechanism;
  link the DAVINCI posts if a technical reference is wanted.
- Figures: turnout as "X% of <who>", with the absolute numbers next to it when known; say what a big number counts
  (members, clubs, voters).
- Internal links worth having: two or three success stories, the Vocdoni App 2.3 hybrid post when the vote was hybrid,
  `/solutions/<segment>` (segments are the folders in `pages/solutions/`), `/app`.

## 4. Cover, from the template

Every new post gets its cover rendered from `scripts/blog-cover/template.html` by `scripts/blog-cover/render.sh`
(headless Chrome + cwebp, 1685x920 `.webp`). Never hand-make or generate a cover another way: the template is what keeps
the blog looking like one publication (dark warm ink background, grain, green eyebrow dot, Fraunces title, the
`vocdoni × <partner>` lockup). Read the header of `render.sh` first: the options grow over time and the header is the
truth for this checkout.

- Partner logo: the organization's brand disc, `assets/logos/logo_<org>_round.webp` (the testimonial avatar; make one
  with the `add-testimonial` recipe if it is missing). It fills its circle in the lockup, so `--c1` / `--c2` should be
  picked from that disc. A bare mark on a transparent background still works with `--badge ring` (cream circle).
- Eyebrow: `<Org> · <year of the vote>` (rendered uppercase). Title: leave "Success stories" for success stories,
  otherwise a two or three word label.
- Variant: `--variant` is required. `stripes` (brand-colour band), `stat` (one
  huge figure, when the number is the story; pass `--label` with what it counts, the caption defaults to "turnout"),
  `ballot` (a ballot card, announcements and product posts), `pitch` (a football pitch, sports clubs only), `centered`
  with `--photo` (the organization's own photo behind the lockup; tuned with `--filter`, `--fit`, `--motif`, `--badge`).
- `--c1` / `--c2`: the organization's brand colours, required. `--photo`: a path inside the repo (paths are relative to the repo root); keep raw photos out of
  git unless they are used in the post.
- Output: `public/blog/images/YYYY/MM/header_vocdoni_<org>.webp`, `YYYY/MM` being the publication month.

```bash
scripts/blog-cover/render.sh --partner assets/logos/logo_fcb_round.webp --variant pitch --c1 '#004d98' --c2 '#a50044' \
  --eyebrow 'FC Barcelona · 2022' --out public/blog/images/2026/10/header_vocdoni_fcbarcelona.webp

scripts/blog-cover/render.sh --partner assets/logos/logo_<org>_round.webp --variant stat --stat '1,160' \
  --label clubs --eyebrow '<Org> · 2026' --c1 '<#hex>' --c2 '<#hex>' --out public/blog/images/2026/11/header_vocdoni_<org>.webp
```

Then open the output with the Read tool and check: the lockup is centred and legible, the partner disc is whole
and fills its circle, no text is clipped, and nothing important lives in the outer ~110px on each side (the blog card
crops to 16:10, the post header to 16:9). Iterate on variant, eyebrow and colours until it reads well. Needs Chrome and
`cwebp` (`webp` in Homebrew and apt, `libwebp-utils` in pacman). The script looks for Chrome or Chromium on the PATH and in
the macOS app folder; set `CHROME=<path>` if it lives elsewhere.

Inline images go to the same `public/blog/images/YYYY/MM/` folder as `.webp`, referenced web-absolute.

## 5. Translate into the other 10 locales

Same filename in `content/blog/{ca,de,el,es,eu,fr,hi,it,pt,pt-br}/`. One locale at a time, or one agent per locale
when the Agent tool is available.

- Translate: `title`, `excerpt`, `coverAlt`, `seo.*`, and the body prose.
- Keep byte-identical: `publishedDate`, `coverImage`, `authors`, `categories`, `featured`, `draft`, image paths,
  internal link targets, heading count and nesting, code blocks.
- Localize external links when the site has that language (fcbarcelona.es / .cat). Organization and product names stay.
- Register: ca and es informal; match the surrounding posts of that locale. Nothing left in English in a non-English
  file (read the whole file back).
- Run the `locale-qa` agent (`.claude/agents/locale-qa.md`, local) per locale against the English file and apply the
  blockers; if it is not available, back-translate each paragraph yourself.

## 6. Cross-links and references

- Search `content/blog/*/` for the organization name and link existing mentions to `/blog/<slug>` (same edit in every
  locale), as PR #211 did for the FC Barcelona mentions.
- If a solutions landing features the organization (`CASE_STUDIES` / `BLOG_HREF` in `pages/solutions/<vertical>/+Page.tsx`),
  point it at the new post when asked.
- If the client also gave a quote for the home marquee, use the `add-testimonial` skill.

## 7. Verify

- `pnpm validate` (Prettier, tests, translation guardrails).
- `pnpm dev`: `/blog/<slug>`, `/es/blog/<slug>`, `/ca/blog/<slug>`, and the card on `/blog` (cover crop). Drafts show in
  dev only.
- `tests/lib/blog/*` need no change for a new post.

## 8. Ship

- `draft: false` when the PR will merge on or after the publication date (a merge to `main` then a release to `lts`
  publishes it). Use `draft: true` only when the PR must land earlier, and drop the flag in a follow-up commit
  ("publish the <org> story on merge").
- Commit: `feat(blog): <Org> <what> success story`. PR body: follow `.github/pull_request_template.md` (Summary,
  Validation, Visuals with the cover attached). Under Summary add the editorial notes (vocabulary choices, where each
  figure comes from, logo origin), locale-qa and the exact cover command used.
- After the release reaches `lts`: `pnpm indexnow https://vocdoni.io/en/blog/<slug>` (optional, see `scripts/indexnow.ts`).

## Checklist

- [ ] `content/blog/en/<slug>.mdoc` with the frontmatter above and sourced figures
- [ ] cover rendered from `scripts/blog-cover/render.sh`, viewed, saved under `public/blog/images/YYYY/MM/`
- [ ] the same filename in all 11 locales, shared fields byte-identical, locale-qa blockers fixed
- [ ] existing mentions linked to the new post
- [ ] `pnpm validate` passes; post and card checked in the dev server
- [ ] `draft` set for the intended publication, PR body with editorial notes and the cover command
