import vikeReact from 'vike-react/config'
import type { Config } from 'vike/types'
import favicon from '../assets/favicon.ico'

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
  // https://vike.dev/head-tags
  title: 'Vocdoni - secure digital voting you can trust',
  description:
    'Cutting-edge blockchain technology powering the future of democratic participation with transparent, secure, and accessible voting infrastructure.',
  extends: vikeReact,
  passToClient: ['locale', 'initialI18nStore', 'initialLocale'],
  prerender: {
    enable: true,
    keepDistServer: false,
  },
  favicon,
} satisfies Config
