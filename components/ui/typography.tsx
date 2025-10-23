import { cn } from '@/lib/utils'

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'legal'
}

export function Paragraph({ className, size = 'md', variant = 'default', ...props }: ParagraphProps) {
  const sizes = {
    sm: 'text-sm leading-relaxed',
    md: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
  }

  const variants = {
    default: 'text-muted-foreground',
    legal: 'text-foreground/90 mb-4',
  }

  return <p className={cn(variants[variant], sizes[size], className)} {...props} />
}

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  variant?: 'default' | 'legal'
}

const base = 'font-bold tracking-tight text-foreground'

const sizeVariants: Record<string, string> = {
  h1: 'text-4xl sm:text-5xl',
  h2: 'text-3xl sm:text-4xl',
  h3: 'text-2xl sm:text-3xl',
  h4: 'text-xl sm:text-2xl',
  h5: 'text-lg sm:text-xl',
  h6: 'text-base sm:text-lg',
}

const legalVariants: Record<string, string> = {
  h1: 'text-3xl md:text-4xl lg:text-5xl font-bold mb-4',
  h2: 'text-2xl md:text-3xl font-semibold mb-4 mt-8',
  h3: 'text-xl md:text-2xl font-medium mb-3',
  h4: 'text-lg md:text-xl font-medium mb-2',
  h5: 'text-base md:text-lg font-medium mb-2',
  h6: 'text-sm md:text-base font-medium mb-2',
}

export function Heading({ as: Tag = 'h2', variant = 'default', className, ...props }: HeadingProps) {
  const variantClass = variant === 'legal' ? legalVariants[Tag] : sizeVariants[Tag]
  const baseClass = variant === 'default' ? base : 'text-foreground'

  return <Tag className={cn(baseClass, variantClass, className)} {...props} />
}

// Allow syntax Heading.H1 / Heading.H2 / etc
Heading.H1 = (props: Omit<HeadingProps, 'as'>) => <Heading as='h1' {...props} />
Heading.H2 = (props: Omit<HeadingProps, 'as'>) => <Heading as='h2' {...props} />
Heading.H3 = (props: Omit<HeadingProps, 'as'>) => <Heading as='h3' {...props} />
Heading.H4 = (props: Omit<HeadingProps, 'as'>) => <Heading as='h4' {...props} />
Heading.H5 = (props: Omit<HeadingProps, 'as'>) => <Heading as='h5' {...props} />
Heading.H6 = (props: Omit<HeadingProps, 'as'>) => <Heading as='h6' {...props} />
