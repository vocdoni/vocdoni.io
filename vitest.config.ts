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
  },
  test: {
    exclude: ['.worktrees/**', 'dist/**', 'node_modules/**'],
    globals: true,
    environment: 'node',
  },
})
