// Shared styling for the hover-reveal "¶" permalink shown on doc section
// headings. Used by both the rehype pipeline (markdown h2/h3, see markdown.ts)
// and the frontmatter-driven DocReference heading, so the two stay identical.
//
// The heading itself carries `group`; the anchor is transparent until the
// heading is hovered or the link is keyboard-focused. It always occupies its
// space (opacity, not display) so revealing it never reflows the title.

export const HEADING_ANCHOR_LABEL = 'Permalink to this section'

// Kept in a const so the i18next extractor does not mistake the local `t()`
// text-node helper in markdown.ts for a react-i18next translation call.
export const PILCROW = '¶'

// `group` goes on the heading element that owns the anchor.
export const HEADING_GROUP_CLASS = 'group'

export const HEADING_ANCHOR_CLASS =
  'heading-anchor ml-2 align-top text-[0.8em] font-normal text-muted-foreground/50 no-underline ' +
  'opacity-0 transition-opacity duration-150 group-hover:opacity-100 hover:text-primary focus:opacity-100'
