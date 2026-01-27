import { SendIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const ContactForm = () => {
  return (
    <form className='space-y-6 p-6' onSubmit={(e) => e.preventDefault()}>
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Name Input */}
        <div className='space-y-2'>
          <Label htmlFor='name' className='text-sm font-medium'>
            Name *
          </Label>
          <Input
            type='text'
            id='name'
            className='h-12 border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all'
            placeholder='John Doe'
            required
          />
        </div>

        {/* Email Input */}
        <div className='space-y-2'>
          <Label htmlFor='email' className='text-sm font-medium'>
            Email *
          </Label>
          <Input
            type='email'
            id='email'
            className='h-12 border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all'
            placeholder='john@example.com'
            required
          />
        </div>
      </div>

      {/* Organization Input */}
      <div className='space-y-2'>
        <Label htmlFor='organization' className='text-sm font-medium'>
          Organization
        </Label>
        <Input
          type='text'
          id='organization'
          className='h-12 border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all'
          placeholder='Your company or organization'
        />
      </div>

      {/* Subject Input */}
      <div className='space-y-2'>
        <Label htmlFor='subject' className='text-sm font-medium'>
          Subject *
        </Label>
        <Input
          type='text'
          id='subject'
          className='h-12 border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all'
          placeholder='What can we help you with?'
          required
        />
      </div>

      {/* Message Input */}
      <div className='space-y-2'>
        <Label htmlFor='message' className='text-sm font-medium'>
          Message *
        </Label>
        <Textarea
          id='message'
          className='min-h-[160px] resize-none border-2 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all'
          placeholder='Tell us about your voting or governance needs...'
          required
        />
      </div>

      <div className='pt-2'>
        {/* Submit Button */}
        <Button type='submit' size='lg' className='w-full has-[>svg]:px-6'>
          Send Message
          <SendIcon className='ml-2 h-5 w-5' />
        </Button>
        <p className='text-xs text-muted-foreground mt-4 text-center'>
          By clicking the "Submit" button, you agree to the privacy policy.
        </p>
      </div>
    </form>
  )
}

export default ContactForm
