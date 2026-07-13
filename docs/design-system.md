# Vocdoni design system

The visual language of vocdoni.io: a warm, editorial aesthetic built on cream surfaces, a warm ink with an alpha-based text hierarchy, a deep green brand accent, and a single-weight display serif for headings. All tokens live in `layouts/tailwind.css` (Tailwind v4, CSS-first via `@theme`); components consume them through the standard utility classes, so palette changes never require component edits.

## Color tokens

All colors are OKLCH. Light values shown; `.dark` mirrors the same recipe (the dark palette is kept coherent but there is currently no theme toggle).

| Token | Value | Intent |
| --- | --- | --- |
| `--background` | `oklch(0.988 0.011 97)` | Warm cream body and card surfaces |
| `--foreground` | `oklch(0.24 0.013 106)` | Warm ink, all primary text |
| `--secondary` | `oklch(0.962 0.022 97)` | Tinted cream panels (e.g. dropdown intro columns) |
| `--muted` | `oklch(0.936 0.033 97)` | Deeper cream for alternate section backgrounds |
| `--muted-foreground` | ink at 64% | Secondary text (4.9:1 on cream - AA at body sizes) |
| `--faint` | ink at 55% | Uppercase labels and meta ONLY (3.7:1) - never body copy |
| `--accent` | ink at 7% | Hover tint fills (menu items, ghost buttons) |
| `--primary` | `oklch(0.47 0.085 158)` | Vocdoni green: links, icons, chips, in-page CTAs |
| `--signal` | `oklch(0.93 0.11 102)` | Butter yellow. Eyebrow/status dots ONLY, never surfaces |
| `--surface-dark` | `oklch(0.235 0.012 107)` | Dark ink pills (top-level CTAs) |
| `--border` / `--input` | ink at 10% | Hairlines on any cream surface |
| `--ring` | same as primary | Focus rings |

### Ink alpha hierarchy

Text on cream uses the foreground ink at fixed alpha tiers rather than separate grays:

- **100%** (`text-foreground`): headings, primary copy (15.8:1)
- **64%** (`text-muted-foreground`): ledes, descriptions, item descriptions (4.9:1, AA)
- **55%** (`text-faint`): uppercase labels, group headers, meta (3.7:1). Decorative labels only - never body copy
- **10%** (`border-border`): hairline borders; **7%** (`bg-accent`): hover fills

Primary green on cream is 6.3:1 (AA).

## Typography

- **Body**: Inter (`--font-sans`), self-hosted via `scripts/copy-fonts.mjs`.
- **Headings**: Instrument Serif (`--font-serif`), single 400 weight. The base layer gives every `h1-h6` `font-weight: 400`, `letter-spacing: -0.02em`, `line-height: 1.05`. Sizes are set per component; because the serif sets optically small, headings typically run one Tailwind step larger than they would in a sans design (section h2: `text-4xl sm:text-5xl`; hero h1 up to `xl:text-[4.75rem] leading-[0.95]`).
- **Labels/eyebrows**: sans, `text-sm font-medium uppercase tracking-[0.11em]`; group labels inside panels are `text-[11px] font-semibold uppercase tracking-wider text-faint`.
- **CTAs**: sans semibold, 14-16px.

Do not put `font-bold`/`font-black` on headings; the display serif is designed for its single weight.

## The eyebrow pattern

Every section opener starts with an eyebrow: an 8px signal-yellow dot followed by an uppercase label, then the display heading, then a muted lede.

- Use `components/SectionHeader.tsx` (eyebrow + heading + lede, `align='center' | 'left'`).
- For a standalone label use `components/Eyebrow.tsx` or the `.eyebrow` / `.eyebrow-dot` classes; `.eyebrow-dot-halo` adds the soft ring.
- The signal yellow exists only for these dots and tiny status indicators. Never use it as a background, button, or large surface.

## Radius scale

`--radius: 1rem` (16px) is the panel radius. Derived: `rounded-sm` 10px, `rounded-md` 12px, `rounded-lg` 16px, `rounded-xl` 20px, plus `rounded-card` (20px) for Card surfaces. Pills (buttons, tags, inputs where appropriate) are `rounded-full`.

## Shadows

- `shadow-sm` `0 1px 2px / 8%`: default card resting state
- `shadow-lg` `0 4px 14px / 16%`: elevated / hover (used by `.card-hover`)
- `shadow-panel`: layered dropdown/popover shadow (`0 12px 32px -8px` + `0 2px 6px -2px`, ink-tinted)
- `shadow-inset-top`: inner top highlight for dark pills
- `shadow-button`: subtle ink-derived ring + drop for the green primary button

## Buttons

- **`variant='dark'`**: the signature top-level CTA - dark ink pill, `rounded-full font-semibold`, inset top highlight. Used by the navbar CTA, hero primary, and mobile menu CTA. Reserve it for the one primary action per surface.
- **`variant='default'`** (green): in-page CTAs and forms.
- `outline` / `secondary` / `ghost`: cream surfaces with ink-alpha borders and `accent` hover tints.

## Navbar anatomy

Full-width sticky glass bar: `bg-background/75 backdrop-blur-[14px]`, hairline bottom border, content capped at `max-w-[1408px]`. Logo left; centered links at `text-foreground/65` separated by 1px x 12px dividers; dark pill CTA right.

Dropdowns are two-part `MenuPanel`s (see `components/Navbar.tsx`):

1. **Intro column**: 264px, `bg-secondary`, display-serif ~30px title + 13.5px muted description. Introduces the group editorially.
2. **Items**: `min-w-[316px] p-3.5`; each item is `rounded-[10px] px-3 py-2 hover:bg-accent` with a 14px medium title and a 12px `text-foreground/55` description; 2-column grid when a group has many entries; optional hairline-topped footer row for "view all" links.

The panel itself: `rounded-2xl border border-border bg-popover shadow-panel`, fading and rising in over ~200ms.

## Section rhythm

Generous vertical padding via the semantic spacing tokens (`py-section` / `sm:py-section-md` / `lg:py-section-lg` through `components/Section.tsx`). Sections alternate `bg-background` and `bg-muted`. Marquees fade at the edges with `.mask-gradient-x` (8%/92% stops).

## Anti-patterns

- Signal yellow on anything larger than a dot
- `text-faint` on body-size copy (contrast failure)
- Hardcoded grays/whites (`text-gray-*`, `bg-white`, hex literals) instead of tokens
- Bold-weight display headings
- New version-suffixed component folders (see AGENTS.md)
