import { VerticalClosingCta } from '@/components/solutions/vertical/VerticalClosingCta'
import { VerticalComparison } from '@/components/solutions/vertical/VerticalComparison'
import { VerticalEngagement } from '@/components/solutions/vertical/VerticalEngagement'
import { VerticalFaq } from '@/components/solutions/vertical/VerticalFaq'
import { VerticalFitBySize } from '@/components/solutions/vertical/VerticalFitBySize'
import { VerticalForYourBoard } from '@/components/solutions/vertical/VerticalForYourBoard'
import { VerticalHero } from '@/components/solutions/vertical/VerticalHero'
import { VerticalHowItRuns } from '@/components/solutions/vertical/VerticalHowItRuns'
import type { VerticalMediaAsset } from '@/components/solutions/vertical/VerticalMedia'
import { VerticalLegal } from '@/components/solutions/vertical/VerticalLegal'
import { VerticalProof } from '@/components/solutions/vertical/VerticalProof'
import { VerticalResources } from '@/components/solutions/vertical/VerticalResources'
import { VerticalSectionIndex, type VerticalIndexItem } from '@/components/solutions/vertical/VerticalSectionIndex'
import { VerticalStakes } from '@/components/solutions/vertical/VerticalStakes'
import { VerticalTimeline } from '@/components/solutions/vertical/VerticalTimeline'
import { VerticalTrustBand } from '@/components/solutions/vertical/VerticalTrustBand'
import type { VerticalPageProps } from '@/components/solutions/vertical/types'

interface Props extends VerticalPageProps {
  /** Product visuals; slots hold their space whether or not the assets exist. */
  media?: { console?: VerticalMediaAsset; ballot?: VerticalMediaAsset }
}

/**
 * A vertical landing page, composed from one translated content object plus
 * code-side configuration. Nothing here is specific to a single segment, so the
 * remaining verticals adopt the layout by supplying their own locale blob.
 *
 * The order follows the order the buyer's own memo gets written in: name the
 * loss once, prove it with a named body, clear the legal gate on that evidence,
 * then explain the mechanism, the schedule, the trade, and the ask.
 *
 * Timeline, fit-by-size and for-your-board render only where the content block
 * exists. Every locale of this vertical supplies all three; the guard is for the
 * next vertical to adopt the kit, which starts without them.
 */
export function VerticalPage({
  icon,
  content,
  appHref,
  ctaPrefix,
  logos,
  caseStudy,
  pricingHref,
  quotes,
  resourceLinks,
  media,
}: Props) {
  const indexItems: VerticalIndexItem[] = [
    { id: 'overview', label: content?.eyebrow },
    { id: 'stakes', label: content?.stakes?.eyebrow },
    { id: 'proof', label: content?.proof?.eyebrow },
    { id: 'legal-validity', label: content?.legal?.eyebrow },
    { id: 'how-it-runs', label: content?.how?.eyebrow },
    ...(content?.timeline ? [{ id: 'timeline', label: content.timeline.eyebrow }] : []),
    { id: 'comparison', label: content?.comparison?.eyebrow },
    { id: 'engagement', label: content?.engagement?.eyebrow },
    ...(content?.sizes ? [{ id: 'fit-by-size', label: content.sizes.eyebrow }] : []),
    { id: 'faq', label: content?.faq?.eyebrow },
    ...(content?.board ? [{ id: 'for-your-board', label: content.board.eyebrow }] : []),
    { id: 'resources', label: content?.resources?.eyebrow },
  ].filter((item): item is VerticalIndexItem => Boolean(item.label))

  return (
    <>
      <VerticalSectionIndex items={indexItems} />

      <VerticalHero
        icon={icon}
        eyebrow={content?.eyebrow}
        hero={content?.hero}
        appHref={appHref}
        ctaId={`${ctaPrefix}_hero`}
        media={media?.console}
        mediaCaption={content?.how?.media_caption}
      />

      <VerticalTrustBand trust={content?.trust} logos={logos} />

      <VerticalStakes stakes={content?.stakes} pageId={ctaPrefix} quote={quotes?.stakes} />

      {/* Proof before the legal section: the frameworks then read as the
          documentation behind something that demonstrably happened, rather than
          as a vendor's assertion the reader has no reason to credit yet. */}
      <VerticalProof
        proof={content?.proof}
        pageId={ctaPrefix}
        caseStudy={caseStudy}
        quote={quotes?.proof}
        appHref={appHref}
        ctaId={`${ctaPrefix}_proof`}
        caseStudyCtaId={`${ctaPrefix}_case_study`}
      />

      <VerticalLegal legal={content?.legal} pageId={ctaPrefix} appHref={appHref} ctaId={`${ctaPrefix}_legal`} />

      <VerticalHowItRuns how={content?.how} pageId={ctaPrefix} quote={quotes?.how} media={{ ballot: media?.ballot }} />

      <VerticalTimeline timeline={content?.timeline} pageId={ctaPrefix} />

      <VerticalComparison comparison={content?.comparison} pageId={ctaPrefix} />

      <VerticalEngagement
        engagement={content?.engagement}
        pageId={ctaPrefix}
        appHref={appHref}
        ctaId={`${ctaPrefix}_engagement`}
        pricingHref={pricingHref}
        pricingCtaId={`${ctaPrefix}_pricing`}
      />

      <VerticalFitBySize sizes={content?.sizes} pageId={ctaPrefix} />

      <VerticalFaq faq={content?.faq} pageId={ctaPrefix} />

      <VerticalForYourBoard board={content?.board} pageId={ctaPrefix} />

      <VerticalClosingCta
        closing={content?.closing}
        pageId={ctaPrefix}
        appHref={appHref}
        ctaId={`${ctaPrefix}_closing`}
      />

      <VerticalResources resources={content?.resources} pageId={ctaPrefix} links={resourceLinks} />
    </>
  )
}

export default VerticalPage
