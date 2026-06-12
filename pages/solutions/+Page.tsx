import {
  BadgeCheck,
  Building2,
  Clock,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Scale,
  ShieldCheck,
  Trophy,
  Users,
  Vote,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CtaBanner, FeatureGrid, MarketingHero, RelatedLinks } from '@/components/marketing'

export default function SolutionsPage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('solutions.hub.hero.eyebrow', 'Solutions')}
        title={t('solutions.hub.hero.title', 'Online voting solutions for every kind of organization')}
        subtitle={t(
          'solutions.hub.hero.subtitle',
          'From professional colleges to city councils, Vocdoni runs statutory elections and assemblies that are anonymous, end-to-end verifiable, and free of disputes.'
        )}
        primaryCta={{
          label: t('solutions.hub.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('solutions.hub.hero.cta_secondary', 'Talk to our team'), href: '/contact' }}
        bullets={[
          t('solutions.hub.hero.bullet_1', 'Legally valid votes under eIDAS, ENS and LSSI'),
          t('solutions.hub.hero.bullet_2', 'GDPR compliant and hosted in the EU'),
          t('solutions.hub.hero.bullet_3', 'Expert support before, during and after the vote'),
        ]}
      />

      <FeatureGrid
        eyebrow={t('solutions.hub.benefits.eyebrow', 'Why organizations choose Vocdoni')}
        title={t('solutions.hub.benefits.title', 'One platform, every governance scenario')}
        columns={4}
        features={[
          {
            icon: ShieldCheck,
            title: t('solutions.hub.benefits.privacy.title', 'Anonymous by design'),
            description: t(
              'solutions.hub.benefits.privacy.description',
              'Zero-knowledge ballots keep every vote secret, even from us.'
            ),
          },
          {
            icon: BadgeCheck,
            title: t('solutions.hub.benefits.verifiable.title', 'End-to-end verifiable'),
            description: t(
              'solutions.hub.benefits.verifiable.description',
              'Anyone can confirm the results match the votes cast, with no disputes.'
            ),
          },
          {
            icon: Scale,
            title: t('solutions.hub.benefits.legal.title', 'Legally valid'),
            description: t(
              'solutions.hub.benefits.legal.description',
              'Process and evidence built to hold up to statutes and the law.'
            ),
          },
          {
            icon: Vote,
            title: t('solutions.hub.benefits.hybrid.title', 'Hybrid and weighted voting'),
            description: t(
              'solutions.hub.benefits.hybrid.description',
              'Combine in-person and remote ballots, with weighted votes when you need them.'
            ),
          },
        ]}
      />

      <RelatedLinks
        title={t('solutions.hub.verticals.title', 'Find the solution built for your sector')}
        links={[
          {
            label: t('solutions.hub.verticals.professional_colleges', 'Professional colleges'),
            href: '/solutions/professional-colleges',
            description: t(
              'solutions.hub.verticals.professional_colleges_desc',
              'Statutory elections and juntas generales with total legal cover.'
            ),
          },
          {
            label: t('solutions.hub.verticals.associations_federations', 'Associations and federations'),
            href: '/solutions/associations-federations',
            description: t(
              'solutions.hub.verticals.associations_federations_desc',
              'Reach quorum without the chase. Members vote from any device.'
            ),
          },
          {
            label: t('solutions.hub.verticals.political_parties', 'Political parties'),
            href: '/solutions/political-parties',
            description: t(
              'solutions.hub.verticals.political_parties_desc',
              'Primaries and delegate elections without disputes.'
            ),
          },
          {
            label: t('solutions.hub.verticals.trade_unions', 'Trade unions'),
            href: '/solutions/trade-unions',
            description: t(
              'solutions.hub.verticals.trade_unions_desc',
              'Mass delegate elections with a full audit trail.'
            ),
          },
          {
            label: t('solutions.hub.verticals.chambers_of_commerce', 'Chambers of commerce'),
            href: '/solutions/chambers-of-commerce',
            description: t(
              'solutions.hub.verticals.chambers_of_commerce_desc',
              'Weighted voting and eIDAS-grade evidence with an institutional image.'
            ),
          },
          {
            label: t('solutions.hub.verticals.cooperatives', 'Cooperatives'),
            href: '/solutions/cooperatives',
            description: t(
              'solutions.hub.verticals.cooperatives_desc',
              'Hybrid assemblies with full legal validity under cooperative law.'
            ),
          },
          {
            label: t('solutions.hub.verticals.ngos_foundations', 'NGOs and foundations'),
            href: '/solutions/ngos-foundations',
            description: t(
              'solutions.hub.verticals.ngos_foundations_desc',
              'Governance that matches your mission: affordable and transparent.'
            ),
          },
          {
            label: t('solutions.hub.verticals.universities', 'Universities'),
            href: '/solutions/universities',
            description: t(
              'solutions.hub.verticals.universities_desc',
              'Student, faculty senate and rectorate elections in one platform.'
            ),
          },
          {
            label: t('solutions.hub.verticals.public_administration', 'Public administration'),
            href: '/solutions/public-administration',
            description: t(
              'solutions.hub.verticals.public_administration_desc',
              'Participatory budgeting and consultations with cryptographic proof.'
            ),
          },
          {
            label: t('solutions.hub.verticals.sports_clubs', 'Sports clubs'),
            href: '/solutions/sports-clubs',
            description: t(
              'solutions.hub.verticals.sports_clubs_desc',
              'Member elections that the press cannot pull apart.'
            ),
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('solutions.hub.cross.eyebrow', 'Built for trust at any scale')}
        title={t('solutions.hub.cross.title', 'The same guarantees, whatever you are voting on')}
        columns={3}
        features={[
          {
            icon: Users,
            title: t('solutions.hub.cross.turnout.title', 'Higher turnout'),
            description: t(
              'solutions.hub.cross.turnout.description',
              'Members vote in minutes from any device, so quorum stops being a worry.'
            ),
          },
          {
            icon: Clock,
            title: t('solutions.hub.cross.instant.title', 'Instant results'),
            description: t(
              'solutions.hub.cross.instant.description',
              'No manual counting and no recount nights. Results are ready the moment voting closes.'
            ),
          },
          {
            icon: HeartHandshake,
            title: t('solutions.hub.cross.support.title', 'Expert accompaniment'),
            description: t(
              'solutions.hub.cross.support.description',
              'We rehearse with you, support you on the day and deliver a post-vote report.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('solutions.hub.cta.title', 'Run your next election with confidence')}
        description={t(
          'solutions.hub.cta.description',
          'Start a free vote today, or book a call and we will tailor Vocdoni to your sector.'
        )}
        primaryCta={{
          label: t('solutions.hub.cta.primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{ label: t('solutions.hub.cta.secondary', 'Talk to our team'), href: '/contact' }}
      />

      <RelatedLinks
        title={t('solutions.hub.related.title', 'Keep exploring')}
        links={[
          {
            label: t('solutions.hub.related.professional_colleges', 'Professional colleges'),
            href: '/solutions/professional-colleges',
          },
          {
            label: t('solutions.hub.related.associations_federations', 'Associations and federations'),
            href: '/solutions/associations-federations',
          },
          {
            label: t('solutions.hub.related.political_parties', 'Political parties'),
            href: '/solutions/political-parties',
          },
          {
            label: t('solutions.hub.related.trade_unions', 'Trade unions'),
            href: '/solutions/trade-unions',
          },
          {
            label: t('solutions.hub.related.chambers_of_commerce', 'Chambers of commerce'),
            href: '/solutions/chambers-of-commerce',
          },
          {
            label: t('solutions.hub.related.cooperatives', 'Cooperatives'),
            href: '/solutions/cooperatives',
          },
          {
            label: t('solutions.hub.related.ngos_foundations', 'NGOs and foundations'),
            href: '/solutions/ngos-foundations',
          },
          {
            label: t('solutions.hub.related.universities', 'Universities'),
            href: '/solutions/universities',
          },
          {
            label: t('solutions.hub.related.public_administration', 'Public administration'),
            href: '/solutions/public-administration',
          },
          {
            label: t('solutions.hub.related.sports_clubs', 'Sports clubs'),
            href: '/solutions/sports-clubs',
          },
          {
            label: t('solutions.hub.related.pricing', 'Pricing'),
            href: '/pricing',
            description: t('solutions.hub.related.pricing_desc', 'Transparent plans and tailored quotes.'),
          },
          {
            label: t('solutions.hub.related.security', 'Security'),
            href: '/security',
            description: t('solutions.hub.related.security_desc', 'How we keep every vote secret and verifiable.'),
          },
        ]}
      />
    </>
  )
}
