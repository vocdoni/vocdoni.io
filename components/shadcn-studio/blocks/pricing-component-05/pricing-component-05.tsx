import { CircleCheckIcon, XCircleIcon } from 'lucide-react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { cn } from '@/lib/utils'

type ComparisonOption = {
  name: string
  features: {
    privacySecurity: { status: 'positive' | 'negative'; text: string }
    remoteAccessibility: { status: 'positive' | 'negative'; text: string }
    transparency: { status: 'positive' | 'negative'; text: string }
    scalability: { status: 'positive' | 'negative'; text: string }
    cost: { status: 'positive' | 'negative'; text: string }
    sustainability: { status: 'positive' | 'negative'; text: string }
  }
  isHighlighted?: boolean
}[]

const ComparisonTable = ({
  options,
  featureKeys,
  featureLabels,
}: {
  options: ComparisonOption
  featureKeys: string[]
  featureLabels: string[]
}) => {
  return (
    <section className='py-8 sm:py-16 lg:py-24'>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='space-y-12 sm:space-y-16 lg:space-y-24'>
          <div className='flex flex-col items-center gap-4 space-y-4'>
            <p className='text-primary text-sm font-medium uppercase'>Comparison</p>
            <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>Why Choose Vocdoni?</h2>
            <p className='text-muted-foreground text-center text-xl'>
              Compare Vocdoni with traditional and other digital voting solutions
            </p>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-1/4'></TableHead>
                {options.map((option) => (
                  <TableHead
                    key={option.name}
                    className={cn('text-center', {
                      'bg-primary/10': option.isHighlighted,
                    })}
                  >
                    <div className='flex flex-col items-center justify-center gap-1.5 py-3'>
                      <h3
                        className={cn('text-lg font-semibold sm:text-xl', {
                          'text-primary': option.isHighlighted,
                        })}
                      >
                        {option.name}
                      </h3>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureLabels.map((feature, index) => {
                const featureKey = featureKeys[index]

                return (
                  <TableRow key={feature}>
                    <TableCell
                      className={cn('p-4 text-base font-medium', {
                        'border-border border-b': index !== featureLabels.length - 1,
                      })}
                    >
                      {feature}
                    </TableCell>
                    {options.map((option) => {
                      const featureValue = option.features[featureKey as keyof typeof option.features]
                      const isLastRow = index === featureLabels.length - 1

                      return (
                        <TableCell
                          key={`${option.name}-${feature}`}
                          className={cn('text-center p-4', {
                            'border-border border-b': !isLastRow,
                            'bg-primary/5': option.isHighlighted,
                          })}
                        >
                          <div className='flex items-center justify-center gap-2'>
                            {featureValue.status === 'positive' ? (
                              <CircleCheckIcon className='size-5 flex-shrink-0 text-green-600' />
                            ) : (
                              <XCircleIcon className='size-5 flex-shrink-0 text-red-600' />
                            )}
                            <span className='text-sm font-medium text-left'>{featureValue.text}</span>
                          </div>
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  )
}

export default ComparisonTable
