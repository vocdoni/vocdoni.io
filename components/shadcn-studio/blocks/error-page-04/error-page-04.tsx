import notFoundImage from '@/assets/404.webp'
import { Link } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { getLocalizedPath } from '@/lib/localized-path'
import type { Locale } from '@/locales'
import { useTranslation } from 'react-i18next'
import { usePageContext } from 'vike-react/usePageContext'

const ErrorPage = () => {
  const { is404, locale } = usePageContext() as { is404: boolean; locale: Locale }
  const { t } = useTranslation()

  const title = is404
    ? t('error_page.not_found_title', 'Page not found')
    : t('error_page.error_title', 'Something went wrong')
  const description = is404
    ? t('error_page.not_found_description', "The page you are looking for doesn't exist or has been moved.")
    : t('error_page.error_description', 'An unexpected error occurred. Please try again later.')

  return (
    <div className='flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-8 px-4 py-16'>
      <div className='w-full max-w-md'>
        <img src={notFoundImage} alt={title} className='mx-auto w-full object-contain' loading='lazy' />
      </div>
      <div className='flex flex-col items-center gap-4 text-center'>
        <h1 className='text-3xl sm:text-4xl'>{title}</h1>
        <p className='text-muted-foreground max-w-sm text-base'>{description}</p>
        <div className='flex gap-3 pt-2'>
          <Button asChild>
            <Link href={getLocalizedPath('/', locale)}>{t('error_page.go_home', 'Go home')}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
