import { Boxes, Eye, GitBranch, Scale } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CtaBanner, FeatureGrid, MarketingHero, ProseSection } from '@/components/marketing'

export default function OpenSourcePage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('security.open_source.hero.eyebrow', 'Open source')}
        title={t('security.open_source.hero.title', 'Elections should run on code anyone can read')}
        subtitle={t(
          'security.open_source.hero.subtitle',
          'Vocdoni is open source from the protocol up. When the stakes are a real decision, the software that counts the votes should not be a black box.'
        )}
        primaryCta={{
          label: t('security.open_source.hero.cta_primary', 'Explore the code on GitHub'),
          href: 'https://github.com/vocdoni',
          external: true,
        }}
        secondaryCta={{
          label: t('security.open_source.hero.cta_secondary', 'Back to security overview'),
          href: '/security',
        }}
      />

      <ProseSection
        eyebrow={t('security.open_source.why.eyebrow', 'Why it matters')}
        title={t('security.open_source.why.title', 'Trust in elections has to be earned in the open')}
        intro={t(
          'security.open_source.why.intro',
          'A voting system you cannot inspect asks you to trust both its intentions and its correctness on faith. Open source replaces that faith with evidence.'
        )}
        blocks={[
          {
            heading: t('security.open_source.why.scrutiny.heading', 'Public scrutiny finds problems'),
            paragraphs: [
              t(
                'security.open_source.why.scrutiny.p1',
                'When the code is public, researchers and engineers anywhere can examine it, report issues, and confirm that it does what we say. Bugs and weaknesses surface in daylight instead of staying hidden.'
              ),
            ],
          },
          {
            heading: t('security.open_source.why.no_lock.heading', 'No hidden behavior'),
            paragraphs: [
              t(
                'security.open_source.why.no_lock.p1',
                'There is nowhere to hide a backdoor, a quiet override, or a shortcut that weakens privacy. What governs your election is exactly what is published, and you can check it.'
              ),
            ],
          },
        ]}
      />

      <FeatureGrid
        eyebrow={t('security.open_source.grid.eyebrow', 'What open source gives you')}
        title={t('security.open_source.grid.title', 'Concrete benefits, not a badge')}
        columns={2}
        features={[
          {
            icon: Eye,
            title: t('security.open_source.grid.transparency.title', 'Full transparency'),
            description: t(
              'security.open_source.grid.transparency.description',
              'Read exactly how votes are cast, recorded, and counted, line by line.'
            ),
          },
          {
            icon: GitBranch,
            title: t('security.open_source.grid.reproducibility.title', 'Reproducibility'),
            description: t(
              'security.open_source.grid.reproducibility.description',
              'Independent parties can rebuild and re-run the software to confirm results.'
            ),
          },
          {
            icon: Scale,
            title: t('security.open_source.grid.license.title', 'Permissive licensing'),
            description: t(
              'security.open_source.grid.license.description',
              'Published under an open license, so you are not locked into a single vendor.'
            ),
          },
          {
            icon: Boxes,
            title: t('security.open_source.grid.community.title', 'A reviewing community'),
            description: t(
              'security.open_source.grid.community.description',
              'A public codebase invites continuous review from outside the company.'
            ),
          },
        ]}
      />

      <CtaBanner
        title={t('security.open_source.cta.title', 'Read the code before you trust the vote')}
        description={t(
          'security.open_source.cta.description',
          'Browse the protocol and clients on GitHub, or run a free verifiable vote to see them work.'
        )}
        primaryCta={{
          label: t('security.open_source.cta.primary', 'View on GitHub'),
          href: 'https://github.com/vocdoni',
          external: true,
        }}
        secondaryCta={{
          label: t('security.open_source.cta.secondary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
      />
    </>
  )
}
