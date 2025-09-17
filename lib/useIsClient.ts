import { useEffect, useState } from 'react'

/**
 * Hook to detect if we're running on the client side
 * This is useful for SSR compatibility when components need browser APIs
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}
