import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Textarea } from '../ui/textarea'

export function Contact() {
  const { t } = useTranslation()
  return (
    <div className='min-h-screen w-full grid grid-cols-1 lg:grid-cols-2'>
      {/* Contact Overview */}
      <div className='flex-1 bg-background flex flex-col items-center justify-center'>
        <div className='w-full px-6 flex flex-col gap-6'>
          <p className='text-lg font-medium mb-6'>
            → {t('contact.want_to_talk', { defaultValue: 'Want to talk with us?' })}
          </p>
          <h2 className='text-[clamp(2rem,6vw,3.8rem)] leading-tight font-semibold max-w-[22ch]'>
            {t('contact.description', { defaultValue: 'Let’s Build the Future of Governance' })}
          </h2>
        </div>
      </div>

      {/* Contact Form */}
      <div className='flex-1 bg-background flex flex-col justify-center px-6'>
        <form className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
          <Input
            required
            placeholder={t('contact.name_placeholder', { defaultValue: 'Name' })}
            className='h-11 bg-[#ECEEF2] border-0 placeholder:text-foreground/70 text-sm'
          />
          <Input
            placeholder={t('contact.company_placeholder', { defaultValue: 'Company' })}
            className='h-11 bg-[#ECEEF2] border-0 placeholder:text-foreground/70 text-sm'
          />
          <Input
            type='email'
            required
            placeholder={t('contact.email_placeholder', { defaultValue: 'Email' })}
            className='lg:col-span-2 h-11 bg-[#ECEEF2] border-0 placeholder:text-foreground/70 text-sm'
          />
          <Textarea
            placeholder={t('contact.message_placeholder', { defaultValue: 'Message' })}
            className='lg:col-span-2 min-h-40 bg-[#ECEEF2] border-0 placeholder:text-foreground/70 text-sm resize-y'
          />

          <p className='lg:col-span-2 text-xs'>
            {t('contact.disclaimer', {
              defaultValue: 'By clicking the “Submit” button, you agree to the privacy policy.',
            })}
          </p>

          <div className='lg:col-span-2 mt-4'>
            <Button
              type='submit'
              size='sm'
              className='px-3 bg-[#D7C2A6] text-foreground hover:opacity-90 border border-black/10'
            >
              {t('contact.submit_button', { defaultValue: 'Submit' })}
              <ArrowUpRight className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
