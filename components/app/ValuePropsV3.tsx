import { ClockIcon, HeartHandshakeIcon, ShieldCheckIcon, ZapIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ValuePropsV3() {
  const { t } = useTranslation()

  const features = [
    {
      title: t('vocdoni_app.value_props.cards.digitalization.title'),
      description: t('vocdoni_app.value_props.cards.digitalization.description'),
      icon: <ZapIcon className='size-10 text-primary mb-4' />,
    },
    {
      title: t('vocdoni_app.value_props.cards.risk_reduction.title'),
      description: t('vocdoni_app.value_props.cards.risk_reduction.description'),
      icon: <ShieldCheckIcon className='size-10 text-primary mb-4' />,
    },
    {
      title: t('vocdoni_app.value_props.cards.cost_saving.title'),
      description: t('vocdoni_app.value_props.cards.cost_saving.description'),
      icon: <ClockIcon className='size-10 text-primary mb-4' />,
    },
    {
      title: t('vocdoni_app.value_props.cards.expert_partner.title'),
      description: t('vocdoni_app.value_props.cards.expert_partner.description'),
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
          {features.map((feature, index) => (
            <Card key={index} className='border-border/50 bg-background/50 transition-colors hover:bg-background/80'>
              <CardHeader>
                {feature.icon}
                <CardTitle className='text-xl'>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground'>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
