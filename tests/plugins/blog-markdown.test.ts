import { describe, expect, it } from 'vitest'

import { matchRawBlogRequest, outputPathFor, processPost } from '@/plugins/blog-markdown'

describe('processPost', () => {
  it('strips frontmatter and prepends the title as an H1', () => {
    const source = `---\ntitle: Hello world\ndraft: false\n---\nBody paragraph.\n`
    const out = processPost(source)
    expect(out).not.toContain('title: Hello world')
    expect(out.startsWith('# Hello world\n\n')).toBe(true)
    expect(out).toContain('Body paragraph.')
  })

  it('leaves the body intact when there is no title', () => {
    expect(processPost('Just a body.')).toBe('Just a body.')
  })
})

describe('outputPathFor', () => {
  it('mirrors the post route + .md', () => {
    expect(outputPathFor('en', 'my-post')).toBe('en/blog/my-post.md')
    expect(outputPathFor('es', 'otro-post')).toBe('es/blog/otro-post.md')
  })
})

describe('matchRawBlogRequest', () => {
  it('matches a localized post request', () => {
    expect(matchRawBlogRequest('/en/blog/my-post.md')).toEqual({ locale: 'en', slug: 'my-post' })
    expect(matchRawBlogRequest('/es/blog/otro-post.md?x=1')).toEqual({ locale: 'es', slug: 'otro-post' })
  })

  it('returns null for non-post, category or non-md requests', () => {
    expect(matchRawBlogRequest('/en/blog/my-post')).toBeNull()
    expect(matchRawBlogRequest('/en/blog/category/news.md')).toBeNull()
    expect(matchRawBlogRequest('/en/developers/docs/quickstart.md')).toBeNull()
  })

  it('rejects path traversal', () => {
    expect(matchRawBlogRequest('/en/blog/../../etc/passwd.md')).toBeNull()
  })
})
