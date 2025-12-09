import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import { localeDefault, locales } from './locales'
import { vikeSitemapPlugin } from './plugins/vike-sitemap'

const viteconfig = ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  return defineConfig({
    plugins: [
      vike(),
      react(),
      tailwindcss(),
      vikeSitemapPlugin({
        hostname: process.env.SITE_URL || 'https://vocdoni.io',
        locales,
        defaultLocale: localeDefault,
      }),
    ],
    server: {
      allowedHosts: ['warm-birch-97cf.tunnl.gg'],
      // optionally, if you're accessing via that domain:
      host: true,
    },

    build: {
      target: 'es2022',
    },

    resolve: {
      alias: {
        '@': new URL('./', import.meta.url).pathname,
      },
    },

    define: {
      PLAUSIBLE_DOMAIN: JSON.stringify(process.env.PLAUSIBLE_DOMAIN || ''),
      GTM_ID: JSON.stringify(process.env.GTM_ID || ''),
      EMAILJS_PUBLIC_KEY: JSON.stringify(process.env.EMAILJS_PUBLIC_KEY || ''),
      EMAILJS_SERVICE_ID: JSON.stringify(process.env.EMAILJS_SERVICE_ID || ''),
      EMAILJS_TEMPLATE_ID: JSON.stringify(process.env.EMAILJS_TEMPLATE_ID || ''),
      RECAPTCHA_SITE_KEY: JSON.stringify(process.env.RECAPTCHA_SITE_KEY || ''),
      WHATSAPP_PHONE_NUMBER: JSON.stringify(process.env.WHATSAPP_PHONE_NUMBER || '+34 621 501 155'),
    },
  })
}

export default viteconfig
