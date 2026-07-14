import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  define: {
    APP_URL: JSON.stringify('https://app.vocdoni.io'),
    PLATFORM_URL: JSON.stringify('https://platform.vocdoni.io'),
  },
  test: {
    exclude: ['.worktrees/**', 'dist/**', 'node_modules/**'],
    globals: true,
    environment: 'node',
  },
})
