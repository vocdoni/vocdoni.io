import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

import { cn } from '@/lib/utils'

// Statistics card data type
type StatisticsCardProps = {
  title: string
  badgeContent: string
  value: string
  changePercentage: number
  svg: ReactNode
  className?: string
}

const StatisticsCard = ({ title, badgeContent, value, changePercentage, svg, className }: StatisticsCardProps) => {
  return (
    <Card className={cn('relative justify-between gap-6', className)}>
      <CardHeader className='flex flex-col gap-3'>
        <span className='font-medium'>{title}</span>
        <Badge className='bg-primary/10 text-primary'>{badgeContent}</Badge>
      </CardHeader>
      <CardContent className='flex items-center gap-2 lg:max-[1100px]:flex-col lg:max-[1100px]:items-start'>
        <span className='text-2xl font-semibold'>{value}</span>
        <span
          className={cn('text-sm', changePercentage >= 0 ? 'text-green-600 dark:text-green-400' : 'text-destructive')}
        >
          {changePercentage > 0 ? '+' : ''}
          {changePercentage}%
        </span>
      </CardContent>
      <div className='absolute right-0.5 bottom-0'>{svg}</div>
    </Card>
  )
}

export default StatisticsCard
