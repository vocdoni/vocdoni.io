import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { APITypes } from 'plyr-react'

// plyr accesses `document` at import time, so it must only load client-side.
const LazyPlyr = lazy(async () => {
  await import('plyr/dist/plyr.css')
  const mod = await import('plyr-react')
  return { default: mod.Plyr }
})

type Props = {
  videoId: string
  title?: string
  /** Optional cover image shown until playback has ramped up to HD, masking YouTube's low-quality ABR cold-start. */
  coverUrl?: string
  coverAlt?: string
}

// How long to keep the cover up at most, even if no qualitychange/playing event arrives.
const MAX_COVER_MS = 2500
// Quality (in vertical pixels) considered "good enough" to reveal the player.
const MIN_REVEAL_QUALITY = 720

export default function CleanYoutubePlayer({ videoId, title, coverUrl, coverAlt }: Props) {
  const [mounted, setMounted] = useState(false)
  const [revealed, setRevealed] = useState(!coverUrl)
  const ref = useRef<APITypes>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !coverUrl) return

    let fallback: ReturnType<typeof setTimeout> | null = null
    let cancelled = false

    // Poll briefly for the Plyr instance to become available (lazy import + mount).
    const attach = () => {
      const plyr = ref.current?.plyr
      // The instance exists but has no `.on` until ready; keep polling.
      if (!plyr || typeof (plyr as unknown as { on?: unknown }).on !== 'function') {
        if (!cancelled) setTimeout(attach, 50)
        return
      }

      // Force playback — the user already triggered a gesture by clicking the cover.
      plyr.play()

      const reveal = () => {
        if (cancelled) return
        setRevealed(true)
      }

      // Reveal once quality has ramped up past our threshold…
      plyr.on('qualitychange', (event: unknown) => {
        const detail = (event as { detail?: { quality?: number } }).detail
        const q = detail?.quality ?? 0
        if (q >= MIN_REVEAL_QUALITY) reveal()
      })

      // …or, worst case, once playback has actually started.
      plyr.on('playing', reveal)

      // Hard fallback so the user is never stuck looking at the cover.
      fallback = setTimeout(reveal, MAX_COVER_MS)
    }

    attach()

    return () => {
      cancelled = true
      if (fallback) clearTimeout(fallback)
    }
  }, [mounted, coverUrl])

  if (!mounted) return null

  return (
    <div className='absolute inset-0 w-full h-full'>
      <Suspense fallback={null}>
        <LazyPlyr
          ref={ref}
          source={{
            type: 'video',
            title,
            sources: [{ src: videoId, provider: 'youtube' }],
          }}
          options={{
            autoplay: true,
            controls: ['play-large', 'play', 'progress', 'current-time', 'captions', 'settings', 'fullscreen'],
            settings: ['quality', 'captions', 'speed'],
            captions: { active: true, update: true },
            quality: { default: 1080, options: [1080, 720, 576, 480, 360] },
            youtube: {
              noCookie: true,
              rel: 0,
              modestbranding: 1,
              iv_load_policy: 3,
              playsinline: 1,
              autoplay: 1,
              vq: 'hd1080',
              hd: 1,
            },
          }}
        />
      </Suspense>

      {coverUrl && (
        <div
          aria-hidden='true'
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
            revealed ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img src={coverUrl} alt={coverAlt ?? ''} className='w-full h-full object-cover' />
          <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
            <div className='h-10 w-10 rounded-full border-2 border-white/40 border-t-white animate-spin' />
          </div>
        </div>
      )}
    </div>
  )
}
