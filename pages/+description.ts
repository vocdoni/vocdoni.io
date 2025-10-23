import { SECTIONS_CONFIG } from '@/lib/useUrlSync'

// Import all translation files
const allJson = import.meta.glob('/locales/*/*.json', { eager: true, import: 'default' }) as Record<string, any>

function getTranslations(locale: string) {
  for (const [path, data] of Object.entries(allJson)) {
    if (path.includes(`/locales/${locale}/common.json`)) {
      return data as any
    }
  }
  return {}
}

export default function description(pageContext: any): string {
  const locale = pageContext.locale || 'en'
  const urlLogical = pageContext.urlLogical || '/'

  // Normalize path
  const currentPath = urlLogical === '/' ? '/' : urlLogical.endsWith('/') ? urlLogical.slice(0, -1) : urlLogical

  // Find matching section
  const section = SECTIONS_CONFIG.find((s) => s.path === currentPath) || SECTIONS_CONFIG[0]

  // Get translations
  const translations = getTranslations(locale)

  // Return translated description or fallback
  return (
    translations.sections?.[section.name]?.description ||
    'Cutting-edge blockchain technology powering the future of democratic participation'
  )
}
