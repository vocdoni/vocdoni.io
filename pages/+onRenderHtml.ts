import type { PageContextServer } from 'vike/types'
import { onRenderHtml as vikeReactOnRenderHtml } from 'vike-react/__internal/integration/onRenderHtml'

export default async function onRenderHtml(pageContext: PageContextServer) {
  // Delegate to the REAL vike-react renderer (preserves i18n, head, streaming, hydration)
  const documentHtml = await vikeReactOnRenderHtml(pageContext)

  // documentHtml is an escapeInject TemplateWrapped: { _template: { templateStrings, templateVariables } }
  const tpl = documentHtml._template

  // Find the template string containing <!DOCTYPE to locate the html tag split point
  let doctypeIndex = -1
  for (let i = 0; i < tpl.templateStrings.length; i++) {
    if (tpl.templateStrings[i].includes('<!DOCTYPE')) {
      doctypeIndex = i
      break
    }
  }

  // Insert comment right after <html${attrs}>: modify ts[1] which is '>\n      <head>...'
  // We want to insert after the >, so we split after the first character (the >) and insert the comment there
  const comment = `<!-- commit sha: ${__COMMIT_SHA__} -->`
  if (doctypeIndex >= 0 && doctypeIndex + 1 < tpl.templateStrings.length) {
    const originalTs1 = tpl.templateStrings[doctypeIndex + 1]

    // ts[1] starts with '>' followed by newline and content
    // We want: '>\n    <!-- comment -->\n      <head>...'
    const restOfTs1 = originalTs1.substring(1) // everything after '>'
    const newTs1 = '>' + `\n    ${comment}\n` + restOfTs1

    // Create a new array since templateStrings is readonly
    const newTemplateStrings = [...tpl.templateStrings]
    newTemplateStrings[doctypeIndex + 1] = newTs1

    return { _template: { templateStrings: newTemplateStrings, templateVariables: tpl.templateVariables } }
  }

  // Fallback: return original if we can't find the split point
  return documentHtml
}
