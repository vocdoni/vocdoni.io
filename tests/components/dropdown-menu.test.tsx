import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@radix-ui/react-dropdown-menu', () => {
  const React = require('react')
  const passthrough =
    (tag: string) =>
    ({ className, children, ...props }: any) =>
      React.createElement(tag, { className, ...props }, children)
  return {
    __esModule: true,
    Root: passthrough('div'),
    Trigger: passthrough('button'),
    Group: passthrough('div'),
    Portal: ({ children }: any) => children,
    Sub: passthrough('div'),
    RadioGroup: passthrough('div'),
    SubTrigger: passthrough('div'),
    SubContent: passthrough('div'),
    Content: passthrough('div'),
    Item: passthrough('div'),
    CheckboxItem: passthrough('div'),
    RadioItem: passthrough('div'),
    Label: passthrough('div'),
    Separator: passthrough('div'),
    ItemIndicator: passthrough('span'),
  }
})

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

describe('DropdownMenuItem', () => {
  it('uses pointer cursor for interactive items', () => {
    const html = renderToStaticMarkup(<DropdownMenuItem>Item</DropdownMenuItem>)
    expect(html).toContain('cursor-pointer')
  })
})
