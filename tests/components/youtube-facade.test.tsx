import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, fallback?: string) => fallback ?? key,
  }),
}))

const { YoutubeFacade, buildYoutubeEmbedSrc } = await import('@/components/ui/youtube-facade')

describe('YoutubeFacade', () => {
  it('renders a poster image, not an iframe, on initial render', () => {
    const html = renderToStaticMarkup(
      <YoutubeFacade
        videoId='dQw4w9WgXcQ'
        posterUrl='https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        title='Demo video'
      />
    )
    expect(html).not.toContain('<iframe')
    expect(html).toContain('maxresdefault.jpg')
  })

  it('builds a youtube-nocookie embed src with autoplay enabled by default', () => {
    expect(buildYoutubeEmbedSrc('abc123')).toBe(
      'https://www.youtube-nocookie.com/embed/abc123?rel=0&modestbranding=1&autoplay=1'
    )
  })

  it('builds a youtube-nocookie embed src without autoplay when disabled', () => {
    expect(buildYoutubeEmbedSrc('abc123', false)).toBe(
      'https://www.youtube-nocookie.com/embed/abc123?rel=0&modestbranding=1'
    )
  })

  it('renders the video title as an accessible label', () => {
    const html = renderToStaticMarkup(
      <YoutubeFacade
        videoId='dQw4w9WgXcQ'
        posterUrl='https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        title='Demo video'
      />
    )
    expect(html).toContain('Demo video')
  })

  it('renders a play button', () => {
    const html = renderToStaticMarkup(
      <YoutubeFacade
        videoId='dQw4w9WgXcQ'
        posterUrl='https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        title='Demo video'
      />
    )
    expect(html).toContain('button')
  })

  it('does not render an iframe on the initial server render', () => {
    const html = renderToStaticMarkup(
      <YoutubeFacade videoId='abc123' posterUrl='https://i.ytimg.com/vi/abc123/maxresdefault.jpg' title='Test' />
    )
    expect(html).not.toContain('<iframe')
    expect(html).toContain('abc123')
  })
})
