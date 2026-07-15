import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, Database, FileCheck, Hash, ShieldCheck } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useTranslation } from 'react-i18next'

const avatars = [
  {
    src: '/images/avatars/avatar-3.png',
    fallback: 'OS',
    name: 'Olivia Sparks',
  },
  {
    src: '/images/avatars/avatar-6.png',
    fallback: 'HL',
    name: 'Howard Lloyd',
  },
  {
    src: '/images/avatars/avatar-5.png',
    fallback: 'HR',
    name: 'Hallie Richards',
  },
]

export const CensusCard = () => {
  const { t } = useTranslation()
  return (
    <Card className='shadow-lg border-muted/40 backdrop-blur-sm bg-card/95 w-full'>
      <CardHeader className='pb-3 p-4'>
        <div className='flex items-center justify-between'>
          <Badge variant='secondary' className='text-[11px] h-5'>
            {t('hero_cards.step1')}
          </Badge>
          <Database className='h-4 w-4 text-muted-foreground' />
        </div>
        <CardTitle className='text-[15px]'>{t('hero_cards.census_creation')}</CardTitle>
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        <div className='space-y-2'>
          <div className='rounded-md border bg-muted/30 p-2'>
            <div className='text-[11px] font-medium text-muted-foreground mb-1.5 flex justify-between'>
              <span>{t('hero_cards.name_label')}</span>
              <span>{t('hero_cards.status_label')}</span>
            </div>
            <div className='flex flex-col gap-1.5'>
              {[
                { name: 'Alice Freeman', status: t('hero_cards.eligible') },
                { name: 'Bob Smith', status: t('hero_cards.not_eligible') },
                { name: 'Charlie Brown', status: t('hero_cards.eligible') },
              ].map((user, i) => (
                <div key={i} className='flex justify-between items-center text-[13px]'>
                  <span className='font-medium'>{user.name}</span>
                  {(() => {
                    const isEligible = user.status === t('hero_cards.eligible')
                    return (
                      <span
                        className={`text-[11px] flex items-center gap-0.5 ${isEligible ? 'text-success' : 'text-warning'}`}
                      >
                        {isEligible ? (
                          <CheckCircle2 className='h-2.5 w-2.5 shrink-0' aria-hidden='true' />
                        ) : (
                          <AlertCircle className='h-2.5 w-2.5 shrink-0' aria-hidden='true' />
                        )}
                        {user.status}
                      </span>
                    )
                  })()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const VotingCard = ({ animated = false }: { animated?: boolean }) => {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()
  return (
    <Card className='shadow-xl border-muted/40 backdrop-blur-sm bg-card/95 w-full'>
      <CardHeader className='pb-2 p-4'>
        <div className='flex items-center justify-between mb-2'>
          <Badge variant='secondary' className='text-[11px] h-5'>
            {t('hero_cards.step2')}
          </Badge>
          <Badge className='bg-success/10 text-success hover:bg-success/20 border-success/30 text-[11px] pointer-events-none'>
            {t('hero_cards.active_election')}
          </Badge>
        </div>
        <CardTitle className='text-[17px]'>{t('hero_cards.election_title')}</CardTitle>
        <CardDescription className='text-[13px]'>{t('hero_cards.election_closes')}</CardDescription>
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        <div className='flex items-center justify-between mb-3'>
          <div className='text-[13px] text-muted-foreground'>{t('hero_cards.participation')}</div>
          <div className='font-bold text-[15px] tabular-nums'>78.4%</div>
        </div>
        <div className='h-1.5 w-full bg-muted rounded-full overflow-hidden mb-3'>
          {animated && !reducedMotion ? (
            <motion.div
              className='h-full bg-primary w-full origin-left'
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 0.784 }}
              transition={{ duration: 1.5, delay: 2, ease: 'easeOut' }}
            />
          ) : (
            <div className='h-full bg-primary w-[78.4%]' />
          )}
        </div>

        {/* Avatar Group */}
        <div className='flex -space-x-2 items-center' aria-hidden='true'>
          {avatars.map((avatar, index) => (
            <Avatar key={index} className='ring-background ring-2 h-7 w-7'>
              <AvatarImage src={avatar.src} alt='' />
              <AvatarFallback className='text-[10px]'>{avatar.fallback}</AvatarFallback>
            </Avatar>
          ))}
          <Avatar className='ring-background ring-2 h-7 w-7 bg-muted flex items-center justify-center'>
            <AvatarFallback className='text-[10px]'>+152</AvatarFallback>
          </Avatar>
          <span className='ml-3 text-[11px] text-muted-foreground whitespace-nowrap'>
            {t('hero_cards.voted_just_now')}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export const ResultsCard = ({ animated = false }: { animated?: boolean }) => {
  const { t } = useTranslation()
  const reducedMotion = useReducedMotion()
  return (
    <Card className='shadow-lg border-muted/40 backdrop-blur-sm bg-card/90 w-full'>
      <CardHeader className='pb-3 p-4'>
        <div className='flex items-center justify-between'>
          <Badge variant='secondary' className='text-[11px] h-5'>
            {t('hero_cards.step3')}
          </Badge>
          <ShieldCheck className='h-4 w-4 text-purple-500' />
        </div>
        <CardTitle className='text-[15px]'>{t('hero_cards.verified_results')}</CardTitle>
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        <div className='space-y-3'>
          {/* Fake Results */}
          <div className='space-y-2'>
            {[
              { label: t('previews.app_preview.option_a'), val: 62 },
              { label: t('previews.app_preview.option_b'), val: 28 },
              { label: t('hero_cards.abstain'), val: 10 },
            ].map((opt, i) => (
              <div key={i} className='flex flex-col gap-1'>
                <div className='flex justify-between text-[11px]'>
                  <span>{opt.label}</span>
                  <span className='font-medium tabular-nums'>{opt.val}%</span>
                </div>
                <div className='h-1 w-full bg-muted rounded-full overflow-hidden'>
                  {animated && !reducedMotion ? (
                    <motion.div
                      className='h-full bg-purple-500/80 w-full origin-left'
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: opt.val / 100 }}
                      transition={{ duration: 1, delay: 3.5 + i * 0.2 }}
                    />
                  ) : (
                    <div className='h-full bg-purple-500/80' style={{ width: `${opt.val}%` }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className='flex items-center justify-between pt-1'>
            <div className='flex items-center gap-1.5 text-success bg-success/10 px-2 py-1 rounded-md border border-success/30'>
              <FileCheck className='h-3 w-3' />
              <span className='text-[11px] font-medium'>{t('hero_cards.legally_valid')}</span>
            </div>
            <div className='flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono'>
              <Hash className='h-3 w-3' />
              <span>0x7f...3a9c</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
