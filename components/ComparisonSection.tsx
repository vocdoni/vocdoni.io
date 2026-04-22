import { CircleCheckIcon, XCircleIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Section } from '@/components/Section'
import { MotionPreset } from '@/components/ui/motion-preset'
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

const ComparisonSection = ({
  options,
  featureKeys,
  featureLabels,
}: {
  options: ComparisonOption
  featureKeys: string[]
  featureLabels: string[]
}) => {
  const { t } = useTranslation()
  return (
    <Section>
      <div className='container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='space-y-12 sm:space-y-16 lg:space-y-24'>
          {/* Header */}
          <MotionPreset fade blur slide delay={0} transition={{ duration: 0.5 }} inView inViewOnce>
            <div className='space-y-4'>
              <p className='text-primary text-sm font-medium uppercase'>{t('comparison.eyebrow')}</p>

              <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>{t('comparison.title')}</h2>

              <p className='text-muted-foreground text-xl max-w-3xl'>{t('comparison.description')}</p>
            </div>
          </MotionPreset>

          {/* Table - Desktop */}
          <MotionPreset fade blur slide delay={0.1} transition={{ duration: 0.5 }} inView inViewOnce>
            <div className='hidden lg:block overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead scope='col' className='w-1/4'>
                      <span className='sr-only'>{t('comparison.featureColumnLabel', 'Feature')}</span>
                    </TableHead>
                    {options.map((option) => (
                      <TableHead
                        scope='col'
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
                            {t(option.name)}
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
                        <TableHead
                          scope='row'
                          className={cn('p-4 text-base font-normal', {
                            'border-border border-b': index !== featureLabels.length - 1,
                          })}
                        >
                          {t(feature)}
                        </TableHead>
                        {options.map((option) => {
                          const featureValue = option.features[featureKey as keyof typeof option.features]
                          const isLastRow = index === featureLabels.length - 1

                          return (
                            <TableCell
                              key={`${option.name}-${feature}`}
                              className={cn('p-4', {
                                'border-border border-b': !isLastRow,
                                'bg-primary/5': option.isHighlighted,
                              })}
                            >
                              <div className='flex items-center gap-2'>
                                {featureValue.status === 'positive' ? (
                                  <CircleCheckIcon className='size-5 flex-shrink-0 text-success' />
                                ) : (
                                  <XCircleIcon className='size-5 flex-shrink-0 text-destructive' />
                                )}
                                <span className='text-sm font-medium'>{t(featureValue.text)}</span>
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
          </MotionPreset>

          {/* Cards - Mobile & Tablet */}
          <div className='lg:hidden space-y-6'>
            {options.map((option, index) => (
              <MotionPreset
                key={option.name}
                fade
                blur
                slide
                delay={0.1 + index * 0.1}
                transition={{ duration: 0.5 }}
                inView
                inViewOnce
              >
                <div
                  className={cn('rounded-lg border p-6 space-y-4', {
                    'border-primary bg-primary/5': option.isHighlighted,
                  })}
                >
                  <h3
                    className={cn('text-xl font-semibold text-center', {
                      'text-primary': option.isHighlighted,
                    })}
                  >
                    {t(option.name)}
                  </h3>

                  <div className='space-y-3'>
                    {featureLabels.map((feature, index) => {
                      const featureKey = featureKeys[index]
                      const featureValue = option.features[featureKey as keyof typeof option.features]

                      return (
                        <div key={feature} className='space-y-1'>
                          <p className='text-sm font-medium text-muted-foreground'>{t(feature)}</p>
                          <div className='flex items-center gap-2'>
                            {featureValue.status === 'positive' ? (
                              <CircleCheckIcon className='size-5 flex-shrink-0 text-success' />
                            ) : (
                              <XCircleIcon className='size-5 flex-shrink-0 text-destructive' />
                            )}
                            <span className='text-sm font-medium'>{t(featureValue.text)}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </MotionPreset>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default ComparisonSection
