import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

type Testimonial = {
  name: string
  handle: string
  avatar: string
  rating: number
  title: string
  content: string
  platformName: string
  platformImage: string
  logo?: string
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className='break-inside-avoid-column border-2 border-border shadow-sm'>
      <CardContent className='flex flex-col gap-6 pt-6'>
        {/* Testimonial Content */}
        <div className='space-y-2'>
          <h3 className='text-base font-semibold'>{testimonial.title}</h3>
          <p className='text-muted-foreground text-sm'>{testimonial.content}</p>
        </div>

        {/* User Details */}
        <div className='flex items-center gap-3'>
          <Avatar className='size-10'>
            <AvatarImage
              src={testimonial.logo ?? testimonial.avatar}
              alt={testimonial.logo ? testimonial.platformName : testimonial.name}
              className={testimonial.logo ? 'object-cover' : ''}
            />
            <AvatarFallback className='text-xs'>
              {testimonial.name
                .split(' ', 2)
                .map(n => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className='space-y-0.5'>
            <h4 className='text-sm font-medium'>{testimonial.name}</h4>
            <p className='text-muted-foreground text-xs'>{testimonial.handle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard
