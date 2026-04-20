import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {}

export function Section({ className, ...props }: SectionProps) {
  return (
    <section
      className={cn('py-section sm:py-section-md lg:py-section-lg', className)}
      {...props}
    />
  )
}
