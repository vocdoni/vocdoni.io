// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'

describe('jsdom smoke test', () => {
  it('renders a button and handles click', async () => {
    const { container } = render(<button>hi</button>)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('hi')

    const user = userEvent.setup()
    await user.click(button)
  })
})
