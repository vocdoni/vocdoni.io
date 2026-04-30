import { YoutubeFacade } from '@/components/ui/youtube-facade'

type Props = {
  videoId: string
  title?: string
  /** Optional poster image URL. Falls back to the YouTube maxresdefault thumbnail. */
  coverUrl?: string
  /** Unused — kept for backward-compat; the facade derives its own alt from title */
  coverAlt?: string
}

/**
 * A clean YouTube embed that defers iframe creation until user interaction.
 * Wraps YoutubeFacade with sensible defaults for poster image derivation.
 */
export default function CleanYoutubePlayer({ videoId, title, coverUrl }: Props) {
  const posterUrl = coverUrl || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <YoutubeFacade
      videoId={videoId}
      posterUrl={posterUrl}
      title={title || 'Video'}
      className='absolute inset-0 rounded-none'
    />
  )
}
