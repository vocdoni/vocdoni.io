import { defineConfig } from 'i18next-cli'

import { localeDefault, locales } from './locales/index'

export default defineConfig({
  locales,
  extract: {
    input: ['{components,hooks,layouts,lib,pages}/**/*.{ts,tsx,js,jsx}'],
    output: 'locales/{{language}}/{{namespace}}.json',
    defaultNS: 'common',
    nsSeparator: ':',
    keySeparator: '.',
    sort: true,
    primaryLanguage: localeDefault,
  },
})
