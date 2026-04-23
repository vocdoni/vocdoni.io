import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'
import favicon from '../assets/favicon.ico'
import ogImageDefault from '../assets/images/vocdoni.webp'

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/head-tags
  title: 'Vocdoni - Secure digital voting you can trust',
  description:
    'Cutting-edge blockchain technology powering the future of democratic participation with transparent, secure, and accessible voting infrastructure.',
  meta: {
    image: {
      env: { server: true, client: true },
    },
  },
  image: ogImageDefault,

  extends: vikeReact,
  passToClient: ['locale', 'initialI18nStore', 'initialLocale'],
  prerender: {
    enable: true,
    keepDistServer: false,
  },
  favicon,
} satisfies Config
