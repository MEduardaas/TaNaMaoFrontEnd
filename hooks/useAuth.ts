'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'

type UseAuthResult = {
  accessToken: string | null
  loading: boolean
  logout: () => Promise<void>
}

export function useAuth(): UseAuthResult {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function init() {
      if (typeof window === 'undefined') return
      try {
        const res = await fetch('/api/refresh', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        })

        if (!res.ok) {
          if (mounted) {
            setAccessToken(null)
          }
          return
        }

        const data = await res.json()
        if (mounted) setAccessToken(data?.accessToken ?? null)
      } catch {
        if (mounted) {
          setAccessToken(null)
          router.replace('/Login')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    init()
    return () => {
      mounted = false
    }
  }, [router])

  const logout = useCallback(async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' })
    } catch {
    } finally {
      setAccessToken(null)
      router.replace('/Login')
    }
  }, [router])

  return { accessToken, loading, logout }
}
