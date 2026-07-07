import type { BlogAuthor } from '@/lib/blog/content'
import { authorInitials } from '@/lib/blog/format'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface AuthorBylineProps {
  authors: BlogAuthor[]
  meta?: React.ReactNode
  size?: 'sm' | 'md'
  className?: string
}

// Avatar stack + author name(s), with optional meta line (date · reading time).
export function AuthorByline({ authors, meta, size = 'md', className }: AuthorBylineProps) {
  if (!authors.length) {
    return meta ? <div className={cn('text-sm text-muted-foreground', className)}>{meta}</div> : null
  }

  const avatarSize = size === 'sm' ? 'size-8' : 'size-10'
  const names = authors.map((a) => a.name).join(', ')
  const role = authors.length === 1 ? authors[0].role : undefined

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className='flex -space-x-2'>
        {authors.map((author) => (
          <Avatar key={author.slug} className={cn(avatarSize, 'ring-2 ring-background')}>
            {author.avatar ? <AvatarImage src={author.avatar} alt={author.name} /> : null}
            <AvatarFallback className='text-xs font-medium'>{authorInitials(author.name)}</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className='min-w-0'>
        <p className='truncate text-sm font-medium text-foreground'>{names}</p>
        {role ? <p className='truncate text-xs text-muted-foreground'>{role}</p> : null}
        {meta ? <p className='truncate text-xs text-muted-foreground'>{meta}</p> : null}
      </div>
    </div>
  )
}
