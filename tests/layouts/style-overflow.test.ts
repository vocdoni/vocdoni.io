import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

// Guards the overflow contract of layouts/style.css.
//
// Sticky elements (the navbar, the docs sidebar) attach to the nearest scroll
// container, which must stay the viewport. That only holds while `html` keeps
// `overflow: visible` on both axes: it is what lets body's overflow propagate
// to the viewport. With any non-visible overflow on `html` (the site used to
// put `overflow-x: clip` on `html, body`), body stops propagating and keeps
// its overflow for itself. It is harmless until a Radix modal (the docs
// version Select, a Dialog, a Sheet) locks scrolling with an inline
// `overflow: hidden` on body: body then becomes a scroll container, every
// sticky element re-attaches to it and scrolls away with the page. On the docs
// pages that showed as the sidebar jumping to the top (with the Select popover
// following it off screen) or vanishing whenever the version selector was
// opened after scrolling.
//
// Vitest runs without a layout engine, so this checks the stylesheet itself.

const STYLESHEET = path.resolve(__dirname, '../../layouts/style.css')
const OVERFLOW_PROPERTIES = ['overflow', 'overflow-x', 'overflow-y', 'overflow-block', 'overflow-inline']

interface Declaration {
  property: string
  value: string
}

/**
 * Collects the declarations that apply to `selector` anywhere in `css`,
 * including rules nested inside at-rules. Only element selectors written
 * exactly (e.g. `html`) are matched, which is all this stylesheet uses for the
 * root elements.
 */
export function declarationsFor(css: string, selector: string): Declaration[] {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const declarations: Declaration[] = []
  const rule = /([^{}]+)\{([^{}]*)\}/g
  let match: RegExpExecArray | null
  while ((match = rule.exec(withoutComments))) {
    const selectors = match[1].split(',').map((part) => part.trim())
    if (!selectors.includes(selector)) continue
    for (const declaration of match[2].split(';')) {
      const [property, ...rest] = declaration.split(':')
      if (!property || rest.length === 0) continue
      declarations.push({ property: property.trim(), value: rest.join(':').trim() })
    }
  }
  return declarations
}

function overflowDeclarations(css: string, selector: string): Declaration[] {
  return declarationsFor(css, selector).filter((declaration) => OVERFLOW_PROPERTIES.includes(declaration.property))
}

describe('layouts/style.css overflow contract', () => {
  const css = readFileSync(STYLESHEET, 'utf8')

  it('keeps html overflow visible so body overflow propagates to the viewport', () => {
    const nonVisible = overflowDeclarations(css, 'html').filter((declaration) => declaration.value !== 'visible')
    expect(nonVisible).toEqual([])
  })

  it('clips horizontal overflow on body, where it lands on the viewport', () => {
    expect(overflowDeclarations(css, 'body')).toEqual([{ property: 'overflow-x', value: 'clip' }])
  })
})

describe('declarationsFor', () => {
  it('flags the regression it exists for: overflow set on a shared html, body rule', () => {
    const regressed = `
      /* comment { html { overflow: hidden } } */
      html,
      body {
        overflow-x: clip;
      }
      @media (prefers-reduced-motion: no-preference) {
        html {
          scroll-behavior: smooth;
        }
      }
    `
    expect(declarationsFor(regressed, 'html')).toEqual([
      { property: 'overflow-x', value: 'clip' },
      { property: 'scroll-behavior', value: 'smooth' },
    ])
    expect(declarationsFor(regressed, 'body')).toEqual([{ property: 'overflow-x', value: 'clip' }])
  })
})
