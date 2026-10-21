/**
 * Creates a minimal t() stub that returns the English default value with
 * {{placeholder}} interpolation.  Handles the three call shapes used in the
 * codebase:
 *   t(key, 'Default text')
 *   t(key, 'Default {{x}}', { x: value })
 *   t(key, { defaultValue: 'Default text' })
 */
export function makeMockT() {
  return function t(
    _key: string,
    defaultOrOptions?: string | Record<string, unknown>,
    options?: Record<string, unknown>
  ): string {
    let template: string
    let vars: Record<string, unknown> = {}

    if (typeof defaultOrOptions === 'string') {
      template = defaultOrOptions
      vars = options ?? {}
    } else if (defaultOrOptions != null && typeof defaultOrOptions === 'object') {
      template = (defaultOrOptions.defaultValue as string) ?? _key
      vars = defaultOrOptions
    } else {
      template = _key
    }

    return template.replace(/\{\{(\w+)\}\}/g, (_, k) => String(vars[k] ?? `{{${k}}}`))
  }
}
