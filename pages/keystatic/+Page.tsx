import { useEffect, useState, type ComponentType } from 'react'

// Keystatic admin UI. Storage is resolved in keystatic.config.ts (local in dev,
// GitHub in production). Keystatic and its React-heavy deps are imported lazily on
// the client only, so they never enter the SSR / prerender graph (which would pull
// Keystatic's react-server build and break rendering). Reads/writes go through
// /api/keystatic/* (Vite dev middleware locally, Netlify function in production).
export default function KeystaticAdminPage() {
  const [Admin, setAdmin] = useState<ComponentType | null>(null)

  useEffect(() => {
    let active = true
    Promise.all([import('@keystatic/core/ui'), import('@/keystatic.config')]).then(([{ Keystatic }, configModule]) => {
      if (!active) return
      const config = configModule.default
      // eslint-disable-next-line react/display-name
      setAdmin(() => () => <Keystatic config={config as Parameters<typeof Keystatic>[0]['config']} />)
    })
    return () => {
      active = false
    }
  }, [])

  if (!Admin) return null
  return <Admin />
}
