/// <reference types="vite/client" />

declare const PLAUSIBLE_DOMAIN: string
declare const SITE_URL: string
declare const GTM_ID: string
// EmailJS configuration variables defined in vite.config.ts
declare const EMAILJS_PUBLIC_KEY: string
declare const EMAILJS_SERVICE_ID: string
declare const EMAILJS_TEMPLATE_ID: string
// reCAPTCHA configuration variable defined in vite.config.ts
declare const RECAPTCHA_SITE_KEY: string
// Wasaaaapp
declare const WHATSAPP_PHONE_NUMBER: string
// Extend Vike types
declare namespace Vike {
  interface Config {
    image?: string
  }

  interface ConfigResolved {
    image?: string
  }

  interface PageContext {
    locale?: string
    initialLocale?: string
    initialI18nStore?: Record<string, any>
    urlLogical?: string
  }

  interface PageContextServer extends PageContext {}
  interface PageContextClient extends PageContext {}
}
