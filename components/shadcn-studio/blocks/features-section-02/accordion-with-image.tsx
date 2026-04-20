import { useState } from 'react'
import { UsersIcon, ClipboardListIcon, SendIcon, ZapIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MotionPreset } from '@/components/ui/motion-preset'
import memberbaseImg from '@/assets/images/app/memberbase.webp'
import createVoteImg from '@/assets/images/app/create_vote.webp'
import publicVoteImg from '@/assets/images/app/public_vote.webp'

const featureData = [
  {
    id: 'upload',
    icon: UsersIcon,
    titleKey: 'steps_section.steps.upload.title',
    titleDefault: '1. Upload your member base',
    descriptionKey: 'steps_section.steps.upload.description',
    descriptionDefault:
      'Import your voter list from a spreadsheet in seconds. Every member automatically receives a unique, private access link - no account or app required on their end.',
    image: memberbaseImg,
    imageAlt: 'Upload member base',
  },
  {
    id: 'create',
    icon: ClipboardListIcon,
    titleKey: 'steps_section.steps.create.title',
    titleDefault: '2. Create the voting process',
    descriptionKey: 'steps_section.steps.create.description',
    descriptionDefault:
      'Choose your voting method, write your question, and set start and end dates. Your ballot is configured and ready to go in under five minutes.',
    image: createVoteImg,
    imageAlt: 'Create voting process',
  },
  {
    id: 'share',
    icon: SendIcon,
    titleKey: 'steps_section.steps.share.title',
    titleDefault: '3. Share the link, collect votes',
    descriptionKey: 'steps_section.steps.share.description',
    descriptionDefault:
      'Send the voting link by email. Members vote from any device in seconds. Results are published instantly when voting closes - anyone can verify the count is correct.',
    image: publicVoteImg,
    imageAlt: 'Share and vote',
  },
]

const AccordionWithImage = () => {
  const { t } = useTranslation()
  const [activeAccordion, setActiveAccordion] = useState('upload')

  const activeFeature = featureData.find((f) => f.id === activeAccordion) ?? featureData[0]

  return (
    <MotionPreset fade blur slide={{ direction: 'down', offset: 50 }} delay={0.6} transition={{ duration: 0.5 }}>
      <div className='grid gap-12 lg:grid-cols-2 lg:gap-20'>
        <div className='space-y-6'>
          <div className='space-y-2'>
            <div className='flex items-center gap-4'>
              <Avatar className='size-10 rounded-lg'>
                <AvatarFallback className='bg-muted text-card-foreground rounded-lg'>
                  <ZapIcon className='size-5' />
                </AvatarFallback>
              </Avatar>
              <p className='text-sm font-medium text-muted-foreground'>
                {t('steps_section.label', 'Setup a vote in under 10 minutes')}
              </p>
            </div>
            <h3 className='text-2xl font-semibold'>
              {t('steps_section.panel_title', 'From spreadsheet to live election in minutes')}
            </h3>
            <p className='text-muted-foreground'>
              {t('steps_section.panel_description', 'Vocdoni handles the security. You handle the questions.')}
            </p>
          </div>

          <Accordion
            type='single'
            collapsible
            className='w-full space-y-2'
            value={activeAccordion}
            onValueChange={setActiveAccordion}
          >
            {featureData.map((item) => (
              <AccordionItem key={item.id} value={item.id} className='rounded-md border!'>
                <AccordionTrigger className='px-5'>
                  <span className='flex items-center gap-4'>
                    <item.icon className='size-4 shrink-0' />
                    <span className='text-base'>{t(item.titleKey, item.titleDefault)}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className='text-muted-foreground px-5 text-base'>
                  {t(item.descriptionKey, item.descriptionDefault)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Image */}
        <div className='bg-primary/10 relative mt-auto overflow-hidden rounded-lg px-6 pt-14 max-lg:shrink-0'>
          <MotionPreset key={activeFeature.id} fade slide={{ direction: 'down' }} transition={{ duration: 0.7 }}>
            <img src={activeFeature.image} alt={activeFeature.imageAlt} className='w-full rounded-t-xl object-cover' loading='lazy' />
          </MotionPreset>
        </div>
      </div>
    </MotionPreset>
  )
}

export default AccordionWithImage
