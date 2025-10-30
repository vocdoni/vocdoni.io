import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { MdOutlineWhatsapp } from 'react-icons/md'

interface WhatsAppButtonProps {
  className?: string
  noExpand?: boolean
}

export function WhatsAppButton({ className, noExpand }: WhatsAppButtonProps) {
  const { t } = useTranslation()
  const phoneNumber = WHATSAPP_PHONE_NUMBER.replace(/\D/g, '') // Ensure only digits
  const whatsappUrl = `https://wa.me/${phoneNumber}`

  return (
    <a
      href={whatsappUrl}
      target='_blank'
      rel='noopener noreferrer'
      className={cn(
        'group inline-flex items-center justify-center',
        'h-14 px-4 py-4', // Match xl size from button component
        'bg-[#25D366] hover:bg-[#20BA5A]', // WhatsApp green with hover
        'text-white font-medium',
        'rounded-[calc(var(--radius)-2px)]', // Match hero button border radius
        'transition-all duration-300 ease-in-out',
        className
      )}
    >
      <MdOutlineWhatsapp className='h-6 w-6 shrink-0' />

      {/* Text - hidden by default, expands on hover (hidden completely when noExpand is set) */}
      {!noExpand && (
        <span
          className={cn(
            'max-w-0 overflow-hidden transition-all duration-300',
            'group-hover:max-w-xs group-hover:ml-2',
            'whitespace-nowrap'
          )}
        >
          {t('landing.whatsapp')}
        </span>
      )}
    </a>
  )
}
