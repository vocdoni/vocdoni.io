import React from 'react'
import { useTranslation } from 'react-i18next'

function ErrorFallback({ onReset }: { onReset: () => void }) {
  const { t } = useTranslation()
  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center'>
      <h2 className='text-2xl font-semibold'>{t('error_page.error_title', 'Something went wrong')}</h2>
      <p className='text-muted-foreground max-w-md'>
        {t('error_page.error_description', 'An unexpected error occurred. Please try again later.')}
      </p>
      <button
        className='rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90'
        onClick={onReset}
      >
        {t('error_page.try_again', 'Try again')}
      </button>
    </div>
  )
}

interface State {
  error: Error | null
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return <ErrorFallback onReset={() => this.setState({ error: null })} />
    }

    return this.props.children
  }
}
