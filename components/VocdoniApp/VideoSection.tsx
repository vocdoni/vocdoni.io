import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/Container'
import CleanYoutubePlayer from '@/components/VocdoniApp/CleanYoutubePlayer'

const VIDEO_ID = 'lEPIjgeHYFs'
const THUMBNAIL_URL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`

export default function VideoSection() {
  const { t } = useTranslation()
  const [playing, setPlaying] = useState(false)

  return (
    <section className="py-20 bg-muted/30">
      <Container>
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t('vocdoni_app.video_section.title', 'See it in action')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t('vocdoni_app.video_section.subtitle', 'Watch how Vocdoni App works')}
          </p>
        </div>

        <div className="mx-auto max-w-3xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-border relative group">
          {playing ? (
            <div className="absolute inset-0 w-full h-full plyr-clean">
              <CleanYoutubePlayer
                videoId={VIDEO_ID}
                title={t('vocdoni_app.video_section.title', 'See it in action')}
                coverUrl={THUMBNAIL_URL}
                coverAlt={t('vocdoni_app.video_section.title', 'See it in action')}
              />
            </div>
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 w-full h-full focus:outline-none"
              aria-label={t('vocdoni_app.video_section.play', 'Play video')}
            >
              <img
                src={THUMBNAIL_URL}
                alt={t('vocdoni_app.video_section.title', 'See it in action')}
                className="w-full h-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <span className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
          )}
        </div>
      </Container>
    </section>
  )
}
