module.exports = {
  locales: ['es', 'en', 'ca'],
  defaultNamespace: 'common',
  namespace: 'common',
  input: ['pages/**/*.{ts,tsx,js,jsx}', 'components/**/*.{ts,tsx,js,jsx}'],
  output: 'locales/$LOCALE/$NAMESPACE.json',

  keySeparator: '.',
  namespaceSeparator: ':',

  useKeysAsDefaultValue: false,

  createOldCatalogs: false,
  sort: true,

  lexers: {
    ts: ['JavascriptLexer'],
    tsx: ['JsxLexer'],
    js: ['JavascriptLexer'],
    jsx: ['JsxLexer'],
  },
}
