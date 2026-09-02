# Vocdoni design

The design reference for [vocdoni.io](https://vocdoni.io): what the site looks like, why it looks that way, and the rules to follow when extending it. Token-level source of truth is `layouts/tailwind.css` (Tailwind v4, CSS-first via `@theme`); a compact token reference also lives in [`docs/design-system.md`](docs/design-system.md).

## Identity

Vocdoni's visual language is **warm and editorial** rather than corporate-SaaS-cold. The intent: secure digital voting is a serious, trust-critical product, but the brand voice is human, calm, and confident - closer to a well-set book than a dashboard.

The identity rests on five pillars:

1. **Cream, not white.** Every surface is a warm cream (`--background`, oklch hue ~97). Pure white and neutral grays never appear.
2. **One ink, many alphas.** All text and lines derive from a single warm ink color at fixed opacity tiers - there is no separate gray ramp.
3. **A single-weight display serif.** Headings are Fraunces at weight 400 with the SOFT axis maxed, giving a rounded, warm editorial voice. Never bolded.
4. **Deep green as the brand accent.** Vocdoni green (`--primary`) marks links, icons, chips, and in-page CTAs. The signature top-level CTA is instead a dark ink pill.
5. **Signal yellow as punctuation.** A butter-yellow dot precedes every section label (the "eyebrow"). That dot is the only place the yellow exists - it is punctuation, never a surface.

## Color

All colors are OKLCH, defined as CSS variables in `layouts/tailwind.css` and consumed through Tailwind utilities (`bg-background`, `text-muted-foreground`, ...). Never hardcode hex values, `text-gray-*`, or `bg-white`.

### Core palette (light)

| Token            | Value                    | Use                                                   |
| ---------------- | ------------------------ | ----------------------------------------------------- |
| `--background`   | `oklch(0.988 0.011 97)`  | Body and card surfaces (warm cream)                   |
| `--foreground`   | `oklch(0.24 0.013 106)`  | Warm ink - all primary text                           |
| `--secondary`    | `oklch(0.962 0.022 97)`  | Tinted cream panels (dropdown intro columns, sidebar) |
| `--muted`        | `oklch(0.936 0.033 97)`  | Deeper cream for alternate section bands              |
| `--primary`      | `oklch(0.47 0.085 158)`  | Vocdoni green: links, icons, chips, in-page CTAs      |
| `--surface-dark` | `oklch(0.235 0.012 107)` | Dark ink pills (navbar/hero CTAs) and dark panels     |
| `--signal`       | `oklch(0.93 0.11 102)`   | Butter yellow - eyebrow/status dots ONLY              |

### Ink alpha hierarchy

Text and lines on cream use the foreground ink at fixed alpha tiers:

- **100%** `text-foreground`: headings and primary copy (15.8:1)
- **64%** `text-muted-foreground`: ledes, descriptions (4.9:1, AA at body sizes)
- **55%** `text-faint`: uppercase labels, group headers, meta only (3.7:1) - never body copy
- **10%** `border-border` / `border-input`: hairline borders on any cream surface
- **7%** `bg-accent`: hover tint fills (menu items, ghost buttons)

Primary green on cream is 6.3:1 (AA). Focus rings (`--ring`) use the primary green.

### Status and auxiliary colors

- `--success` (green), `--warning` (amber), `--destructive` (red) for statuses; used at small scale (icons, chips like "Eligible" / "Not eligible" in the hero cards).
- `--signal-halo`: soft ring around a signal dot (`.eyebrow-dot-halo`).
- `--chart-1` through `--chart-5`: muted blue/orange ramp for data viz.
- `--brand-whatsapp` (`text-whatsapp`): WhatsApp brand references only.

### Dark mode

A complete `.dark` palette mirrors the same recipe (ink and cream swap roles, primary lightens). It is defined and kept coherent, but **there is currently no theme toggle** - the site ships light-only. Keep the dark values in sync when adding tokens.

## Typography

Three self-hosted variable typefaces (`public/fonts/fonts.css`, synced by `scripts/copy-fonts.mjs`), each with a Devanagari fallback for the Hindi locale:

| Role             | Face                    | Token                   |
| ---------------- | ----------------------- | ----------------------- |
| Body / UI        | Hanken Grotesk Variable | `--font-sans` (default) |
| Display headings | Fraunces Variable       | `--font-serif`          |
| Code             | JetBrains Mono Variable | `--font-mono`           |

### Headings

The base layer styles every `h1`-`h6` globally:

- `font-family` serif, **`font-weight: 400`** - the display serif is designed for its single weight; never add `font-bold`/`font-black`
- `font-variation-settings: 'SOFT' 100, 'WONK' 0` - SOFT rounds the serifs into the warm display voice; keep WONK off for legibility
- `letter-spacing: -0.03em`, `line-height: 1.02`, `text-wrap: balance`

Sizes are set per component. Section headings via `SectionHeader` run `text-4xl sm:text-5xl lg:text-6xl`. The hero `h1` uses container-query sizing (`.hero-headline`, `clamp(1.5rem, 9cqw, 4.75rem)` at `leading-[0.95]`) tuned so the headline lands on exactly three lines at every width and locale (see the `:lang(hi)` and narrow-phone overrides in `layouts/style.css`).

For non-display contexts (legal pages, docs prose) use the `Heading` / `Paragraph` components in `components/ui/typography.tsx`, which carry their own sans-weight variants.

### Body and labels

- UI text runs 14-16px; body copy is `text-base`/`text-lg` with `leading-relaxed`; ledes are `text-lg text-muted-foreground`.
- Eyebrow labels: `text-sm font-medium uppercase tracking-[0.11em] text-muted-foreground`.
- Group labels inside panels: `text-[11px] font-semibold uppercase tracking-wider text-faint`.
- `text-wrap: pretty` is on globally; antialiasing and `optimizeLegibility` too.

### Copy rules

- **Sentence case everywhere** - only the first word capitalized, plus proper nouns, acronyms (GDPR, SDK), and the brand "Vocdoni". No title case in menus, headings, or feature cards.
- **Never an em dash character.** Use a spaced regular dash (`-`) or restructure the sentence.
- All user-facing copy goes through `react-i18next` with an English default: `t('key', 'Default copy')`. See AGENTS.md for the full i18n policy.

## The eyebrow pattern

Every section opener follows the same three-part rhythm:

1. **Eyebrow**: an 8px signal-yellow dot + uppercase label (`components/Eyebrow.tsx`, or `.eyebrow` / `.eyebrow-dot` classes; `.eyebrow-dot-halo` adds a soft ring)
2. **Display heading** in the serif
3. Optional **muted lede** capped at `max-w-2xl`

Use `components/SectionHeader.tsx` (props: `eyebrow`, `title`, `lede`, `align='center' | 'left'`, `headingLevel`) instead of assembling these by hand.

## Layout and spacing

- **Container**: `components/Container.tsx` - `max-w-7xl` centered with `px-4 sm:px-6 lg:px-8`. The navbar caps wider at `max-w-[1408px]`.
- **Section rhythm**: `components/Section.tsx` applies `py-section sm:py-section-md lg:py-section-lg` (32 / 64 / 96px semantic tokens). Sections alternate `bg-background` and `bg-muted` cream bands.
- **Spacing scale**: the Tailwind base unit is customized (`--spacing: 0.3125rem`) with explicit overrides for select steps and semantic tokens `--spacing-section(-md/-lg)` and `--spacing-card(-lg)` - see the commented block in `layouts/tailwind.css` before inventing ad-hoc padding.
- Horizontal overflow is clipped at the root (`overflow-x: clip`, which preserves `position: sticky`), and anchors offset below the sticky navbar via `scroll-padding-top: 5.5rem`.

## Radius

`--radius: 1rem` (16px) is the panel radius. Derived scale: `rounded-sm` 10px, `rounded-md` 12px, `rounded-lg` 16px, `rounded-xl` 20px, plus `rounded-card` (20px) for Card surfaces. Pills - dark CTAs, tags, chips, icon buttons - are `rounded-full`.

## Shadows

Ink-tinted, restrained elevations:

- `shadow-sm`: default card resting state
- `shadow-lg` / `shadow-xl`: elevated and hover states (used by `.card-hover`)
- `shadow-panel`: layered dropdown/popover shadow
- `shadow-button`: subtle ink-derived ring + drop for the green primary button
- `shadow-inset-top`: inner top highlight that gives dark pills their tactile edge

## Components

UI primitives are shadcn/ui under `components/ui/`; imported shadcn-studio blocks live under `components/shadcn-studio/`; custom sections live in domain folders (`components/app/`, `components/solutions/`, ...). Reuse a studio block first, adapt second, build custom last (AGENTS.md has the full placement policy).

### Buttons (`components/ui/button.tsx`)

- **`variant='dark'`** - the signature CTA: dark ink pill (`bg-surface-dark`), `rounded-full font-semibold`, inset top highlight. Used by the navbar "Sign in", hero primary, and mobile menu CTA. Reserve for the one primary action per surface.
- **`variant='default'`** - Vocdoni green with `shadow-button`; in-page CTAs and forms.
- `outline` / `secondary` / `ghost` - cream surfaces with ink-alpha borders and `accent` hover tints; `link` for inline text actions.
- All buttons press down via `active:scale-[0.96]` (the same feel as the `.press-scale` utility).

### Cards

`components/ui/card.tsx` on `rounded-card` with hairline borders and `shadow-sm`. Interactive cards add `.card-hover` (translate -4px + `shadow-xl`, scoped transitions - never `transition-all`). Feature panels sometimes use soft green/blue tinted washes behind product mocks (see the app/SDK split on the homepage). Product screenshots and photos get `.image-outline`, a 1px inset hairline that follows the border radius.

### Navbar

Full-width sticky glass bar: `bg-background/75 backdrop-blur-[14px]`, hairline bottom border. Logo left; centered links at `text-foreground/65` with 1×12px dividers; dark pill CTA right. Dropdowns are two-part `MenuPanel`s (`components/Navbar.tsx`): a 264px `bg-secondary` intro column with a ~30px serif title, then an item grid (`rounded-[10px] px-3 py-2 hover:bg-accent`, 14px medium titles over 12px faint descriptions). Panel chrome: `rounded-2xl border-border bg-popover shadow-panel`, fading/rising in over ~200ms.

### Hero

Serif headline with a rotating highlighted word in green (`word-rotate`), muted lede, dark-pill primary CTA + secondary, and a "trusted by" logo marquee. To the right, a vertical dashed timeline threads three product mock cards (census → active election → verified results) that demonstrate the product in miniature - real UI states (eligibility chips, participation bars, result charts) rather than decorative illustration.

### Marquees

`components/ui/marquee.tsx` plus the `--animate-marquee-*` keyframes; edges fade via `.mask-gradient-x` (8%/92% stops). Used for client logos and vertical testimonial columns.

## Motion

- **In-view reveals**: `components/ui/motion-preset.tsx` (`MotionPreset`) wraps sections with blur/slide entrances driven by `motion/react`, honoring `useReducedMotion`.
- **Micro-interactions**: `.press-scale` (scale 0.96 on `:active`, 150ms), `.card-hover` lift, `animate-shimmer` for loading accents.
- **Page transitions**: `#page-content` cross-fades over 300ms (`layouts/style.css`).
- **Reduced motion**: a global `prefers-reduced-motion` block collapses all animation and transition durations to ~0. Smooth scrolling is likewise gated behind `no-preference`.
- Transitions are always scoped to named properties - never `transition: all`.

## Code surfaces

Developer-facing code (docs, landing `CodeBlock`) renders in dark `zinc-950` blocks regardless of the cream page - a deliberate "terminal window" contrast. Syntax tokens are highlight.js classes painted by the compact dark theme in `layouts/style.css` (purple keywords, emerald strings, amber types, blue titles), with base text zinc-100 in JetBrains Mono.

## Imagery

- Photography is warm-toned and human (hands, assemblies, real organizations), presented in rounded panels with `.image-outline`.
- Client logos ship as `.webp` in `assets/logos/`, in `_round`, `_bw`, and `_colour` variants for different contexts (marquee, testimonials, case studies).
- Blog images live in `public/blog/images/YYYY/MM/` as `.webp`.
- Illustrations under `components/illustrations/` follow the ink/green/cream palette.

## Accessibility

- Contrast tiers are built into the ink hierarchy - respect them (notably: `text-faint` never at body size).
- Focus visibility: `focus-visible:ring-2 ring-ring` on interactive elements; the global `outline-ring/50` base.
- Full reduced-motion support (see Motion).
- The Hindi locale gets both a Devanagari font fallback and hero-specific sizing so typography holds across scripts.

## Anti-patterns

- Signal yellow on anything larger than a dot
- `text-faint` on body-size copy (contrast failure)
- Hardcoded grays, whites, or hex literals instead of tokens
- Bold-weight display headings, or sans headings where the serif belongs
- Title case, or em dash characters, in copy
- `transition-all`; unscoped animations that ignore reduced motion
- Repeating Tailwind class blobs instead of extracting a variant (see AGENTS.md)
- New version-suffixed component folders (`*V2`, `new-*`, `legacy-*`)

## Where things live

| Concern                         | Location                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| Tokens, base layer, utilities   | `layouts/tailwind.css`                                                                           |
| Resets, hljs theme, hero sizing | `layouts/style.css`                                                                              |
| Fonts                           | `public/fonts/` (`fonts.css` + woff2), synced by `scripts/copy-fonts.mjs`                        |
| UI primitives                   | `components/ui/`                                                                                 |
| Studio blocks                   | `components/shadcn-studio/`                                                                      |
| Shared building blocks          | `components/` root (`Section`, `Container`, `SectionHeader`, `Eyebrow`, `Navbar`, `Footer`, ...) |
| Token quick reference           | `docs/design-system.md`                                                                          |
| Contributor policy              | `AGENTS.md`                                                                                      |
