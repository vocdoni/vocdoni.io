import { useTranslation } from 'react-i18next'

import { FaqAccordion, MarketingHero, ProseSection, RelatedLinks, StepList } from '@/components/marketing'

export default function OnlineVotingGuidePage() {
  const { t } = useTranslation()

  return (
    <>
      <MarketingHero
        eyebrow={t('resources.online_voting_guide.hero.eyebrow', 'Resources')}
        title={t('resources.online_voting_guide.hero.title', 'The complete guide to online voting for organizations')}
        subtitle={t(
          'resources.online_voting_guide.hero.subtitle',
          'Why organizations move votes online, how a secure election actually works, how to choose a platform, what makes a result legally valid, and how to run your first vote with confidence. One practical guide, start to finish.'
        )}
        primaryCta={{
          label: t('resources.online_voting_guide.hero.cta_primary', 'Start for free'),
          href: 'https://app.vocdoni.io',
          external: true,
        }}
        secondaryCta={{
          label: t('resources.online_voting_guide.hero.cta_secondary', 'Back to Resources'),
          href: '/resources',
        }}
      />

      <ProseSection
        eyebrow={t('resources.online_voting_guide.why.eyebrow', 'Why move online')}
        title={t(
          'resources.online_voting_guide.why.title',
          'Why organizations are leaving paper and postal voting behind'
        )}
        intro={t(
          'resources.online_voting_guide.why.intro',
          'Paper and postal voting are slow, expensive, and hard to verify. Online voting, done with the right safeguards, is faster, cheaper, more inclusive, and easier to audit.'
        )}
        blocks={[
          {
            heading: t('resources.online_voting_guide.why.cost.heading', 'Lower cost and effort'),
            paragraphs: [
              t(
                'resources.online_voting_guide.why.cost.p1',
                'Printing, postage, venue hire, and manual counting add up quickly. Moving online removes most of these costs and frees your team from logistics on assembly day.'
              ),
            ],
          },
          {
            heading: t('resources.online_voting_guide.why.turnout.heading', 'Higher participation'),
            paragraphs: [
              t(
                'resources.online_voting_guide.why.turnout.p1',
                'Members can vote from any device, wherever they are. Remote and hybrid participation consistently lifts turnout, especially for organizations with geographically spread membership.'
              ),
            ],
          },
          {
            heading: t('resources.online_voting_guide.why.trust.heading', 'Stronger trust and evidence'),
            paragraphs: [
              t(
                'resources.online_voting_guide.why.trust.p1',
                'A verifiable online vote produces proof anyone can check. Instead of asking members to trust the count, you can show them it is correct, which prevents disputes before they start.'
              ),
            ],
          },
        ]}
      />

      <ProseSection
        eyebrow={t('resources.online_voting_guide.how.eyebrow', 'How it works')}
        title={t('resources.online_voting_guide.how.title', 'What actually happens during a secure online vote')}
        blocks={[
          {
            heading: t('resources.online_voting_guide.how.census.heading', 'The census defines who votes'),
            paragraphs: [
              t(
                'resources.online_voting_guide.how.census.p1',
                'You provide the list of eligible voters and any vote weights. The census is committed cryptographically, so it cannot be altered once voting opens.'
              ),
            ],
          },
          {
            heading: t('resources.online_voting_guide.how.ballot.heading', 'Voters cast encrypted ballots'),
            paragraphs: [
              t(
                'resources.online_voting_guide.how.ballot.p1',
                'Each eligible voter proves their eligibility without revealing their identity, then submits an encrypted ballot from any device. No operator can read an individual vote.'
              ),
            ],
          },
          {
            heading: t('resources.online_voting_guide.how.count.heading', 'The count is provable'),
            paragraphs: [
              t(
                'resources.online_voting_guide.how.count.p1',
                'When voting closes, ballots are tallied and the system publishes proofs. Anyone can confirm the result matches the votes cast, without learning how anyone voted.'
              ),
            ],
            bullets: [
              t('resources.online_voting_guide.how.count.b1', 'Ballot secrecy: votes are never linked to voters'),
              t('resources.online_voting_guide.how.count.b2', 'Verifiability: anyone can audit the result'),
              t('resources.online_voting_guide.how.count.b3', 'Tamper-evidence: changes leave a visible trace'),
            ],
          },
        ]}
      />

      <ProseSection
        muted
        eyebrow={t('resources.online_voting_guide.choose.eyebrow', 'Choosing a platform')}
        title={t('resources.online_voting_guide.choose.title', 'How to choose an online voting platform')}
        intro={t(
          'resources.online_voting_guide.choose.intro',
          'Not all online voting is equal. Use this list to separate genuinely secure, verifiable platforms from simple survey tools dressed up as elections.'
        )}
        blocks={[
          {
            heading: t('resources.online_voting_guide.choose.must.heading', 'Non-negotiables'),
            bullets: [
              t('resources.online_voting_guide.choose.must.b1', 'Anonymous ballots that operators cannot read'),
              t('resources.online_voting_guide.choose.must.b2', 'End-to-end verifiability with public proofs'),
              t('resources.online_voting_guide.choose.must.b3', 'Open source code that independent parties can audit'),
              t('resources.online_voting_guide.choose.must.b4', 'GDPR compliance and EU-based data hosting'),
              t('resources.online_voting_guide.choose.must.b5', 'Support for your census size and weighting rules'),
            ],
          },
          {
            heading: t('resources.online_voting_guide.choose.nice.heading', 'Worth asking about'),
            bullets: [
              t('resources.online_voting_guide.choose.nice.b1', 'Hybrid in-person and remote voting in one process'),
              t('resources.online_voting_guide.choose.nice.b2', 'eIDAS-grade identity and single sign-on'),
              t('resources.online_voting_guide.choose.nice.b3', 'A branded voting portal for your members'),
              t('resources.online_voting_guide.choose.nice.b4', 'Expert support before, during, and after the vote'),
            ],
          },
        ]}
      />

      <ProseSection
        eyebrow={t('resources.online_voting_guide.legal.eyebrow', 'Legal validity')}
        title={t('resources.online_voting_guide.legal.title', 'What makes an online vote legally valid')}
        blocks={[
          {
            paragraphs: [
              t(
                'resources.online_voting_guide.legal.p1',
                'Legal validity usually rests on three things: your own statutes allow electronic voting, the process can prove who was eligible and that each voted once, and the result is verifiable and auditable after the fact.'
              ),
            ],
            bullets: [
              t('resources.online_voting_guide.legal.b1', 'Check your statutes or bylaws permit electronic voting'),
              t('resources.online_voting_guide.legal.b2', 'Keep an auditable record of eligibility and turnout'),
              t('resources.online_voting_guide.legal.b3', 'Use a process whose result anyone can independently verify'),
              t(
                'resources.online_voting_guide.legal.b4',
                'Where required, use identity assurance such as eIDAS or SSO'
              ),
            ],
          },
          {
            paragraphs: [
              t(
                'resources.online_voting_guide.legal.p2',
                'A verifiable, well-documented online vote is often easier to defend than a paper one, because the evidence is explicit rather than locked in a ballot box. When in doubt, confirm the specifics with your legal advisor.'
              ),
            ],
          },
        ]}
      />

      <StepList
        eyebrow={t('resources.online_voting_guide.first.eyebrow', 'Running your first vote')}
        title={t('resources.online_voting_guide.first.title', 'Run your first online vote in seven steps')}
        steps={[
          {
            title: t('resources.online_voting_guide.first.s1.title', 'Confirm the rules'),
            description: t(
              'resources.online_voting_guide.first.s1.description',
              'Check your statutes allow electronic voting and agree on the questions, quorum, and any vote weighting.'
            ),
          },
          {
            title: t('resources.online_voting_guide.first.s2.title', 'Prepare the census'),
            description: t(
              'resources.online_voting_guide.first.s2.description',
              'Compile a clean, up-to-date list of eligible voters with the contact details you will use to reach them.'
            ),
          },
          {
            title: t('resources.online_voting_guide.first.s3.title', 'Build the ballot'),
            description: t(
              'resources.online_voting_guide.first.s3.description',
              'Set up the questions and options, choose single or multiple choice, and decide how abstentions are handled.'
            ),
          },
          {
            title: t('resources.online_voting_guide.first.s4.title', 'Test with a pilot'),
            description: t(
              'resources.online_voting_guide.first.s4.description',
              'Run a small trial vote with your team or board to confirm the experience before going live.'
            ),
          },
          {
            title: t('resources.online_voting_guide.first.s5.title', 'Notify voters'),
            description: t(
              'resources.online_voting_guide.first.s5.description',
              'Send clear instructions and access links, and explain how privacy and verification work so members feel confident.'
            ),
          },
          {
            title: t('resources.online_voting_guide.first.s6.title', 'Open and monitor'),
            description: t(
              'resources.online_voting_guide.first.s6.description',
              'Open voting for the agreed window, track turnout against quorum, and send a reminder before closing.'
            ),
          },
          {
            title: t('resources.online_voting_guide.first.s7.title', 'Publish and archive'),
            description: t(
              'resources.online_voting_guide.first.s7.description',
              'Close the vote, share the verifiable result, and keep the proofs and turnout record for your minutes.'
            ),
          },
        ]}
      />

      <FaqAccordion
        eyebrow={t('resources.online_voting_guide.faq.eyebrow', 'Guide FAQ')}
        title={t('resources.online_voting_guide.faq.title', 'Questions organizations ask before going online')}
        items={[
          {
            question: t(
              'resources.online_voting_guide.faq.q1.question',
              'Is online voting legal for our organization?'
            ),
            answer: t(
              'resources.online_voting_guide.faq.q1.answer',
              'In most cases yes, provided your statutes allow electronic voting and the process is auditable. Many organizations add a clause permitting it. Confirm the specifics with your legal advisor.'
            ),
          },
          {
            question: t('resources.online_voting_guide.faq.q2.question', 'How long does it take to set up?'),
            answer: t(
              'resources.online_voting_guide.faq.q2.answer',
              'A straightforward vote can be ready in minutes once your census is prepared. Larger or high-stakes elections benefit from a pilot and a short planning call.'
            ),
          },
          {
            question: t(
              'resources.online_voting_guide.faq.q3.question',
              'What if some members are not comfortable with technology?'
            ),
            answer: t(
              'resources.online_voting_guide.faq.q3.answer',
              'Voting works in a normal web browser with a simple link, and hybrid setups let less digital members vote in person while everyone is counted in the same verifiable process.'
            ),
          },
          {
            question: t(
              'resources.online_voting_guide.faq.q4.question',
              'Can we keep results private until voting closes?'
            ),
            answer: t(
              'resources.online_voting_guide.faq.q4.answer',
              'Yes. Ballots stay encrypted during the vote and the tally is only revealed after closing, so no early results can influence how people vote.'
            ),
          },
        ]}
      />

      <RelatedLinks
        title={t('resources.online_voting_guide.related.title', 'Keep going')}
        links={[
          {
            label: t('resources.online_voting_guide.related.agm.label', 'Online AGM checklist'),
            href: '/resources/agm-checklist',
            description: t(
              'resources.online_voting_guide.related.agm.desc',
              'A step-by-step checklist for your assembly.'
            ),
          },
          {
            label: t('resources.online_voting_guide.related.rules.label', 'Election rules template'),
            href: '/resources/election-rules-template',
            description: t(
              'resources.online_voting_guide.related.rules.desc',
              'A ready-made voting rules outline to adapt.'
            ),
          },
          {
            label: t('resources.online_voting_guide.related.how.label', 'How online voting works'),
            href: '/learn/how-online-voting-works',
            description: t('resources.online_voting_guide.related.how.desc', 'The five stages of a digital election.'),
          },
        ]}
      />
    </>
  )
}
