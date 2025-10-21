export default function lang(pageContext: { locale?: string }) {
  return pageContext.locale || 'en'
}
