import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CircleAlertIcon,
  ExternalLinkIcon,
  FileCheck2Icon,
  GithubIcon,
  ScanSearchIcon,
  ShieldCheckIcon,
} from 'lucide-react'
import coibExperience from '@/assets/images/success/coib_experience.webp'
import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Section } from '@/components/Section'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { MotionPreset } from '@/components/ui/motion-preset'

type EvidenceStatus = 'documented' | 'operational' | 'not_published'

type EvidenceItem = {
  title: string
  status: EvidenceStatus
  summary: string
  limit: string
  sourceLabel: string
  sourceHref: string
}

const statusStyles: Record<EvidenceStatus, string> = {
  documented: 'border-primary/20 bg-primary/8 text-primary',
  operational: 'border-border bg-secondary text-foreground',
  not_published: 'border-warning/30 bg-warning/10 text-foreground',
}

// This proof page is intentionally English-only until its evidence has a reviewed translation.
// Keeping the copy beside the page prevents unreviewed machine translations from changing claim limits.
const pageCopy = (_key: string, defaultValue: string) => defaultValue

export default function SecurityAccessibilityPage() {
  const evidence: EvidenceItem[] = [
    {
      title: pageCopy('security_accessibility.evidence.items.result.title', 'Result and tally verification'),
      status: 'documented',
      summary: pageCopy(
        'security_accessibility.evidence.items.result.summary',
        'Vocdoni publishes election records that voters and observers can inspect. The public explorer exposes election data and result evidence without requiring a private vendor report.'
      ),
      limit: pageCopy(
        'security_accessibility.evidence.items.result.limit',
        'This proves the recorded result can be checked. It is different from a complete log of every administrative action.'
      ),
      sourceLabel: pageCopy('security_accessibility.evidence.items.result.source', 'Open the public vote explorer'),
      sourceHref: 'https://explorer.vote',
    },
    {
      title: pageCopy('security_accessibility.evidence.items.code.title', 'Protocol and source code'),
      status: 'documented',
      summary: pageCopy(
        'security_accessibility.evidence.items.code.summary',
        'Vocdoni publishes its source code and protocol work. A technical reviewer can inspect the implementation instead of relying only on marketing statements.'
      ),
      limit: pageCopy(
        'security_accessibility.evidence.items.code.limit',
        'Public code enables review. It does not replace a review of your election setup, access controls, and operating process.'
      ),
      sourceLabel: pageCopy('security_accessibility.evidence.items.code.source', 'Inspect Vocdoni on GitHub'),
      sourceHref: 'https://github.com/vocdoni',
    },
    {
      title: pageCopy('security_accessibility.evidence.items.authentication.title', 'Voter authentication in practice'),
      status: 'operational',
      summary: pageCopy(
        'security_accessibility.evidence.items.authentication.summary',
        'COIB used SMS or email two-factor authentication for its 2025 annual general meeting. Members could vote remotely or in person from their own devices.'
      ),
      limit: pageCopy(
        'security_accessibility.evidence.items.authentication.limit',
        'This is evidence from one named deployment. Your authentication method should match the risk and rules of your election.'
      ),
      sourceLabel: pageCopy('security_accessibility.evidence.items.authentication.source', 'Read the COIB case study'),
      sourceHref: '/case-studies/coib',
    },
    {
      title: pageCopy('security_accessibility.evidence.items.privacy.title', 'Privacy and data handling'),
      status: 'documented',
      summary: pageCopy(
        'security_accessibility.evidence.items.privacy.summary',
        'Vocdoni publishes a privacy policy and a plain-language GDPR guide. They explain the voter census, ballot secrecy, data minimization, retention, and processor roles.'
      ),
      limit: pageCopy(
        'security_accessibility.evidence.items.privacy.limit',
        'These documents support a buyer review. They are not an independent legal opinion or a security certification.'
      ),
      sourceLabel: pageCopy('security_accessibility.evidence.items.privacy.source', 'Read the privacy policy'),
      sourceHref: '/privacy',
    },
    {
      title: pageCopy(
        'security_accessibility.evidence.items.admin_log.title',
        'Administrative event log and evidence export'
      ),
      status: 'not_published',
      summary: pageCopy(
        'security_accessibility.evidence.items.admin_log.summary',
        'The public website does not currently publish a field-level specification for administrative events, retention periods, or downloadable evidence exports.'
      ),
      limit: pageCopy(
        'security_accessibility.evidence.items.admin_log.limit',
        'Ask Vocdoni to show the exact records available for your plan before you treat the term audit trail as a complete evidence package.'
      ),
      sourceLabel: pageCopy('security_accessibility.evidence.items.admin_log.source', 'Ask about election evidence'),
      sourceHref: '/contact',
    },
    {
      title: pageCopy(
        'security_accessibility.evidence.items.accessibility.title',
        'Accessibility conformance evidence'
      ),
      status: 'not_published',
      summary: pageCopy(
        'security_accessibility.evidence.items.accessibility.summary',
        'The public website does not currently link to a dated accessibility audit, a conformance report, or documented assistive-technology test results.'
      ),
      limit: pageCopy(
        'security_accessibility.evidence.items.accessibility.limit',
        'Ask for current test evidence if accessibility conformance is a procurement requirement. Do not substitute a general product claim for that evidence.'
      ),
      sourceLabel: pageCopy('security_accessibility.evidence.items.accessibility.source', 'Contact the Vocdoni team'),
      sourceHref: '/contact',
    },
  ]

  const statusLabels: Record<EvidenceStatus, string> = {
    documented: pageCopy('security_accessibility.status.documented', 'Publicly documented'),
    operational: pageCopy('security_accessibility.status.operational', 'Named deployment'),
    not_published: pageCopy('security_accessibility.status.not_published', 'Evidence not published'),
  }

  const checklist = [
    pageCopy(
      'security_accessibility.checklist.items.0',
      'Ask which voter actions and administrator actions are recorded, and how long each record is retained.'
    ),
    pageCopy(
      'security_accessibility.checklist.items.1',
      'Request a sample result record, verification flow, and evidence export before the election begins.'
    ),
    pageCopy(
      'security_accessibility.checklist.items.2',
      'Confirm who can verify a ballot and the final tally without access to a private administrator account.'
    ),
    pageCopy(
      'security_accessibility.checklist.items.3',
      'Match voter authentication to the stakes, eligibility rules, and dispute process for your organization.'
    ),
    pageCopy(
      'security_accessibility.checklist.items.4',
      'Ask for recent accessibility test evidence that covers the devices and assistive technology your members use.'
    ),
    pageCopy(
      'security_accessibility.checklist.items.5',
      'Record any evidence gap in the procurement decision instead of treating all security claims as equivalent.'
    ),
  ]

  return (
    <>
      <Section className='overflow-hidden pt-8 sm:pt-12 lg:pt-16'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center'>
            <MotionPreset fade blur slide transition={{ duration: 0.5 }} className='max-w-3xl'>
              <SectionHeader
                align='left'
                headingLevel='h1'
                eyebrow={pageCopy('security_accessibility.hero.eyebrow', 'Security and accessibility evidence')}
                title={pageCopy('security_accessibility.hero.title', 'Online voting audit trails: what Vocdoni proves')}
                lede={pageCopy(
                  'security_accessibility.hero.lede',
                  'A buyer should be able to separate public proof from a vendor promise. This evidence page shows what you can verify today, what one named organization used, and what is not yet published.'
                )}
                titleClassName='max-w-4xl text-5xl sm:text-6xl lg:text-7xl'
              />
              <div className='mt-8 flex flex-wrap items-center gap-4'>
                <Button asChild variant='dark' size='lg'>
                  <Link href='https://developer.vocdoni.io' variant='inlineIcon' ctaId='security_evidence_docs'>
                    {pageCopy('security_accessibility.hero.cta', 'Review the technical documentation')}
                    <ArrowRightIcon aria-hidden='true' />
                  </Link>
                </Button>
                <p className='text-faint text-sm'>
                  {pageCopy('security_accessibility.hero.reviewed', 'Evidence reviewed 2 September 2026')}
                </p>
              </div>
            </MotionPreset>

            <MotionPreset
              fade
              blur
              slide
              delay={0.15}
              transition={{ duration: 0.5 }}
              className='relative rounded-card bg-surface-dark p-6 text-surface-dark-foreground shadow-panel sm:p-8'
            >
              <div className='absolute top-6 right-6 size-24 rounded-full bg-primary/20 blur-3xl' aria-hidden='true' />
              <div className='relative'>
                <div className='mb-8 flex items-center justify-between border-b border-surface-dark-foreground/15 pb-5'>
                  <span className='font-mono text-xs uppercase tracking-[0.16em] text-surface-dark-foreground/60'>
                    {pageCopy('security_accessibility.hero.panel.label', 'Evidence index')}
                  </span>
                  <ShieldCheckIcon className='size-5 text-primary' aria-hidden='true' />
                </div>
                <div className='space-y-6'>
                  <div className='grid grid-cols-[auto_1fr] items-start gap-4'>
                    <span className='font-mono text-3xl text-primary'>04</span>
                    <div>
                      <p className='font-medium'>
                        {pageCopy('security_accessibility.hero.panel.public_title', 'Public sources')}
                      </p>
                      <p className='mt-1 text-sm leading-6 text-surface-dark-foreground/60'>
                        {pageCopy(
                          'security_accessibility.hero.panel.public_text',
                          'Explorer, source code, privacy policy, and technical documentation'
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='grid grid-cols-[auto_1fr] items-start gap-4'>
                    <span className='font-mono text-3xl text-primary'>01</span>
                    <div>
                      <p className='font-medium'>
                        {pageCopy('security_accessibility.hero.panel.case_title', 'Named deployment')}
                      </p>
                      <p className='mt-1 text-sm leading-6 text-surface-dark-foreground/60'>
                        {pageCopy(
                          'security_accessibility.hero.panel.case_text',
                          'COIB used two-factor authentication and hybrid participation in 2025'
                        )}
                      </p>
                    </div>
                  </div>
                  <div className='grid grid-cols-[auto_1fr] items-start gap-4'>
                    <span className='font-mono text-3xl text-warning'>02</span>
                    <div>
                      <p className='font-medium'>
                        {pageCopy('security_accessibility.hero.panel.gaps_title', 'Published evidence gaps')}
                      </p>
                      <p className='mt-1 text-sm leading-6 text-surface-dark-foreground/60'>
                        {pageCopy(
                          'security_accessibility.hero.panel.gaps_text',
                          'Administrative event-log specification and dated accessibility conformance evidence'
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionPreset>
          </div>
        </Container>
      </Section>

      <Section className='bg-muted' aria-labelledby='audit-trail-answer'>
        <Container>
          <div className='grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16'>
            <div>
              <p className='font-mono text-xs uppercase tracking-[0.16em] text-primary'>
                {pageCopy('security_accessibility.answer.label', 'Direct answer')}
              </p>
              <h2 id='audit-trail-answer' className='mt-4 text-4xl sm:text-5xl'>
                {pageCopy('security_accessibility.answer.title', 'Does Vocdoni provide an online voting audit trail?')}
              </h2>
            </div>
            <div className='space-y-5 text-lg leading-8 text-muted-foreground'>
              <p>
                {pageCopy(
                  'security_accessibility.answer.paragraphs.0',
                  'Vocdoni provides public, cryptographic evidence for checking an election result. Voters can confirm inclusion, and observers can inspect the published tally evidence without asking Vocdoni to certify its own result.'
                )}
              </p>
              <p>
                {pageCopy(
                  'security_accessibility.answer.paragraphs.1',
                  'That evidence is an important part of an online voting audit trail. It is not the same as a complete administrative event log showing every login, configuration change, permission change, message, and export.'
                )}
              </p>
              <p className='border-l-2 border-primary pl-5 text-foreground'>
                {pageCopy(
                  'security_accessibility.answer.paragraphs.2',
                  'The accurate answer is: the result proof is public and inspectable, while the full administrative evidence specification is not publicly documented on this website.'
                )}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby='evidence-register'>
        <Container>
          <SectionHeader
            id='evidence-register'
            align='left'
            eyebrow={pageCopy('security_accessibility.evidence.eyebrow', 'Evidence register')}
            title={pageCopy('security_accessibility.evidence.title', 'What a buyer can inspect before procurement')}
            lede={pageCopy(
              'security_accessibility.evidence.lede',
              'Each row names the public evidence and its limit. This keeps a useful fact from becoming a broader claim than the source supports.'
            )}
          />

          <div className='mt-12 overflow-hidden rounded-card border border-border bg-background shadow-sm'>
            {evidence.map((item, index) => (
              <article
                key={item.title}
                className='grid gap-5 border-b border-border p-6 last:border-b-0 sm:p-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-10'
              >
                <div>
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                  >
                    {statusLabels[item.status]}
                  </span>
                  <h3 className='mt-4 text-2xl'>{item.title}</h3>
                  <span className='mt-3 block font-mono text-xs text-faint'>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className='space-y-4'>
                  <p className='leading-7 text-foreground'>{item.summary}</p>
                  <p className='text-sm leading-6 text-muted-foreground'>{item.limit}</p>
                  <Link href={item.sourceHref} variant='inlineIcon' className='text-sm font-medium text-primary'>
                    {item.sourceLabel}
                    {item.sourceHref.startsWith('http') ? (
                      <ExternalLinkIcon className='size-3.5' aria-hidden='true' />
                    ) : (
                      <ArrowRightIcon className='size-3.5' aria-hidden='true' />
                    )}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className='bg-secondary' aria-labelledby='accessibility-evidence'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16'>
            <div>
              <SectionHeader
                id='accessibility-evidence'
                align='left'
                eyebrow={pageCopy('security_accessibility.accessibility.eyebrow', 'Accessibility evidence')}
                title={pageCopy(
                  'security_accessibility.accessibility.title',
                  'Operational access is not conformance proof'
                )}
                lede={pageCopy(
                  'security_accessibility.accessibility.lede',
                  'The COIB case shows practical access across locations and devices. It does not replace a dated accessibility audit.'
                )}
              />
              <div className='mt-8 grid gap-5 sm:grid-cols-2'>
                <div className='rounded-card border border-border bg-background p-6 shadow-sm'>
                  <CheckCircle2Icon className='size-5 text-primary' aria-hidden='true' />
                  <h3 className='mt-4 text-xl'>
                    {pageCopy('security_accessibility.accessibility.proven.title', 'What the case shows')}
                  </h3>
                  <p className='mt-3 text-sm leading-6 text-muted-foreground'>
                    {pageCopy(
                      'security_accessibility.accessibility.proven.text',
                      'Members used SMS or email authentication, joined remotely or in person, and voted from their own devices with live help available.'
                    )}
                  </p>
                </div>
                <div className='rounded-card border border-warning/30 bg-warning/10 p-6'>
                  <CircleAlertIcon className='size-5 text-warning' aria-hidden='true' />
                  <h3 className='mt-4 text-xl'>
                    {pageCopy('security_accessibility.accessibility.missing.title', 'What is still missing')}
                  </h3>
                  <p className='mt-3 text-sm leading-6 text-muted-foreground'>
                    {pageCopy(
                      'security_accessibility.accessibility.missing.text',
                      'The site does not link to a dated audit, test scope, assistive-technology matrix, or public conformance report.'
                    )}
                  </p>
                </div>
              </div>
            </div>

            <figure className='overflow-hidden rounded-card border border-border bg-background shadow-panel'>
              <img
                src={coibExperience}
                alt={pageCopy(
                  'security_accessibility.accessibility.image_alt',
                  'COIB members taking part in a hybrid annual general meeting'
                )}
                className='aspect-[4/3] w-full object-cover'
              />
              <figcaption className='border-t border-border p-5 text-sm leading-6 text-muted-foreground'>
                {pageCopy(
                  'security_accessibility.accessibility.caption',
                  'COIB ran its 2025 annual general meeting with remote and in-person participation. This is operational evidence, not a universal accessibility test.'
                )}
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby='buyer-checklist'>
        <Container>
          <div className='grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16'>
            <SectionHeader
              id='buyer-checklist'
              align='left'
              eyebrow={pageCopy('security_accessibility.checklist.eyebrow', 'Buyer checklist')}
              title={pageCopy(
                'security_accessibility.checklist.title',
                'Six checks before you approve a voting system'
              )}
              lede={pageCopy(
                'security_accessibility.checklist.lede',
                'Use these questions in procurement, a security review, or a board paper. Save the answers before the vote opens.'
              )}
            />
            <ol className='grid gap-4 sm:grid-cols-2'>
              {checklist.map((item, index) => (
                <li key={item} className='rounded-card border border-border bg-background p-6 shadow-sm'>
                  <span className='font-mono text-sm text-primary'>{String(index + 1).padStart(2, '0')}</span>
                  <p className='mt-4 leading-7 text-muted-foreground'>{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      <Section className='bg-muted' aria-labelledby='source-paths'>
        <Container>
          <SectionHeader
            id='source-paths'
            eyebrow={pageCopy('security_accessibility.sources.eyebrow', 'Related evidence')}
            title={pageCopy('security_accessibility.sources.title', 'Follow the proof, not a summary claim')}
            lede={pageCopy(
              'security_accessibility.sources.lede',
              'These pages explain the security model, the verification method, privacy responsibilities, and one named deployment.'
            )}
          />
          <div className='mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {[
              {
                icon: ShieldCheckIcon,
                title: pageCopy('security_accessibility.sources.items.secure.title', 'Security model'),
                text: pageCopy(
                  'security_accessibility.sources.items.secure.text',
                  'How authentication, secrecy, and tally proof work together.'
                ),
                href: '/learn/how-secure-online-voting-works',
              },
              {
                icon: ScanSearchIcon,
                title: pageCopy('security_accessibility.sources.items.verify.title', 'Verifiable voting'),
                text: pageCopy(
                  'security_accessibility.sources.items.verify.text',
                  'How voters and observers check a published result.'
                ),
                href: '/learn/verifiable-voting-explained',
              },
              {
                icon: FileCheck2Icon,
                title: pageCopy('security_accessibility.sources.items.gdpr.title', 'GDPR guide'),
                text: pageCopy(
                  'security_accessibility.sources.items.gdpr.text',
                  'How voter data, ballot secrecy, and retention fit together.'
                ),
                href: '/learn/gdpr-requirements-for-digital-voting',
              },
              {
                icon: GithubIcon,
                title: pageCopy('security_accessibility.sources.items.coib.title', 'COIB case study'),
                text: pageCopy(
                  'security_accessibility.sources.items.coib.text',
                  'How one professional body ran a secure hybrid vote.'
                ),
                href: '/case-studies/coib',
              },
            ].map(({ icon: Icon, title, text, href }) => (
              <Link
                key={href}
                href={href}
                variant='unstyled'
                className='group rounded-card border border-border bg-background p-6 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-lg'
              >
                <Icon className='size-5 text-primary' aria-hidden='true' />
                <h3 className='mt-5 text-xl'>{title}</h3>
                <p className='mt-3 text-sm leading-6 text-muted-foreground'>{text}</p>
                <span className='mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary'>
                  {pageCopy('security_accessibility.sources.read', 'Read source')}
                  <ArrowRightIcon
                    className='size-4 transition-transform duration-150 group-hover:translate-x-1'
                    aria-hidden='true'
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
