export function Services() {
  return (
    <div className='h-screen flex items-center justify-center bg-muted/30'>
      <div className='max-w-4xl mx-auto px-4 text-center'>
        <h1 className='text-4xl md:text-6xl font-bold text-foreground mb-6'>Services</h1>
        <p className='text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
          Comprehensive solutions for organizations seeking secure, transparent, and efficient voting systems. From
          consultation to implementation and support.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
          <div className='p-6 bg-card rounded-lg border'>
            <h3 className='text-xl font-semibold mb-3'>Consultation</h3>
            <p className='text-muted-foreground'>Expert guidance for your voting needs</p>
          </div>
          <div className='p-6 bg-card rounded-lg border'>
            <h3 className='text-xl font-semibold mb-3'>Implementation</h3>
            <p className='text-muted-foreground'>Seamless deployment and integration</p>
          </div>
          <div className='p-6 bg-card rounded-lg border'>
            <h3 className='text-xl font-semibold mb-3'>Support</h3>
            <p className='text-muted-foreground'>24/7 technical support and maintenance</p>
          </div>
        </div>
      </div>
    </div>
  )
}
