import { Card } from '@/components/ui/card'
import { Globe, TrendingUp, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function ProjectsPreview() {
  const { t } = useTranslation()
  return (
    <Card className='w-48 p-4 space-y-3 bg-background/50 backdrop-blur-sm'>
      <div className='space-y-2'>
        <div className='flex items-center justify-between text-xs'>
          <div className='flex items-center gap-2'>
            <Users className='size-3.5 text-sky-600 dark:text-sky-400' />
            <span className='text-muted-foreground'>{t('previews.projectsPreview.activeVoters')}</span>
          </div>
          <span className='font-semibold text-sky-600 dark:text-sky-400'>1.2M</span>
        </div>
        <div className='flex items-center justify-between text-xs'>
          <div className='flex items-center gap-2'>
            <TrendingUp className='size-3.5 text-sky-600 dark:text-sky-400' />
            <span className='text-muted-foreground'>{t('previews.projectsPreview.turnout')}</span>
          </div>
          <span className='font-semibold text-sky-600 dark:text-sky-400'>87%</span>
        </div>
        <div className='flex items-center justify-between text-xs'>
          <div className='flex items-center gap-2'>
            <Globe className='size-3.5 text-sky-600 dark:text-sky-400' />
            <span className='text-muted-foreground'>{t('previews.projectsPreview.locations')}</span>
          </div>
          <span className='font-semibold text-sky-600 dark:text-sky-400'>45</span>
        </div>
      </div>
    </Card>
  )
}
