import { stripSlash } from './routes'

/**
 * llmstxt.org emitter. The format is: an H1, a single blockquote summary, zero or
 * more free-form prose paragraphs, then `##` sections of annotated links.
 *
 * Pulled into the Vite config bundle - relative imports only, see lib/llms/routes.ts.
 */

export interface LlmsLink {
  title: string
  /** Absolute (`https://...`) or root-relative (`/en/app`); relative URLs are resolved against `hostname`. */
  url: string
  note?: string
}

export interface LlmsSection {
  heading: string
  links: LlmsLink[]
}

export interface LlmsDocument {
  title: string
  summary: string
  /** Free-form paragraphs between the blockquote and the first `##`. Allowed by the spec. */
  intro: string[]
  sections: LlmsSection[]
}

export const absoluteUrl = (hostname: string, url: string) =>
  url.startsWith('http') ? url : `${stripSlash(hostname)}${url}`

export function renderLlms(doc: LlmsDocument, hostname: string): string {
  const lines: string[] = [`# ${doc.title}`, '', `> ${doc.summary}`, '']

  for (const paragraph of doc.intro) lines.push(paragraph, '')

  for (const section of doc.sections) {
    if (!section.links.length) continue
    lines.push(`## ${section.heading}`, '')
    for (const { title, url, note } of section.links) {
      lines.push(`- [${title}](${absoluteUrl(hostname, url)})${note ? `: ${note}` : ''}`)
    }
    lines.push('')
  }

  return lines.join('\n')
}
