export type ContactFormValues = {
  name: string
  email: string
  organization: string
  subject: string
  message: string
}

export type ContactFormConfig = {
  emailJs: {
    publicKey: string
    serviceId: string
    templateId: string
  }
  recaptchaSiteKey: string
}

export type ContactFormConfigError = 'emailjs' | 'recaptcha' | null

export function getContactFormConfigError(config: ContactFormConfig): ContactFormConfigError {
  const { emailJs, recaptchaSiteKey } = config

  if (!emailJs.publicKey || !emailJs.serviceId || !emailJs.templateId) {
    return 'emailjs'
  }

  if (!recaptchaSiteKey) {
    return 'recaptcha'
  }

  return null
}

export function buildEmailJsParams(data: ContactFormValues, token: string, now: Date = new Date()) {
  return {
    name: data.name,
    email: data.email,
    organization: data.organization,
    subject: data.subject,
    message: data.message,
    time: now.toISOString(),
    'g-recaptcha-response': token,
  }
}
