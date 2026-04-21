import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  test: {
    exclude: ['.worktrees/**', 'dist/**', 'node_modules/**'],
    globals: true,
    environment: 'node',
  },
})
