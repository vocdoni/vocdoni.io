import { TrendingUpIcon, UsersIcon, VoteIcon } from 'lucide-react'

import { Bar, ComposedChart, Line, XAxis } from 'recharts'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'

import { cn } from '@/lib/utils'

const chartData = [
  { time: '09:00', votes: 120, trend: 100 },
  { time: '10:00', votes: 300, trend: 280 },
  { time: '11:00', votes: 450, trend: 400 },
  { time: '12:00', votes: 380, trend: 350 },
  { time: '13:00', votes: 200, trend: 180 },
  { time: '14:00', votes: 250, trend: 220 },
  { time: '15:00', votes: 350, trend: 320 },
  { time: '16:00', votes: 480, trend: 450 },
  { time: '17:00', votes: 550, trend: 500 },
  { time: '18:00', votes: 400, trend: 380 },
]



import { useTranslation } from 'react-i18next'

const VotingResultsCard = ({ className }: { className?: string }) => {
  const { t } = useTranslation()

  const chartConfig = {
    votes: {
      label: t('vocdoni_app.stats.votes_cast', 'Votes Cast'),
      color: 'var(--primary)',
    },
    trend: {
      label: t('vocdoni_app.stats.expected', 'Expected'),
      color: 'var(--muted-foreground)',
    },
  } satisfies ChartConfig
  
  const platformsData = [
    {
      icon: <VoteIcon className='size-4' />,
      platform: t('vocdoni_app.stats.digital', 'Digital'),
      count: '3,250',
      pct: '92%',
    },
    {
      icon: <UsersIcon className='size-4' />,
      platform: t('vocdoni_app.stats.in_person', 'In-person'),
      count: '240',
      pct: '8%',
    },
  ]

  return (
    <Card className={cn('justify-between gap-4', className)}>
      <CardHeader className='flex flex-col'>
        <div className='flex w-full items-center justify-between gap-2'>
          <div className='flex items-center gap-2'>
            <Avatar className='size-8 rounded-sm'>
              <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
                <TrendingUpIcon className='size-4' />
              </AvatarFallback>
            </Avatar>
            <span>{t('vocdoni_app.stats.live_participation', 'Live participation')}</span>
          </div>
          <Button variant='outline' className='h-7 px-2 py-1 text-xs'>
            {t('vocdoni_app.stats.view', 'View')}
          </Button>
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-2xl font-semibold'>3,490</span>
          <Badge className='bg-primary/10 text-primary rounded-sm hover:bg-primary/20'>
            {t('vocdoni_app.stats.vs_last_year', '+12% vs last year')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Separator />

        <div className='space-y-1'>
          {platformsData.map((item, index) => (
            <div key={index} className='flex items-center justify-between gap-2 py-2'>
              <div className='text-muted-foreground flex items-center gap-2'>
                {item.icon}
                <span className='text-sm'>{item.platform}</span>
              </div>

              <div className='flex items-center gap-2 text-sm'>
                <span className='text-muted-foreground'>{item.count}</span>
                <span>{item.pct}</span>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <ChartContainer config={chartConfig} className='h-40 w-full'>
          <ComposedChart data={chartData} margin={{ top: 4, right: 6 }}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <XAxis
              dataKey='time'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={15}
              tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
            />
            <Bar dataKey='votes' barSize={16} fill='var(--primary)' radius={[4, 4, 0, 0]} />
            <Line type='monotone' dataKey='trend' stroke='var(--muted-foreground)' strokeDasharray="4 4" dot={false} strokeWidth={2} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default VotingResultsCard
