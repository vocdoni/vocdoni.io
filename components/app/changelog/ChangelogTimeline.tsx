import { changelogEntries } from './changelog-data'
import ChangelogTimelineItem from './ChangelogTimelineItem'
import ChangelogBadgeAccordion from './ChangelogBadgeAccordion'

const ChangelogTimeline = () => {
  return (
    <section>
      <div className='mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-16'>
        <div className='flex flex-col items-start'>
          {changelogEntries.map((entry) => (
            <ChangelogTimelineItem key={entry.version} version={entry.version} date={entry.date}>
              <div className='space-y-4'>
                <div className='space-y-3'>
                  <h2 className='text-xl font-semibold'>{entry.title}</h2>
                  <p className='text-muted-foreground text-sm'>{entry.description}</p>
                </div>
                {entry.bullets && entry.bullets.length > 0 && (
                  <ul className='text-muted-foreground list-inside list-disc space-y-2 text-sm'>
                    {entry.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
                <ChangelogBadgeAccordion data={entry.categories} />
              </div>
            </ChangelogTimelineItem>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ChangelogTimeline
