import { Container } from '@/components/Container'
import { cn } from '@/lib/utils'

interface BlogHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  className?: string
}

// Compact editorial header for the blog index and category pages.
export function BlogHero({ eyebrow, title, subtitle, className }: BlogHeroProps) {
  return (
    <Container className={cn('max-w-3xl pt-10 text-center sm:pt-16', className)}>
      {eyebrow ? (
        <p className='mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary/80'>{eyebrow}</p>
      ) : null}
      <h1 className='text-4xl font-extrabold tracking-tight text-balance text-foreground sm:text-5xl'>{title}</h1>
      {subtitle ? (
        <p className='mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty'>{subtitle}</p>
      ) : null}
    </Container>
  )
}
