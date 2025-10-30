import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const paragraphVariants = cva('leading-relaxed', {
  variants: {
    variant: {
      default: 'text-muted-foreground',
      legal: 'text-foreground/90 mb-4',
      section: 'text-lg sm:text-2xl 2xl:text-3xl tracking-tight',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  compoundVariants: [
    // Size only applies to default and legal variants
    { variant: 'default', size: 'sm', class: 'text-sm' },
    { variant: 'default', size: 'md', class: 'text-base' },
    { variant: 'default', size: 'lg', class: 'text-lg' },
    { variant: 'legal', size: 'sm', class: 'text-sm' },
    { variant: 'legal', size: 'md', class: 'text-base' },
    { variant: 'legal', size: 'lg', class: 'text-lg' },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraphVariants> {}

export function Paragraph({ className, size, variant, ...props }: ParagraphProps) {
  return <p className={cn(paragraphVariants({ variant, size, className }))} {...props} />
}

const headingVariants = cva('', {
  variants: {
    variant: {
      default: 'font-bold tracking-tight text-foreground',
      legal: 'text-foreground',
      section: 'text-2xl md:text-3xl font-medium',
    },
    size: {
      h1: '',
      h2: '',
      h3: '',
      h4: '',
      h5: '',
      h6: '',
    },
  },
  compoundVariants: [
    // Default variant sizes
    { variant: 'default', size: 'h1', class: 'text-4xl sm:text-5xl' },
    { variant: 'default', size: 'h2', class: 'text-3xl sm:text-4xl' },
    { variant: 'default', size: 'h3', class: 'text-2xl sm:text-3xl' },
    { variant: 'default', size: 'h4', class: 'text-xl sm:text-2xl' },
    { variant: 'default', size: 'h5', class: 'text-lg sm:text-xl' },
    { variant: 'default', size: 'h6', class: 'text-base sm:text-lg' },
    // Legal variant sizes
    { variant: 'legal', size: 'h1', class: 'text-3xl md:text-4xl lg:text-5xl font-bold mb-4' },
    { variant: 'legal', size: 'h2', class: 'text-2xl md:text-3xl font-semibold mb-4 mt-8' },
    { variant: 'legal', size: 'h3', class: 'text-xl md:text-2xl font-medium mb-3' },
    { variant: 'legal', size: 'h4', class: 'text-lg md:text-xl font-medium mb-2' },
    { variant: 'legal', size: 'h5', class: 'text-base md:text-lg font-medium mb-2' },
    { variant: 'legal', size: 'h6', class: 'text-sm md:text-base font-medium mb-2' },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'h2',
  },
})

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    Omit<VariantProps<typeof headingVariants>, 'size'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function Heading({ as: Tag = 'h2', variant = 'default', className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ variant, size: Tag, className }))} {...props} />
}

// Allow syntax Heading.H1 / Heading.H2 / etc
Heading.H1 = (props: Omit<HeadingProps, 'as'>) => <Heading as='h1' {...props} />
Heading.H2 = (props: Omit<HeadingProps, 'as'>) => <Heading as='h2' {...props} />
Heading.H3 = (props: Omit<HeadingProps, 'as'>) => <Heading as='h3' {...props} />
Heading.H4 = (props: Omit<HeadingProps, 'as'>) => <Heading as='h4' {...props} />
Heading.H5 = (props: Omit<HeadingProps, 'as'>) => <Heading as='h5' {...props} />
Heading.H6 = (props: Omit<HeadingProps, 'as'>) => <Heading as='h6' {...props} />
