import { allBlogSlugs, getCategory, listCategories, listPosts, loadPost } from '@/lib/blog/content'
import { describe, expect, it } from 'vitest'

// Integration test over the committed content/blog files.
describe('blog content loader', () => {
  it('lists published posts newest-first', () => {
    const posts = listPosts('en', { includeDrafts: false })
    expect(posts.length).toBeGreaterThan(5)
    for (let i = 1; i < posts.length; i++) {
      expect(posts[i - 1].frontmatter.publishedDate >= posts[i].frontmatter.publishedDate).toBe(true)
    }
  })

  it('excludes drafts by default in the published listing', () => {
    const slugs = listPosts('en', { includeDrafts: false }).map((post) => post.slug)
    expect(slugs).not.toContain('canadas-online-voting-standard-what-can-dgsi-111-requires-and-why-it-matters')
  })

  it('serves each locale its own translation when available', () => {
    // Originally a Catalan-only post used to exercise the fallback path; the blog
    // is now fully translated, so every locale must resolve to its own source.
    const post = loadPost('consulta-docents-sindicats-2026', 'en')
    expect(post).not.toBeNull()
    expect(post!.usedLocale).toBe('en')
    expect(post!.availableLocales).toContain('ca')
    expect(post!.availableLocales).toContain('en')
    expect(post!.availableLocales).toContain('hi')
    expect(post!.availableLocales.length).toBeGreaterThanOrEqual(11)
    expect(post!.html.length).toBeGreaterThan(0)

    const caPost = loadPost('consulta-docents-sindicats-2026', 'ca')
    expect(caPost!.usedLocale).toBe('ca')
  })

  it('compiles English posts with a resolved cover image', () => {
    const post = loadPost('introducing-ni-dkg', 'en')
    expect(post).not.toBeNull()
    expect(post!.usedLocale).toBe('en')
    expect(post!.frontmatter.coverImage).toMatch(/^\/blog\/images\//)
    expect(post!.html).toContain('<')
  })

  it('surfaces categories with counts and known slugs', () => {
    const categories = listCategories('en')
    const slugs = categories.map((category) => category.slug)
    expect(slugs).toContain('success-stories')
    expect(categories.every((category) => category.count > 0)).toBe(true)
  })

  it('localizes category display names per locale', () => {
    expect(getCategory('success-stories', 'en').name).toBe('Success stories')
    expect(getCategory('success-stories', 'es').name).toBe('Casos de éxito')
  })

  it('falls back to the slug for categories without a localized name', () => {
    // Unknown slug has no locale entry and no English default: the slug itself is
    // the ultimate fallback (see lib/blog/category-names.ts).
    expect(getCategory('__missing__', 'es').name).toBe('__missing__')
  })

  it('enumerates every published slug for prerendering', () => {
    const slugs = allBlogSlugs(false)
    expect(slugs).toContain('introducing-ni-dkg')
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
