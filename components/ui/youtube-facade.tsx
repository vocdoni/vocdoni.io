import { PlayCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface YoutubeFacadeProps {
  videoId: string
  posterUrl: string
  title: string
  /** Extra CSS classes for the outer wrapper */
  className?: string
  /** autoplay=1 is passed to the iframe src when the facade activates (recommended) */
  autoplay?: boolean
}

/**
 * Builds a youtube-nocookie embed URL for the YouTube facade.
 */
export function buildYoutubeEmbedSrc(videoId: string, autoplay = true) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1${autoplay ? '&autoplay=1' : ''}`
}

/**
 * A lightweight YouTube facade.
 * Renders a poster image + play button on initial load.
 * Swaps to a real <iframe> only when the user clicks play.
 * This avoids loading ~500 KB of YouTube JS on page load.
 */
export function YoutubeFacade({ videoId, posterUrl, title, className = '', autoplay = true }: YoutubeFacadeProps) {
  const { t } = useTranslation()
  const [activated, setActivated] = useState(false)

  const iframeSrc = buildYoutubeEmbedSrc(videoId, autoplay)

  const activate = () => setActivated(true)

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-black aspect-video cursor-pointer group ${className}`}
      onClick={activate}
    >
      {activated ? (
        <iframe
          className='absolute inset-0 w-full h-full'
          src={iframeSrc}
          title={title}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      ) : (
        <>
          <img
            src={posterUrl}
            alt={title}
            className='absolute inset-0 w-full h-full object-cover'
            decoding='async'
            width={1280}
            height={720}
          />
          <div className='absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10' />
          <button
            className='absolute inset-0 flex items-center justify-center'
            aria-label={t('play', 'Play video: {{title}}', { title })}
            onClick={(e) => {
              e.stopPropagation()
              activate()
            }}
          >
            <PlayCircleIcon className='size-16 text-white drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity' />
          </button>
        </>
      )}
    </div>
  )
}
