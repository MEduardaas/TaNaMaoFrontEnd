'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  accessToken: string | null
  loading: boolean
  setAccessToken: (t: string | null) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [accessToken, setAccessTokenState] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function init() {
      try {
        const res = await fetch('/api/refresh', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        })

        if (!res.ok) {
          if (mounted) setAccessTokenState(null)
          return
        }

        const data = await res.json()
        if (mounted) setAccessTokenState(data?.accessToken ?? null)
      } catch {
        if (mounted) setAccessTokenState(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    init()
    return () => {
      mounted = false
    }
  }, [])

  const setAccessToken = useCallback((t: string | null) => {
    setAccessTokenState(t)
  }, [])

  const logout = useCallback(async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' })
    } catch {}
    setAccessTokenState(null)
    router.replace('/Login')
  }, [router])

  return (
    <AuthContext.Provider
      value={{ accessToken, loading, setAccessToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}
