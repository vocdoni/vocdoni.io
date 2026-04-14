import { useTranslation } from 'react-i18next'
import { ShieldCheckIcon, ClockIcon, ZapIcon, HeartHandshakeIcon } from 'lucide-react'

import { Container } from '@/components/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ValuePropsV3() {
  const { t } = useTranslation()

  const features = [
    {
      key: 'digitalization',
      icon: <ZapIcon className='size-10 text-primary mb-4' />,
    },
    {
      key: 'risk_reduction',
      icon: <ShieldCheckIcon className='size-10 text-primary mb-4' />,
    },
    {
      key: 'cost_saving',
      icon: <ClockIcon className='size-10 text-primary mb-4' />,
    },
    {
      key: 'expert_partner',
      icon: <HeartHandshakeIcon className='size-10 text-primary mb-4' />,
    },
  ]

  return (
    <section className='py-20'>
      <Container>
        <div className='flex flex-col items-center text-center mb-16'>
          <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>{t('vocdoni_app.value_props.title')}</h2>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature) => (
            <Card
              key={feature.key}
              className='border-border/50 bg-background/50 transition-colors hover:bg-background/80'
            >
              <CardHeader>
                {feature.icon}
                <CardTitle className='text-xl'>{t(`vocdoni_app.value_props.cards.${feature.key}.title`)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>{t(`vocdoni_app.value_props.cards.${feature.key}.description`)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
