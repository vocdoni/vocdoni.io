import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  define: {
    APP_URL: JSON.stringify(process.env.APP_URL || 'https://app.vocdoni.io'),
    PLATFORM_URL: JSON.stringify(process.env.PLATFORM_URL || 'https://platform.vocdoni.io'),
    SAAS_URL: JSON.stringify('https://saas-api-dev.vocdoni.net'),
    NOINDEX: JSON.stringify(false),
  },
  test: {
    exclude: ['.worktrees/**', 'dist/**', 'node_modules/**'],
    globals: true,
    environment: 'node',
    // i18next prints a Locize banner on its first init in each test file.
    env: { I18NEXT_NO_SUPPORT_NOTICE: '1' },
  },
})
