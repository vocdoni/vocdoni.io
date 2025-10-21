import blueskyIcon from '@/assets/images/social/bluesky.png'
import discordIcon from '@/assets/images/social/discord.png'
import farcasterIcon from '@/assets/images/social/farcaster.png'
import githubIcon from '@/assets/images/social/github.png'
import paragraphIcon from '@/assets/images/social/paragraph.png'
import whatsappIcon from '@/assets/images/social/whatsapp.png'
import xIcon from '@/assets/images/social/x.png'
import vocdoniLogo from '@/assets/images/vocdoni.png'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation()
  return (
    <div
      className='
        min-h-screen w-full grid grid-cols-1
        bg-gradient-to-b from-[#F9F7F333] to-[#D1D1D1]
      '
    >
      <div className='grid grid-cols-1 lg:grid-cols-2 items-center px-4'>
        <a href='mailto:info@vocdoni.org' className='hidden lg:block text-sm md:text-base hover:underline'>
          info@vocdoni.org
        </a>

        <div className='grid justify-items-center lg:justify-items-end gap-6'>
          <div className='w-fit'>
            <div className='grid grid-cols-2 gap-y-2 gap-x-30 text-sm md:text-base'>
              <a className='w-fit'>{t('footer.technology', { defaultValue: 'Technology' })} ↗</a>
              <a className='w-fit'>{t('footer.resources', { defaultValue: 'Resources' })} ↗</a>
              <a className='w-fit'>{t('footer.our_services', { defaultValue: 'Our Services' })} ↗</a>
              <a className='w-fit'>{t('footer.research', { defaultValue: 'Research' })} ↗</a>
              <a className='w-fit'>{t('footer.product', { defaultValue: 'Product' })} ↗</a>
              <a className='w-fit'>{t('footer.blog', { defaultValue: 'Blog' })} ↗</a>
            </div>
          </div>
          <div className='mt-2 flex gap-6'>
            <a href='https://bsky.app/profile/vocdoni.io' target='_blank' rel='noopener noreferrer'>
              <img src={blueskyIcon} alt='Bluesky' className='h-5 w-5' />
            </a>
            <a href='https://x.com/vocdoni' target='_blank' rel='noopener noreferrer'>
              <img src={xIcon} alt='X' className='h-5 w-5' />
            </a>
            <a href='#' target='_blank' rel='noopener noreferrer'>
              <img src={whatsappIcon} alt='WhatsApp' className='h-5 w-5' />
            </a>
            <a href='https://discord.com/invite/vocdoni' target='_blank' rel='noopener noreferrer'>
              <img src={discordIcon} alt='Discord' className='h-5 w-5' />
            </a>
            <a href='https://blog.vocdoni.io' target='_blank' rel='noopener noreferrer'>
              <img src={paragraphIcon} alt='Paragraph' className='h-5 w-5' />
            </a>
            <a href='https://farcaster.xyz/vocdoni' target='_blank' rel='noopener noreferrer'>
              <img src={farcasterIcon} alt='Farcaster' className='h-5 w-5' />
            </a>
            <a href='https://github.com/vocdoni' target='_blank' rel='noopener noreferrer'>
              <img src={githubIcon} alt='Github' className='h-5 w-5' />
            </a>
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-end px-4'>
        <div aria-hidden className='pointer-events-none select-none self-center'>
          <img src={vocdoniLogo} alt='Vocdoni' className='h-18 lg:h-90 w-auto' />
        </div>
        <div className='self-start text-xs lg:text-sm text-black/70'>
          {t('footer.copyright', {
            defaultValue: '© {{year}} Vocdoni. All rights reserved.',
            year: new Date().getFullYear(),
          })}
        </div>
      </div>
    </div>
  )
}
