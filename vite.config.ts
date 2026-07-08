import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'
import vike from 'vike/plugin'
import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import { localeDefault, locales } from './locales'
import { blogMarkdownPlugin } from './plugins/blog-markdown'
import { blogRssPlugin } from './plugins/blog-rss'
import { docsMarkdownPlugin } from './plugins/docs-markdown'
import { keystaticApiPlugin } from './plugins/keystatic-api'
import { legacyRedirectsPlugin } from './plugins/legacy-redirects'
import { vikeSitemapPlugin } from './plugins/vike-sitemap'
import { wellKnownPlugin } from './plugins/well-known'

const viteconfig = ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  let commitSha = 'unknown'
  try {
    commitSha = execSync('git rev-parse --short HEAD').toString().trim()
  } catch {}

  // Absolute URLs (canonical, og:image, sitemap, RSS) are built from this. CI passes SITE_URL per
  // target: production (DigitalOcean) uses the canonical domain; Netlify preview deploys pass their
  // own deterministic alias URL (see .github/workflows/deploy-netlify.yml) so shared preview links
  // resolve to the host that actually serves that build's assets. Local builds fall back to prod.
  const siteUrl = process.env.SITE_URL || 'https://vocdoni.io'

  return defineConfig({
    plugins: [
      // First so its dev middleware handles /api/keystatic before Vike's routing.
      keystaticApiPlugin(),
      vike(),
      react(),
      tailwindcss(),
      docsMarkdownPlugin(),
      blogMarkdownPlugin(),
      legacyRedirectsPlugin(),
      vikeSitemapPlugin({
        hostname: siteUrl,
        locales,
        defaultLocale: localeDefault,
      }),
      blogRssPlugin({
        hostname: siteUrl,
        locales,
        defaultLocale: localeDefault,
      }),
      wellKnownPlugin({
        hostname: siteUrl,
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
      SITE_URL: JSON.stringify(siteUrl),
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
