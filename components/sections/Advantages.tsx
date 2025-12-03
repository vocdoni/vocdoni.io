import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LuChevronLeft, LuChevronRight, LuCircleCheck, LuCircleX } from 'react-icons/lu'
import { Button } from '../ui/button'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, useCarousel } from '../ui/carousel'
import { Heading, Paragraph } from '../ui/typography'

function CarouselNavigation() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel()

  return (
    <>
      {canScrollPrev && (
        <Button
          variant='ghost'
          size='icon'
          onClick={scrollPrev}
          className='absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full z-20 bg-white/80 hover:bg-white shadow-sm'
          aria-label='Previous column'
        >
          <LuChevronLeft className='h-5 w-5' />
        </Button>
      )}
      {canScrollNext && (
        <Button
          variant='ghost'
          size='icon'
          onClick={scrollNext}
          className='absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full z-20 bg-white/80 hover:bg-white shadow-sm'
          aria-label='Next column'
        >
          <LuChevronRight className='h-5 w-5' />
        </Button>
      )}
    </>
  )
}

export function Advantages() {
  const { t } = useTranslation()
  const [api, setApi] = useState<CarouselApi>()
  const stickyTableRef = useRef<HTMLTableElement>(null)
  const carouselTablesRef = useRef<HTMLTableElement[]>([])

  const FEATURES = [
    {
      feature: t('features.privacy_security', { defaultValue: 'Privacy & Security' }),
      vocdoni: { text: t('features.vocdoni.privacy_security', { defaultValue: 'End-to-end encryption' }), good: true },
      traditional: { text: t('features.traditional.privacy_security', { defaultValue: 'Paper secrecy' }), good: true },
      other: { text: t('features.other.privacy_security', { defaultValue: 'Varies, often centralized' }), good: false },
    },
    {
      feature: t('features.remote_accessibility', { defaultValue: 'Remote Accessibility' }),
      vocdoni: {
        text: t('features.vocdoni.remote_accessibility', { defaultValue: 'Vote anywhere, any device' }),
        good: true,
      },
      traditional: {
        text: t('features.traditional.remote_accessibility', { defaultValue: 'In-person only' }),
        good: false,
      },
      other: { text: t('features.other.remote_accessibility', { defaultValue: 'Limited platforms' }), good: true },
    },
    {
      feature: t('features.transparency', { defaultValue: 'Transparency' }),
      vocdoni: {
        text: t('features.vocdoni.transparency', { defaultValue: 'Fully auditable, open-source' }),
        good: true,
      },
      traditional: { text: t('features.traditional.transparency', { defaultValue: 'Manual counts' }), good: false },
      other: { text: t('features.other.transparency', { defaultValue: 'Opaque systems' }), good: false },
    },
    {
      feature: t('features.scalability', { defaultValue: 'Scalability' }),
      vocdoni: { text: t('features.vocdoni.scalability', { defaultValue: 'Millions of votes, global' }), good: true },
      traditional: {
        text: t('features.traditional.scalability', { defaultValue: 'Slow, resource-heavy' }),
        good: false,
      },
      other: { text: t('features.other.scalability', { defaultValue: 'Limited load capacity' }), good: false },
    },
    {
      feature: t('features.cost_efficiency', { defaultValue: 'Cost-Efficiency' }),
      vocdoni: { text: t('features.vocdoni.cost_efficiency', { defaultValue: '≈10× cheaper' }), good: true },
      traditional: {
        text: t('features.traditional.cost_efficiency', { defaultValue: 'High logistics costs' }),
        good: false,
      },
      other: { text: t('features.other.cost_efficiency', { defaultValue: 'Moderate to high' }), good: false },
    },
    {
      feature: t('features.sustainability', { defaultValue: 'Sustainability' }),
      vocdoni: { text: t('features.vocdoni.sustainability', { defaultValue: 'Paperless, low carbon' }), good: true },
      traditional: {
        text: t('features.traditional.sustainability', { defaultValue: 'High paper/travel waste' }),
        good: false,
      },
      other: { text: t('features.other.sustainability', { defaultValue: 'Moderate impact' }), good: true },
    },
  ]

  const PLANS = [
    {
      key: 'vocdoni',
      label: t('plans.vocdoni', { defaultValue: 'Vocdoni' }),
      tone: 'bg-[#F4EFE8]',
      pick: (r: (typeof FEATURES)[number]) => r.vocdoni,
    },
    {
      key: 'trad',
      label: t('plans.traditional', { defaultValue: 'Traditional Voting' }),
      tone: 'bg-[#F7F3EE]',
      pick: (r: (typeof FEATURES)[number]) => r.traditional,
    },
    {
      key: 'other',
      label: t('plans.other', { defaultValue: 'Other Digital Voting' }),
      tone: 'bg-[#F9F7F3]',
      pick: (r: (typeof FEATURES)[number]) => r.other,
    },
  ]

  // Sync row heights across all tables (like a real table)
  useEffect(() => {
    if (!api) return

    const syncHeights = () => {
      const carouselTables = carouselTablesRef.current
      const stickyTable = stickyTableRef.current

      if (!carouselTables.length || !stickyTable) return

      const stickyRows = stickyTable.querySelectorAll<HTMLTableRowElement>('tbody tr')

      // For each row, find max height across all carousel tables
      stickyRows.forEach((_, rowIndex) => {
        let maxHeight = 0

        // Check all carousel tables for this row's height
        carouselTables.forEach((table) => {
          const row = table.querySelector<HTMLTableRowElement>(`tbody tr:nth-child(${rowIndex + 1})`)
          if (row) {
            // Reset height first to get natural height
            row.style.height = ''
            maxHeight = Math.max(maxHeight, row.getBoundingClientRect().height)
          }
        })

        // Also check sticky table's natural height
        const stickyRow = stickyRows[rowIndex]
        if (stickyRow) {
          stickyRow.style.height = ''
          maxHeight = Math.max(maxHeight, stickyRow.getBoundingClientRect().height)
        }

        // Apply max height to ALL tables for this row
        carouselTables.forEach((table) => {
          const row = table.querySelector<HTMLTableRowElement>(`tbody tr:nth-child(${rowIndex + 1})`)
          if (row) row.style.height = `${Math.ceil(maxHeight)}px`
        })

        if (stickyRow) {
          stickyRow.style.height = `${Math.ceil(maxHeight)}px`
        }
      })
    }

    // Sync on resize only (not on slide change - heights are consistent across all slides)
    api.on('resize', syncHeights)

    // Initial sync
    syncHeights()

    return () => {
      api.off('resize', syncHeights)
    }
  }, [api])

  return (
    <div className='min-h-viewport w-full grid bg-[#F9F7F3]'>
      {/* Intro */}
      <div className='flex flex-col items-center justify-center py-6 md:py-8'>
        <div className='w-full px-6 flex flex-col gap-3 md:gap-4 lg:mt-12'>
          <Heading variant='section'>→ {t('advantage.title', { defaultValue: 'The Vocdoni advantage' })}</Heading>
          <Paragraph variant='section'>
            {t('advantage.description', {
              defaultValue:
                'See how Vocdoni outperforms traditional and digital voting platforms in security, cost, scalability, and transparency, with the added power of open-source technology.',
            })}
          </Paragraph>
        </div>
      </div>

      {/* ====== MOBILE: Features + Carousel */}
      <div className='xl:hidden flex-1 flex flex-col justify-end'>
        <div className='flex bg-[#F7F2EB] w-full'>
          <table ref={stickyTableRef} className='sticky-table w-40 shrink-0 sticky left-0 z-10 bg-[#F7F2EB]'>
            <thead>
              <tr>
                <th className='px-4 pt-4 pb-3 text-lg font-semibold text-left invisible' aria-hidden='true'>
                  Features
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-black/10'>
              {FEATURES.map((r, i) => (
                <tr key={i} className='border-none'>
                  <td className='px-4 text-sm text-muted-foreground leading-[1.35]'>
                    <div className='border-b-2 py-3'>{r.feature}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className='shrink-0 grow-0 overflow-hidden relative'
            style={{ width: 'calc(100vw - 10rem)', maxWidth: 'calc(100vw - 10rem)' }}
          >
            <Carousel
              className='w-full h-full'
              setApi={setApi}
              opts={{
                align: 'start',
                loop: false,
                containScroll: 'trimSnaps',
                dragFree: false,
                slidesToScroll: 'auto',
              }}
            >
              <CarouselContent className='!ml-0'>
                {PLANS.map((p, index) => (
                  <CarouselItem key={p.key} className='!pl-0 basis-full md:basis-1/2 grow-0 shrink-0'>
                    <table
                      ref={(el) => {
                        if (el) {
                          carouselTablesRef.current[index] = el
                        }
                      }}
                      className={`carousel-table ${p.tone} w-full h-full`}
                    >
                      <thead>
                        <tr>
                          <th className='px-3 pt-3 pb-3 text-lg font-semibold text-left'>{p.label}</th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-black/10'>
                        {FEATURES.map((r, i) => {
                          const cell = p.pick(r)
                          return (
                            <tr key={i} className='border-none'>
                              <td className='px-3'>
                                <div
                                  className={`flex items-center gap-2 py-3 ${i < FEATURES.length - 1 ? 'border-b-2' : ''}`}
                                >
                                  {cell.good === true && (
                                    <LuCircleCheck className='h-4 w-4 text-emerald-600 shrink-0' />
                                  )}
                                  {cell.good === false && <LuCircleX className='h-4 w-4 text-rose-600 shrink-0' />}
                                  <span className='text-sm leading-[1.35]'>{cell.text}</span>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNavigation />
            </Carousel>
          </div>
        </div>
      </div>

      {/* ====== DESKTOP ====== */}
      <div className='flex-1 items-end hidden xl:flex'>
        <table className='w-full border-collapse'>
          <thead>
            <tr>
              <th className='bg-[#f4efe8] px-6 py-4 2xl:pt-22 text-xl font-semibold text-left align-top'>
                <span className='opacity-0 select-none'>{t('features.title', { defaultValue: 'Features' })}</span>
              </th>
              {PLANS.map((p) => (
                <th key={p.key} className={`${p.tone} px-4 py-4 2xl:pt-22 text-xl font-semibold text-left align-top`}>
                  {p.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((r, i) => (
              <tr key={i}>
                <td className='bg-[#f4efe8] px-6 text-lg text-muted-foreground leading-[1.35]'>
                  <div className='py-4 border-b-2'>{r.feature}</div>
                </td>
                {PLANS.map((p) => {
                  const cell = p.pick(r)
                  return (
                    <td key={p.key} className={`${p.tone} px-4`}>
                      <div className='flex items-center gap-2 border-b-2 py-4'>
                        {cell.good === true && <LuCircleCheck className='h-4 w-4 text-emerald-600 shrink-0' />}
                        {cell.good === false && <LuCircleX className='h-4 w-4 text-rose-600 shrink-0' />}
                        <span className='text-lg leading-[1.35]'>{cell.text}</span>
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
