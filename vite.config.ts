import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'
import vike from 'vike/plugin'
import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import { localeDefault, locales } from './locales'
import { legacyRedirectsPlugin } from './plugins/legacy-redirects'
import { vikeSitemapPlugin } from './plugins/vike-sitemap'

const viteconfig = ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  let commitSha = 'unknown'
  try {
    commitSha = execSync('git rev-parse --short HEAD').toString().trim()
  } catch {}

  return defineConfig({
    plugins: [
      vike(),
      react(),
      tailwindcss(),
      legacyRedirectsPlugin(),
      vikeSitemapPlugin({
        hostname: process.env.SITE_URL || 'https://vocdoni.io',
        locales,
        defaultLocale: localeDefault,
      }),
    ],

    build: {
      target: 'es2022',
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split framer-motion into its own chunk - large animation library, not on critical path
            if (id.includes('framer-motion') || id.includes('motion/react')) return 'vendor-framer-motion'
            // Split lucide-react icons into one chunk - large icon set
            if (id.includes('lucide-react')) return 'vendor-lucide'
          },
        },
      },
    },

    resolve: {
      alias: {
        '@': new URL('./', import.meta.url).pathname,
      },
    },

    define: {
      SITE_URL: JSON.stringify(process.env.SITE_URL || 'https://vocdoni.io'),
      PLAUSIBLE_DOMAIN: JSON.stringify(process.env.PLAUSIBLE_DOMAIN || ''),
      GTM_ID: JSON.stringify(process.env.GTM_ID || ''),
      EMAILJS_PUBLIC_KEY: JSON.stringify(process.env.EMAILJS_PUBLIC_KEY || ''),
      EMAILJS_SERVICE_ID: JSON.stringify(process.env.EMAILJS_SERVICE_ID || ''),
      EMAILJS_TEMPLATE_ID: JSON.stringify(process.env.EMAILJS_TEMPLATE_ID || ''),
      GHOST_URL: JSON.stringify(process.env.GHOST_URL || ''),
      RECAPTCHA_SITE_KEY: JSON.stringify(process.env.RECAPTCHA_SITE_KEY || ''),
      WHATSAPP_PHONE_NUMBER: JSON.stringify(process.env.WHATSAPP_PHONE_NUMBER || '+34 621 501 155'),
      __COMMIT_SHA__: JSON.stringify(commitSha),
    },
  })
}

export default viteconfig
