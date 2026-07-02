import { cn } from '@/lib/utils'
import { Check, Link2, Linkedin, Twitter } from 'lucide-react'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

interface ShareButtonsProps {
  title: string
  className?: string
}

const iconButton =
  'inline-flex size-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary'

// Social sharing for a post. Uses the live page URL at click time, so it works on
// prerendered pages without needing the absolute URL at build time.
export function ShareButtons({ title, className }: ShareButtonsProps) {
  const { t } = useTranslation()
  const [copied, setCopied] = React.useState(false)

  const currentUrl = () => (typeof window === 'undefined' ? '' : window.location.href)

  const openShare = (url: string) => {
    if (typeof window !== 'undefined') window.open(url, '_blank', 'noopener,noreferrer')
  }

  const shareX = () => {
    const url = encodeURIComponent(currentUrl())
    const text = encodeURIComponent(title)
    openShare(`https://twitter.com/intent/tweet?url=${url}&text=${text}`)
  }
  const shareLinkedIn = () => {
    const url = encodeURIComponent(currentUrl())
    openShare(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`)
  }
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl())
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className='mr-1 text-sm font-medium text-muted-foreground'>{t('blog.share', 'Share')}</span>
      <button type='button' onClick={shareX} aria-label={t('blog.share_on_x', 'Share on X')} className={iconButton}>
        <Twitter className='size-4' />
      </button>
      <button
        type='button'
        onClick={shareLinkedIn}
        aria-label={t('blog.share_on_linkedin', 'Share on LinkedIn')}
        className={iconButton}
      >
        <Linkedin className='size-4' />
      </button>
      <button
        type='button'
        onClick={copyLink}
        aria-label={copied ? t('blog.copied', 'Copied') : t('blog.copy_link', 'Copy link')}
        className={cn(iconButton, copied && 'border-primary/40 text-primary')}
      >
        {copied ? <Check className='size-4' /> : <Link2 className='size-4' />}
      </button>
    </div>
  )
}
