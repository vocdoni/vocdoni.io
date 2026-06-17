import { describe, expect, it, vi } from 'vitest'

declare const __COMMIT_SHA__: string

const mockCommitSha = 'abc1234'

vi.stubGlobal('__COMMIT_SHA__', mockCommitSha)

vi.mock('vike-react/__internal/integration/onRenderHtml', () => ({
  onRenderHtml: vi.fn(),
}))

import { onRenderHtml as vikeReactOnRenderHtml } from 'vike-react/__internal/integration/onRenderHtml'

import onRenderHtml from '@/pages/+onRenderHtml'

const mockVikeReactOnRenderHtml = vi.mocked(vikeReactOnRenderHtml)

function flattenTemplate(tpl: {
  templateStrings: string[]
  templateVariables: (string | { _escaped: string })[]
}): string {
  let result = ''
  for (let i = 0; i < tpl.templateStrings.length; i++) {
    result += tpl.templateStrings[i]
    if (i < tpl.templateVariables.length) {
      const varVal = tpl.templateVariables[i]
      result += typeof varVal === 'string' ? varVal : varVal._escaped
    }
  }
  return result
}

describe('onRenderHtml', () => {
  const pageContext = { urlPathname: '/', Page: null } as any

  it('injects commit sha comment immediately after <html> tag', async () => {
    // Mirrors vike-react's escapeInject template: the <html> attributes are an
    // interpolated variable, not part of the string, so templateStrings.length
    // === templateVariables.length + 1.
    const originalTemplateStrings = [
      '<!DOCTYPE html>\n    <html',
      '>\n      <head>\n        <meta charset="UTF-8" />\n      </head>\n      <body>\n        <div id="root">',
      '</div>\n      </body>\n    </html>',
    ]

    // [htmlAttributesString, pageHtml]
    const originalTemplateVariables = ['', { _escaped: '' }]

    mockVikeReactOnRenderHtml.mockResolvedValue({
      _template: {
        templateStrings: originalTemplateStrings,
        templateVariables: originalTemplateVariables,
      },
    } as any)

    const result = await onRenderHtml(pageContext)

    expect(result).toBeDefined()
    expect(result._template).toBeDefined()
    expect(result._template.templateStrings).toBeDefined()
    expect(result._template.templateVariables).toBeDefined()

    const flattened = flattenTemplate(result._template as any)

    expect(flattened).toContain('<!DOCTYPE html>')
    expect(flattened).toContain('<head>')
    expect(flattened).toContain('<div id="root">')
    expect(flattened).toContain('</body>')
    expect(flattened).toContain('</html>')

    // The comment must sit immediately after the opening <html ...> tag's closing
    // '>', and before <head>.
    const htmlOpen = flattened.match(/<html[^>]*>/)
    expect(htmlOpen).not.toBeNull()
    const afterHtmlOpen = flattened.slice(htmlOpen!.index! + htmlOpen![0].length)
    expect(afterHtmlOpen.trimStart().startsWith('<!-- commit sha: abc1234 -->')).toBe(true)
    expect(flattened.indexOf('<head>')).toBeGreaterThan(flattened.indexOf('<!-- commit sha: abc1234 -->'))
  })

  it('preserves all HTML shell elements when injecting comment', async () => {
    // <html> and <body> attributes are interpolated variables in vike-react's
    // template, not part of the strings.
    const originalTemplateStrings = [
      '<!DOCTYPE html>\n    <html',
      '>\n      <head>\n        <title>Test</title>\n      </head>\n      <body',
      '>\n        <div id="root">',
      '</div>\n      </body>\n    </html>',
    ]

    // [htmlAttributesString, bodyAttributesString, pageHtml]
    const originalTemplateVariables = [' data-locale="en"', ' data-theme="light"', { _escaped: '<h1>Hello</h1>' }]

    mockVikeReactOnRenderHtml.mockResolvedValue({
      _template: {
        templateStrings: originalTemplateStrings,
        templateVariables: originalTemplateVariables,
      },
    } as any)

    const result = await onRenderHtml(pageContext)
    const flattened = flattenTemplate(result._template as any)

    // The html attribute must stay INSIDE the opening <html ...> tag, not be
    // pushed out after it by the splice.
    const htmlOpen = flattened.match(/<html[^>]*>/)
    expect(htmlOpen).not.toBeNull()
    expect(htmlOpen![0]).toContain('data-locale="en"')

    // The comment lands immediately after the opening <html ...> tag.
    const afterHtmlOpen = flattened.slice(htmlOpen!.index! + htmlOpen![0].length)
    expect(afterHtmlOpen.trimStart().startsWith('<!-- commit sha: abc1234 -->')).toBe(true)

    // Body attributes and content are preserved.
    const bodyOpen = flattened.match(/<body[^>]*>/)
    expect(bodyOpen).not.toBeNull()
    expect(bodyOpen![0]).toContain('data-theme="light"')
    expect(flattened).toContain('<title>Test</title>')
    expect(flattened).toContain('<h1>Hello</h1>')
  })

  it('returns original template if doctype not found', async () => {
    const originalTemplateStrings = ['<html>', '</html>']

    const originalTemplateVariables: string[] = []

    mockVikeReactOnRenderHtml.mockResolvedValue({
      _template: {
        templateStrings: originalTemplateStrings,
        templateVariables: originalTemplateVariables,
      },
    } as any)

    const result = await onRenderHtml(pageContext)
    const flattened = flattenTemplate(result._template as any)

    expect(flattened).toBe('<html></html>')
  })
})
