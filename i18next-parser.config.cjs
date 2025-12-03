module.exports = {
  locales: ['ca', 'de', 'en', 'es', 'it', 'pt'],
  defaultNamespace: 'common',
  namespace: 'common',
  input: ['{components,hooks,layouts,lib,pages}/**/*.{ts,tsx,js,jsx}'],
  output: 'locales/$LOCALE/$NAMESPACE.json',
  keySeparator: '.',
  namespaceSeparator: ':',
  useKeysAsDefaultValue: false,
  createOldCatalogs: true,
  sort: true,

  lexers: {
    ts: ['JavascriptLexer'],
    tsx: ['JsxLexer'],
    js: ['JavascriptLexer'],
    jsx: ['JsxLexer'],
  },
}
