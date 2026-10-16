import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'

type ChangelogTimelineItemProps = {
  date: string
  version: string
  children: ReactNode
}

const ChangelogTimelineItem = ({ date, version, children }: ChangelogTimelineItemProps) => {
  return (
    <div id={version} className='relative flex scroll-mt-20 justify-end gap-2'>
      {/* Sticky date + version sidebar — desktop only */}
      <div className='sticky top-20 flex w-36 shrink-0 flex-col items-end gap-2 self-start pb-4 max-md:hidden'>
        <Badge variant='outline' className='w-auto rounded-sm text-sm font-medium'>
          {version}
        </Badge>
        <div className='text-muted-foreground text-right text-sm font-medium'>{date}</div>
      </div>

      {/* Dot + vertical line */}
      <div className='flex flex-col items-center gap-2'>
        <div className='sticky top-20 flex size-6 items-center justify-center'>
          <span className='bg-primary/20 flex size-[18px] shrink-0 items-center justify-center rounded-full'>
            <span className='bg-primary size-3 rounded-full' />
          </span>
        </div>
        <span className='w-px flex-1 border' />
      </div>

      {/* Content */}
      <div className='flex flex-1 flex-col gap-4 pb-11 pl-3 md:pl-6 lg:pl-9'>
        {/* Version + date — mobile only */}
        <div className='flex flex-col gap-2 md:hidden'>
          <Badge variant='outline' className='w-fit rounded-sm font-medium'>
            {version}
          </Badge>
          <div className='text-muted-foreground text-sm font-medium'>{date}</div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default ChangelogTimelineItem
