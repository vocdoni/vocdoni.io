import { allBlogSlugs, listCategories, listPosts, loadPost } from '@/lib/blog/content'
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

  it('falls back to the original language when a translation is missing', () => {
    // This post exists only in Catalan; requesting English must serve the ca source.
    const post = loadPost('consulta-docents-sindicats-2026', 'en')
    expect(post).not.toBeNull()
    expect(post!.usedLocale).toBe('ca')
    expect(post!.availableLocales).toEqual(['ca'])
    expect(post!.html.length).toBeGreaterThan(0)
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

  it('enumerates every published slug for prerendering', () => {
    const slugs = allBlogSlugs(false)
    expect(slugs).toContain('introducing-ni-dkg')
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})
