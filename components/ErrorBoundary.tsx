import React from 'react'

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
      return (
        <div className='flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center'>
          <h2 className='text-2xl font-semibold'>Something went wrong</h2>
          <p className='text-muted-foreground max-w-md'>
            An unexpected error occurred. Please refresh the page or try again later.
          </p>
          <button
            className='rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90'
            onClick={() => this.setState({ error: null })}
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
