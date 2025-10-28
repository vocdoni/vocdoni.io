import { CheckCircle2, XCircle } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { CarouselDots } from '../ui/carousel-dots'
import { Heading } from '../ui/typography'

export function Advantages() {
  const { t } = useTranslation()
  const rootRef = useRef<HTMLDivElement | null>(null)

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

  useEffect(() => {
    if (!rootRef.current) return

    const calc = () => {
      const map = new Map<number, HTMLLIElement[]>()
      rootRef.current!.querySelectorAll<HTMLLIElement>('li[data-row]').forEach((el) => {
        const i = Number(el.dataset.row)
        if (!map.has(i)) map.set(i, [])
        el.style.height = ''
        map.get(i)!.push(el)
      })
      map.forEach((els) => {
        const max = Math.max(...els.map((e) => e.getBoundingClientRect().height))
        els.forEach((e) => (e.style.height = `${Math.ceil(max)}px`))
      })
    }

    calc()
  }, [])

  return (
    <div className='min-h-screen w-full grid grid-cols-1'>
      {/* Intro */}
      <div className='flex flex-col'>
        <div className='flex-1 bg-background flex flex-col items-center justify-center'>
          <div className='w-full px-6 flex flex-col gap-6'>
            <Heading variant='section'>→ {t('advantage.title', { defaultValue: 'The Vocdoni advantage' })}</Heading>
            <p className='text-sm sm:text-2xl md:text-3xl leading-relaxed tracking-tight'>
              {t('advantage.description', {
                defaultValue:
                  'See how Vocdoni outperforms traditional and digital voting platforms in security, cost, scalability, and transparency, with the added power of open-source technology.',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* ====== MOBILE: Features + Carousel */}
      <div ref={rootRef} className='xl:hidden  flex items-end'>
        <div className='flex items-start bg-[#F7F2EB]'>
          <div className='w-40 shrink-0 p-6 sticky left-0 z-10 border-r border-black/10 relative flex flex-col justify-end'>
            <h3 className='text-lg font-semibold mb-4 invisible' aria-hidden='true'>
              Features
            </h3>
            <ul className='divide-y divide-black/10'>
              {FEATURES.map((r, i) => (
                <li key={i} data-row={i} className='py-4 leading-[1.35] flex items-center'>
                  <span className='text-sm text-muted-foreground'>{r.feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div
            className='shrink-0 grow-0 overflow-hidden'
            style={{ width: 'calc(100vw - 10rem)', maxWidth: 'calc(100vw - 10rem)' }}
          >
            <Carousel
              className='w-full'
              opts={{
                align: 'start',
                loop: false,
                containScroll: 'trimSnaps',
                dragFree: false,
                slidesToScroll: 'auto',
              }}
            >
              <CarouselContent className='!ml-0'>
                {PLANS.map((p) => (
                  <CarouselItem key={p.key} className='!pl-0 basis-full md:basis-1/2 grow-0 shrink-0'>
                    <div className={`${p.tone} border-l border-black/10 flex flex-col justify-end`}>
                      <div className='p-6'>
                        <h3 className='text-lg font-semibold'>{p.label}</h3>
                        <ul className='divide-y divide-black/10 mt-4'>
                          {FEATURES.map((r, i) => {
                            const cell = p.pick(r)
                            return (
                              <li key={i} data-row={i} className='py-4 flex items-center'>
                                <div className='flex items-center gap-2'>
                                  {cell.good === true && <CheckCircle2 className='h-4 w-4 text-emerald-600 shrink-0' />}
                                  {cell.good === false && <XCircle className='h-4 w-4 text-rose-600 shrink-0' />}
                                  <span className='text-sm'>{cell.text}</span>
                                </div>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className='flex gap-4 px-4 py-3 items-center justify-center'>
                <CarouselPrevious className='static translate-x-0 translate-y-0' />
                <CarouselDots />
                <CarouselNext className='static translate-x-0 translate-y-0' />
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      {/* ====== DESKTOP ====== */}
      <div className='flex items-end'>
        <div className='hidden w-full xl:grid grid-cols-4 border-t border-black/5'>
          <div className='bg-[#F7F2EB] border-l border-black/5 first:border-l-0'>
            <div className='px-6 py-6'>
              <h3 className='text-xl font-semibold mb-6 opacity-0 select-none'>
                {t('features.title', { defaultValue: 'Features' })}
              </h3>
              <ul className='divide-y divide-black/10'>
                {FEATURES.map((r, i) => (
                  <li key={i} data-row={i} className='py-4 leading-[1.35] flex items-center'>
                    <span className='text-lg text-muted-foreground'>{r.feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {PLANS.map((p) => (
            <div key={p.key} className={`${p.tone} border-l border-black/5`}>
              <div className='p-6'>
                <h3 className='text-xl font-semibold mb-6'>{p.label}</h3>
                <ul className='divide-y divide-black/10 mt-4'>
                  {FEATURES.map((r, i) => {
                    const cell = p.pick(r)
                    return (
                      <li key={i} data-row={i} className='py-4'>
                        <div className='flex items-center gap-2'>
                          {cell.good === true && <CheckCircle2 className='h-4 w-4 text-emerald-600 shrink-0' />}
                          {cell.good === false && <XCircle className='h-4 w-4 text-rose-600 shrink-0' />}
                          <span className='text-lg'>{cell.text}</span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
