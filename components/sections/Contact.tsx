import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Contact() {
  return (
    <div className='h-screen w-full flex items-center justify-center bg-muted/30'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-6xl font-bold text-foreground mb-6'>Contact</h1>
          <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'>
            Ready to revolutionize your voting process? Get in touch with our team to discuss your requirements and see
            how Vocdoni can help.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
          {/* Contact Form */}
          <div className='bg-card p-6 rounded-lg border'>
            <h3 className='text-2xl font-semibold mb-6'>Send us a message</h3>
            <form className='space-y-4'>
              <div>
                <Input placeholder='Your Name' className='w-full' />
              </div>
              <div>
                <Input type='email' placeholder='Email Address' className='w-full' />
              </div>
              <div>
                <Input placeholder='Company' className='w-full' />
              </div>
              <div>
                <textarea
                  placeholder='Tell us about your project...'
                  className='w-full min-h-32 px-3 py-2 text-base ring-offset-background border border-input bg-background rounded-md placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none'
                />
              </div>
              <Button className='w-full'>Send Message</Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className='space-y-8'>
            <div>
              <h3 className='text-2xl font-semibold mb-6'>Get in Touch</h3>
              <div className='space-y-4'>
                <div>
                  <h4 className='font-medium mb-2'>Email</h4>
                  <p className='text-muted-foreground'>hello@vocdoni.io</p>
                </div>
                <div>
                  <h4 className='font-medium mb-2'>Location</h4>
                  <p className='text-muted-foreground'>Barcelona, Spain</p>
                </div>
                <div>
                  <h4 className='font-medium mb-2'>Follow Us</h4>
                  <div className='flex space-x-4'>
                    <Button variant='outline' size='sm'>
                      Twitter
                    </Button>
                    <Button variant='outline' size='sm'>
                      GitHub
                    </Button>
                    <Button variant='outline' size='sm'>
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
