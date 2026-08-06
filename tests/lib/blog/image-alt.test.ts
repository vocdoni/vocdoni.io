import { allBlogSlugs, loadPost } from '@/lib/blog/content'
import { locales } from '@/locales'
import { describe, expect, it } from 'vitest'

// WCAG 1.1.1 requires a text alternative for every informative image. Every blog
// image carries meaning, so none of them may ship with an empty or placeholder alt.
describe('blog image alt text', () => {
  it('gives every rendered image a descriptive alt attribute', () => {
    const offenders: string[] = []
    let images = 0

    for (const locale of locales) {
      for (const slug of allBlogSlugs(true)) {
        const post = loadPost(slug, locale)
        if (!post || post.usedLocale !== locale) continue

        for (const tag of post.html.match(/<img\b[^>]*>/g) ?? []) {
          images++
          const alt = tag.match(/\salt="([^"]*)"/)?.[1] ?? ''
          // 15 characters rules out placeholders such as "image" or "chart".
          if (alt.trim().length < 15) offenders.push(`${locale}/${slug}: ${tag.slice(0, 120)}`)
        }
      }
    }

    expect(images).toBeGreaterThan(0)
    expect(offenders).toEqual([])
  }, 30_000)
})
