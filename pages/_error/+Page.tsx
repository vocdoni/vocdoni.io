import { usePageContext } from 'vike-react/usePageContext'

export default function Page() {
  const { is404 } = usePageContext()
  const title = is404 ? 'Page Not Found' : 'Internal Error'
  const description = is404 ? 'This page could not be found.' : 'Something went wrong.'

  return (
    <div className='min-h-screen bg-background pt-24 px-4'>
      <div className='mx-auto flex max-w-2xl flex-col items-center justify-center text-center gap-3 py-16'>
        <h1 className='text-3xl font-semibold sm:text-4xl'>{title}</h1>
        <p className='text-muted-foreground text-base sm:text-lg'>{description}</p>
      </div>
    </div>
  )
}
