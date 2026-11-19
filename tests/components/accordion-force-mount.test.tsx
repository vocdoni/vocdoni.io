// @vitest-environment jsdom
// Tests that AccordionContent with forceMount renders closed answers into SSR markup
// and visually hides them with CSS rather than the HTML hidden attribute.

import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function FaqAccordion({ forceMount = false }: { forceMount?: boolean }) {
  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='q1'>
        <AccordionTrigger>Question one</AccordionTrigger>
        <AccordionContent forceMount={forceMount || undefined}>Answer one</AccordionContent>
      </AccordionItem>
      <AccordionItem value='q2'>
        <AccordionTrigger>Question two</AccordionTrigger>
        <AccordionContent forceMount={forceMount || undefined}>Answer two</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

// ---------------------------------------------------------------------------
// SSR tests — without forceMount (baseline: Radix unmounts closed content)
// ---------------------------------------------------------------------------

describe('AccordionContent without forceMount (default)', () => {
  it('does not include closed answer text in the server-rendered markup', () => {
    const html = renderToStaticMarkup(<FaqAccordion forceMount={false} />)
    expect(html).not.toContain('Answer one')
    expect(html).not.toContain('Answer two')
  })
})

// ---------------------------------------------------------------------------
// SSR tests — with forceMount
// ---------------------------------------------------------------------------

describe('AccordionContent with forceMount', () => {
  it('includes closed answer text in the server-rendered markup', () => {
    const html = renderToStaticMarkup(<FaqAccordion forceMount />)
    expect(html).toContain('Answer one')
    expect(html).toContain('Answer two')
  })

  it('renders data-[state=closed]:hidden CSS class on closed content', () => {
    const html = renderToStaticMarkup(<FaqAccordion forceMount />)
    expect(html).toContain('data-[state=closed]:hidden')
  })

  it('does not render the hidden HTML attribute on closed content', () => {
    const html = renderToStaticMarkup(<FaqAccordion forceMount />)
    // Radix sets hidden=!isOpen; with forceMount isPresent=true so isOpen=true → no hidden attr
    expect(html).not.toMatch(/ hidden[= >]/)
  })
})

// ---------------------------------------------------------------------------
// Client-side toggle test
// ---------------------------------------------------------------------------

describe('AccordionContent with forceMount — toggle opens item', () => {
  it('shows item content after clicking the trigger', async () => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    render(<FaqAccordion forceMount />)

    // Both items are in the DOM even when closed (forceMount)
    expect(screen.getByText('Answer one')).toBeInTheDocument()
    expect(screen.getByText('Answer two')).toBeInTheDocument()

    // Trigger starts closed
    const trigger = screen.getByRole('button', { name: 'Question one' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    // Click to open
    const user = userEvent.setup()
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })
})
