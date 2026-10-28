# Vocdoni brand

Who Vocdoni is, how it sounds, and how its logo, colors and type are used, on the site and anywhere else (slides, social
posts, partner pages). How the site applies all this, token by token, is in [`DESIGN.md`](DESIGN.md); this file is the
part that holds outside the codebase too.

## Name and positioning

- **Vocdoni** is always written with a capital V in running text, and never translated, abbreviated or split. The logo
  wordmark is all lowercase (`vocdoni`); text never imitates it.
- Vocdoni provides open-source online voting software for associations and organizations, plus managed election
  services. It started in 2018; the legal operator is Synergize S.L.
- Tagline: "Secure digital voting you can trust" (the default page title is "Vocdoni - secure digital voting you can
  trust"). The product promise on the homepage: "Run secure, verifiable elections for your organization".
- Products are named by what they are, in sentence case: "Vocdoni app" (the voting platform; some older copy still says
  "Vocdoni App"), "SDK & API" (for developers), "Decidim Secure Elections" (the Decidim integration). The underlying
  protocol is DAVINCI ([davinci.vote](https://davinci.vote)).
- Official profiles: [GitHub](https://github.com/vocdoni), [X](https://x.com/vocdoni),
  [LinkedIn](https://www.linkedin.com/company/vocdoni), plus Bluesky, Discord and [Telegram](https://t.me/vocdoni)
  (linked from the footer).

## Voice

Secure digital voting is serious and trust-critical, but Vocdoni speaks like a calm, competent person, not a vendor.

- **Plain and concrete.** Say what happens to the voter or the organizer ("members vote from their phone, results are
  verifiable") rather than how impressive the technology is.
- **Confident, not loud.** No superlatives or hype words, and exclamation marks only in quoted testimonials or a UI
  success message. Let verifiability, privacy and track record carry the claim.
- **Human.** Address organizations and their members directly; show real organizations and real assemblies.
- **Sentence case everywhere**, including headings, buttons and menus. Only the first word, proper nouns, acronyms
  (GDPR, SDK) and "Vocdoni" are capitalized.
- **No em dash character.** Use a spaced hyphen (`-`) or restructure the sentence.
- Copy ships in every locale the site serves; nothing is written for English only (see [`docs/i18n.md`](docs/i18n.md)).
  The one exception is the default share card (see Imagery), a single image for every locale.

## Logo

The logo is a **mark** (a wide chevron, the ballot box, with a slanted block dropping into it, the ballot) next to the
lowercase geometric **wordmark** `vocdoni`. Both are flat, single-color shapes: no gradients, outlines, shadows or
effects. The ballot leans to the right (its top edge rises to the right).

`components/Logo.tsx` is the source of truth: the `public/images` SVGs carry its exact paths, and every other logo file
must match it. The previous logo, with a mirrored ballot leaning left and a lighter, narrower wordmark, is retired. If
you find it in an old file or image, replace it with the current one, never copy it.

| Version           | Source                                          | Use                                                                                                                  |
| ----------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Horizontal lockup | `components/Logo.tsx` (`VocdoniLogo`)           | Default. Site navbar (at `xl`), mobile menu and footer                                                               |
| Mark only         | `VocdoniLogo minimal`                           | Tight spaces: the navbar below `xl`                                                                                  |
| Lockup, light ink | `public/images/vocdoni_logotype_full_blank.svg` | Transparent background, white fill: dark surfaces, blog covers, the ARD logo URL                                     |
| Lockup on a panel | `public/images/vocdoni_logotype_full_white.svg` | White logo on its own dark ink `#1f1f18` rectangle, for places that cannot set a background (README dark/light swap) |
| Wordmark only     | `assets/images/vocdoni.webp`                    | Black wordmark, 2762x557 px. The schema.org organization logo                                                        |
| Favicon           | `assets/favicon.ico`                            | The mark, black on a white disc, 16, 32 and 48 px                                                                    |
| Share card        | `assets/images/og-default.png`                  | Default `og:image`, 1200x630: ink lockup, the tagline and a results card on cream. Rendered from `scripts/og-image/` |

Despite their names, both `public/images` files are **white** logos: `_blank` has no background, `_white` carries a
dark one.

### Rules

- **One color.** On light surfaces the logo is dark: the warm ink (`--foreground`, `#202019`) on the site and the share
  card, black in `vocdoni.webp` and the favicon. On dark surfaces it is cream or white. `VocdoniLogo` inherits
  `currentColor`, so set the color through the text color, never by editing the paths. Never Vocdoni green, signal
  yellow, or two colors at once.
- **Keep the geometry.** Do not stretch, rotate, re-letter the wordmark, swap the mark and wordmark, or set "vocdoni" in
  another typeface as a stand-in for the logo.
- **Size.** The site sets the lockup at 34-40px high (`h-7`/`h-8`, on this project's custom spacing scale). When the
  lockup would get much narrower than that, use the mark alone instead of shrinking the wordmark.
- **Room.** Keep clear space around the logo of at least the height of the mark's falling block, and do not place it on
  busy photography without a solid or darkened backdrop (the blog covers dim the photo first).
- **Partner and client logos** sit next to Vocdoni's only in a `vocdoni × partner` lockup, as on the blog covers, with
  the partner's own disc and colors untouched. Elsewhere (logo marquees, case studies) they appear on their own.

### Not the Vocdoni logo

`components/illustrations/logo.tsx` (and its copy in `assets/svg/logo.tsx`) is a different round black mark with white
strokes. The site uses it only inside the drawn Vocdoni app screens (`components/solutions/mockups/`), as part of
reproducing the product's UI. Do not use it to represent Vocdoni as a brand.

## Color

The brand palette is small and warm. OKLCH values are the source of truth (`layouts/tailwind.css`); the hex values are
sRGB conversions for tools that cannot take OKLCH.

| Role          | OKLCH                    | Hex       | Use                                                    |
| ------------- | ------------------------ | --------- | ------------------------------------------------------ |
| Cream         | `oklch(0.988 0.011 97)`  | `#fdfbf3` | The page. Vocdoni surfaces are cream, never pure white |
| Cream, deeper | `oklch(0.936 0.033 97)`  | `#f0ead2` | Alternate bands and panels                             |
| Ink           | `oklch(0.24 0.013 106)`  | `#202019` | Text, the logo, lines (as alphas of the same ink)      |
| Dark ink      | `oklch(0.235 0.012 107)` | `#1f1f18` | The signature dark pill CTA and dark panels            |
| Vocdoni green | `oklch(0.47 0.085 158)`  | `#296948` | The brand accent: links, icons, chips, in-page CTAs    |
| Signal yellow | `oklch(0.93 0.11 102)`   | `#f6eb93` | Punctuation only: the dot before a section label       |

On dark backgrounds the green lightens to `oklch(0.62 0.09 158)` (`#539771`). The background is
`oklch(0.22 0.012 106)` (`#1b1b15`) in the site's dark palette and a deeper `oklch(0.17 0.012 106)` (`#10100a`) on
the blog covers.

Green carries meaning, so keep it scarce: a page is mostly cream and ink. Yellow is never a surface, a button or text.
Grays, pure white and pure black do not appear on the site's surfaces.

## Typography

| Role             | Typeface                  | Notes                                                               |
| ---------------- | ------------------------- | ------------------------------------------------------------------- |
| Display headings | Fraunces (variable)       | Weight 400 only, `SOFT` 100, `WONK` 0, tight tracking. Never bolded |
| Body and UI      | Hanken Grotesk (variable) | Medium and semibold for labels and buttons                          |
| Code             | JetBrains Mono (variable) | Developer docs and code blocks                                      |

All three are open fonts, self-hosted under `public/fonts/`. The soft, single-weight Fraunces headline over a quiet
grotesk is the most recognizable part of the brand after the logo; use the same pairing in slides and social images.

## Graphic elements

- **The eyebrow.** A small signal-yellow dot followed by an uppercase, letter-spaced label opens every section, then the
  serif heading, then a muted lede. Reuse it for slide and post headers.
- **Shapes.** Soft rounded panels (16-20px radius), pill buttons, hairline borders, restrained ink-tinted shadows.
- **Product over illustration.** Show real product states (eligibility, participation, verified results) rather than
  abstract graphics; drawn product screens must match what the product actually displays.

## Imagery

- Photography is warm-toned and human: hands, assemblies, real organizations voting.
- Images sit in rounded panels with a hairline outline.
- Blog covers are rendered from the `scripts/blog-cover/` template (dark ink background, cream Fraunces title, green
  accents, white logo), never made by hand. A page with no image of its own shares `assets/images/og-default.png`,
  rendered from `scripts/og-image/` (`scripts/og-image/render.sh`); edit the template and re-render, never the PNG.
