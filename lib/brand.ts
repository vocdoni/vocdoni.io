/**
 * Removes the trailing brand token from a page title.
 *
 * Titles carry the brand as a suffix (`... | Vocdoni`, and on a few legacy pages
 * `... - Vocdoni`), which is right for a `<title>` but wrong everywhere the title is
 * reused as a name: `WebPage.name`, the last `BreadcrumbList` item, and the link text
 * in the llms.txt indexes, whose own header already says Vocdoni.
 *
 * Lives at the top level, with no imports, because both consumers cannot share a module
 * otherwise: `lib/llms/strings.ts` is pulled into the Vite config bundle and reads
 * `node:fs`, while `lib/seo-head.tsx` renders in React.
 */
export const stripBrandSuffix = (title: string) => title.replace(/\s*[|-]\s*Vocdoni(?:\s+blog)?\s*$/i, '').trim()
