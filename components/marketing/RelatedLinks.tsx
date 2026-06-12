import { ArrowUpRight } from 'lucide-react'

import { Container } from '@/components/Container'
import { Link } from '@/components/Link'
import { Section } from '@/components/Section'

export type RelatedLink = {
  label: string
  href: string
  description?: string
  external?: boolean
}

export type RelatedLinksProps = {
  title: string
  links: RelatedLink[]
}

export default function RelatedLinks({ title, links }: RelatedLinksProps) {
  if (!links || links.length === 0) return null

  return (
    <Section className='border-t border-border/60'>
      <Container>
        <h2 className='text-xl font-semibold tracking-tight sm:text-2xl mb-8'>{title}</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              variant='unstyled'
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className='group flex items-start justify-between gap-3 rounded-2xl border border-border/70 bg-background p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'
            >
              <span>
                <span className='block font-semibold group-hover:text-primary'>{link.label}</span>
                {link.description && (
                  <span className='mt-1 block text-sm text-muted-foreground'>{link.description}</span>
                )}
              </span>
              <ArrowUpRight className='size-5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary' />
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}
