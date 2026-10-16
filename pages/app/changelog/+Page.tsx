import ChangelogHero from '@/components/app/changelog/ChangelogHero'
import ChangelogTimeline from '@/components/app/changelog/ChangelogTimeline'

export default function Page() {
  return (
    <div className='flex flex-col min-h-screen'>
      <ChangelogHero />
      <div className='via-primary/20 mx-auto h-px w-4/5 bg-linear-to-r from-transparent to-transparent' />
      <ChangelogTimeline />
    </div>
  )
}
