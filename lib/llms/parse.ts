import type { LlmsDocument, LlmsLink, LlmsSection } from './render'

/**
 * Inverse of `renderLlms`. Lives in `lib/` rather than in the test file so the same
 * parser can back a scheduled external link-check job, and so the tests assert on a
 * structure instead of on substrings.
 */

// `- [title](url): note` - split structurally on the link's closing paren, never on the
// colon, so a note containing a colon survives.
const LINK_RE = /^- \[(.+)\]\(([^)]+)\)(?::\s(.*))?$/

export function parseLlmsTxt(text: string): LlmsDocument {
  const lines = text.split('\n')
  let title = ''
  let summary = ''
  const intro: string[] = []
  const sections: LlmsSection[] = []
  let current: LlmsSection | null = null

  for (const line of lines) {
    if (!line.trim()) continue

    if (line.startsWith('# ')) {
      title = line.slice(2).trim()
      continue
    }
    if (line.startsWith('> ')) {
      summary = line.slice(2).trim()
      continue
    }
    if (line.startsWith('## ')) {
      current = { heading: line.slice(3).trim(), links: [] }
      sections.push(current)
      continue
    }

    const match = LINK_RE.exec(line)
    if (match && current) {
      const link: LlmsLink = { title: match[1], url: match[2] }
      if (match[3]) link.note = match[3]
      current.links.push(link)
      continue
    }

    // Anything else before the first `##` is free-form intro prose.
    if (!current) intro.push(line)
  }

  return { title, summary, intro, sections }
}

/** Every link across every section, in document order. */
export const allLinks = (doc: LlmsDocument): LlmsLink[] => doc.sections.flatMap((s) => s.links)
