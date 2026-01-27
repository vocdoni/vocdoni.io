import type { ReactNode } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { cn } from '@/lib/utils'

// Statistics card data type
export type StatisticsCardProps = {
  icon: ReactNode
  trend: 'up' | 'down'
  changePercentage: string
  value: string
  title: string
  badgeContent: string
  className?: string
  iconClassName?: string
}

const StatisticsCard = ({
  icon,
  value,
  title,
  trend,
  changePercentage,
  badgeContent,
  className,
  iconClassName
}: StatisticsCardProps) => {
  return (
    <Card className={cn('gap-4', className)}>
      <CardHeader className='flex items-center justify-between'>
        <Avatar className='size-9.5 rounded-md'>
          <AvatarFallback
            className={cn('bg-primary/10 text-primary size-9.5 shrink-0 rounded-md [&>svg]:size-4.75', iconClassName)}
          >
            {icon}
          </AvatarFallback>
        </Avatar>
        <p className='flex items-center gap-1'>
          {changePercentage}{' '}
          {trend === 'up' ? <ChevronUpIcon className='size-4' /> : <ChevronDownIcon className='size-4' />}
        </p>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col justify-between gap-4'>
        <p className='flex flex-col gap-1'>
          <span className='text-lg font-semibold'>{value}</span>
          <span className='text-muted-foreground text-sm'>{title}</span>
        </p>
        <Badge className='bg-primary/10 text-primary'>{badgeContent}</Badge>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
