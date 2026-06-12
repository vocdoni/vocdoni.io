import { Building2, GraduationCap, Landmark, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { FeatureGrid, MarketingHero, RelatedLinks, StatStrip } from '@/components/marketing'

export default function CustomersPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('customers.hero.eyebrow', 'Customers')}
        title={t('customers.hero.title', 'Trusted by organizations that cannot afford a disputed vote')}
        subtitle={t(
          'customers.hero.subtitle',
          'Professional colleges, associations, federations, city councils, and cultural organizations run their elections and assemblies with Vocdoni.'
        )}
        primaryCta={{
          label: t('customers.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('customers.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
      />

      <StatStrip
        stats={[
          {
            value: t('customers.stats.votes.value', '200,000+'),
            label: t('customers.stats.votes.label', 'votes processed'),
          },
          {
            value: t('customers.stats.coib.value', '180,000'),
            label: t('customers.stats.coib.label', 'members at Òmnium Cultural'),
          },
          {
            value: t('customers.stats.sectors.value', 'Public and private'),
            label: t('customers.stats.sectors.label', 'clients across sectors'),
          },
          {
            value: t('customers.stats.results.value', 'Instant'),
            label: t('customers.stats.results.label', 'verifiable results'),
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('customers.sectors.eyebrow', 'Who votes with Vocdoni')}
        title={t('customers.sectors.title', 'Clients across every sector that needs trusted decisions')}
        columns={2}
        features={[
          {
            icon: GraduationCap,
            title: t('customers.sectors.colleges.title', 'Professional colleges'),
            description: t(
              'customers.sectors.colleges.description',
              'The Official College of Nurses of Barcelona (COIB), the Official College of Nursing of Seville (ICOES), and the College of Industrial Engineers of Catalonia (EIC) run statutory elections with Vocdoni.'
            ),
          },
          {
            icon: Users,
            title: t('customers.sectors.associations.title', 'Associations and cultural organizations'),
            description: t(
              'customers.sectors.associations.description',
              'Òmnium Cultural, the Centre Excursionista de Catalunya, and Plataforma per la Llengua hold their assemblies with full guarantees.'
            ),
          },
          {
            icon: Landmark,
            title: t('customers.sectors.public.title', 'Public administration'),
            description: t(
              'customers.sectors.public.description',
              "City councils such as Bellpuig and La Bisbal d'Empordà run citizen participation and hybrid votes with verifiable results."
            ),
          },
          {
            icon: Building2,
            title: t('customers.sectors.partners.title', 'Technology partners'),
            description: t(
              'customers.sectors.partners.description',
              'Integrators like BLOOCK build verifiable voting into their own platforms on top of Vocdoni.'
            ),
          },
        ]}
      />

      <RelatedLinks
        title={t('customers.related.title', 'Read their stories')}
        links={[
          {
            label: t('customers.related.icoes', 'ICOES case study'),
            href: '/case-studies/icoes',
            description: t('customers.related.icoes_desc', 'More efficient, accessible voting for Seville nurses.'),
          },
          {
            label: t('customers.related.coib', 'COIB case study'),
            href: '/case-studies/coib',
            description: t('customers.related.coib_desc', 'Fast, simple, reliable participation for Barcelona nurses.'),
          },
          {
            label: t('customers.related.ccv', 'CCV SuperNodes case study'),
            href: '/case-studies/ccv-supernodes',
            description: t(
              'customers.related.ccv_desc',
              'A channel programme bringing Vocdoni to public institutions.'
            ),
          },
          {
            label: t('customers.related.hub', 'All case studies'),
            href: '/case-studies',
            description: t('customers.related.hub_desc', 'Browse every organization that votes with Vocdoni.'),
          },
        ]}
      />
    </>
  )
}
