import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { ConfigEnv, defineConfig, loadEnv } from 'vite'

const viteconfig = ({ mode }: ConfigEnv) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  return defineConfig({
    plugins: [vike(), react(), tailwindcss()],

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
    },
  })
}

export default viteconfig
