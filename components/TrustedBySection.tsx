import { useTranslation } from 'react-i18next'

import logo1 from '@/assets/logos/logo_alhora_bw.webp'
import logo2 from '@/assets/logos/logo_bcn_bw.webp'
import logo5 from '@/assets/logos/logo_bellpuig_bw.webp'
import logo3 from '@/assets/logos/logo_berga_bw.webp'
import logo4 from '@/assets/logos/logo_bisbal_bw.webp'

const logos = [
  { name: 'Sovereign', url: logo1 },
  { name: 'Trust', url: logo2 },
  { name: 'Verifiable', url: logo3 },
  { name: 'Secure', url: logo4 },
  { name: 'Transparent', url: logo5 },
]

export default function TrustedBySection() {
  const { t } = useTranslation()

  return (
    <div className='w-full max-w-full'>
      <p className='text-sm text-muted-foreground mb-4 font-medium'>
        {t('hero.trusted_by', 'Trusted by organizations of all sizes')}
      </p>
      <div className='relative w-full max-w-full overflow-hidden mask-gradient-x'>
        <div className='absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none' />
        <div className='absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none' />
        <div className='flex w-max animate-marquee gap-12 items-center hover:paused'>
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo.url}
              alt={logo.name}
              className='h-10 w-auto object-contain opacity-70 grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 dark:invert'
            />
          ))}
        </div>
      </div>
    </div>
  )
}
