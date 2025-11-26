import blueskyIcon from '@/assets/images/social/bluesky.png'
import discordIcon from '@/assets/images/social/discord.png'
import farcasterIcon from '@/assets/images/social/farcaster.png'
import githubIcon from '@/assets/images/social/github.png'
import paragraphIcon from '@/assets/images/social/paragraph.png'
import xIcon from '@/assets/images/social/x.png'
import vocdoniLogo from '@/assets/images/vocdoni.png'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { Link } from '../Link'
import { WhatsAppButton } from '../WhatsAppButton'

export const Footer = () => {
  const { t } = useTranslation()
  return (
    <div
      className={cn(
        'h-viewport w-full flex flex-col justify-end lg:grid lg:grid-cols-1',
        'bg-gradient-to-b from-[#F5F3F0] via-[#E8E6E3] to-[#D8D6D3]'
      )}
    >
      <div className='grid grid-cols-1 lg:grid-cols-2 items-end lg:items-center px-4'>
        <div className='hidden lg:flex items-center gap-6 text-sm md:text-base'>
          <a href='mailto:info@vocdoni.org' className='hover:underline'>
            info@vocdoni.org
          </a>
          <WhatsAppButton className='h-auto py-1.5 text-sm' />
        </div>

        <div className='grid justify-items-center lg:justify-items-end gap-6'>
          <div className='w-fit'>
            <div className='grid grid-cols-2 gap-y-2 gap-x-30 text-sm md:text-base'>
              <Link variant='text' href='/technology'>
                {t('footer.technology', { defaultValue: 'Technology' })}
              </Link>
              <Link variant='text' href='https://developer.vocdoni.io'>
                {t('footer.developers', { defaultValue: 'Developers' })}
              </Link>
              <Link variant='text' href='/services'>
                {t('footer.our_services', { defaultValue: 'Our Services' })}
              </Link>
              <Link variant='text' href='https://davinci.vote'>
                {t('footer.research', { defaultValue: 'Research' })}
              </Link>
              <Link variant='text' href='/product'>
                {t('footer.product', { defaultValue: 'Product' })}
              </Link>
              <Link variant='text' href='https://blog.vocdoni.io'>
                {t('footer.blog', { defaultValue: 'Blog' })}
              </Link>
              <Link variant='text' href='/privacy'>
                {t('footer.privacy_policy', { defaultValue: 'Privacy Policy' })}
              </Link>
              <Link variant='text' href='/terms'>
                {t('footer.terms_conditions', { defaultValue: 'Terms & Conditions' })}
              </Link>
            </div>
          </div>
          <div className='mt-2 flex gap-6'>
            <Link href='https://bsky.app/profile/vocdoni.io'>
              <img src={blueskyIcon} alt='Bluesky' className='h-5 w-5' />
            </Link>
            <Link href='https://x.com/vocdoni'>
              <img src={xIcon} alt='X' className='h-5 w-5' />
            </Link>
            <Link href='https://chat.vocdoni.io'>
              <img src={discordIcon} alt='Discord' className='h-5 w-5' />
            </Link>
            <Link href='https://blog.vocdoni.io'>
              <img src={paragraphIcon} alt='Paragraph' className='h-5 w-5' />
            </Link>
            <Link href='https://farcaster.xyz/vocdoni'>
              <img src={farcasterIcon} alt='Farcaster' className='h-5 w-5' />
            </Link>
            <Link href='https://github.com/vocdoni'>
              <img src={githubIcon} alt='Github' className='h-5 w-5' />
            </Link>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-end px-4'>
        <div aria-hidden className='hidden lg:block pointer-events-none select-none self-center'>
          <img src={vocdoniLogo} alt='Vocdoni' className='h-18 lg:h-90 w-auto max-w-full object-contain' />
        </div>
        <div className='self-center text-center text-xs lg:text-sm text-black/70'>
          {t('footer.copyright', {
            defaultValue: '© {{year}} Vocdoni. All rights reserved.',
            year: new Date().getFullYear(),
          })}
        </div>
      </div>
    </div>
  )
}
