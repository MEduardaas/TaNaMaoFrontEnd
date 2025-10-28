'use client'

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect
} from 'react'
import { useRouter } from 'next/navigation'
import { useApi } from '@/hooks/useApi'

type AuthContextType = {
  accessToken: string | null
  loading: boolean
  setAccessToken: (t: string | null) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  loading: true,
  setAccessToken: () => {},
  logout: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [accessToken, setAccessTokenState] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { apiRequest } = useApi()

  const setAccessToken = useCallback((t: string | null) => {
    setAccessTokenState(t)
  }, [])

  const logout = useCallback(async () => {
    try {
      // try to notify backend to remove refresh token if it exists in storage
      const stored =
        typeof window !== 'undefined'
          ? localStorage.getItem('refreshToken')
          : null
      await apiRequest('/logout', 'POST', { refreshToken: stored })
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
    try {
      if (typeof window !== 'undefined') localStorage.removeItem('refreshToken')
    } catch {}
    setAccessTokenState(null)
    router.replace('/Login')
  }, [router, apiRequest])

  useEffect(() => {
    let mounted = true

    async function tryRestore() {
      if (typeof window === 'undefined') return
      const stored = localStorage.getItem('refreshToken')
      if (!stored) {
        if (mounted) setLoading(false)
        return
      }

      try {
        const res = await apiRequest('/refresh', 'POST', {
          refreshToken: stored
        })
        if (res?.accessToken && mounted) setAccessTokenState(res.accessToken)
        // if backend rotated refresh token and returned a new one, persist it
        if (res?.refreshToken && typeof window !== 'undefined') {
          localStorage.setItem('refreshToken', res.refreshToken)
        }
      } catch (err) {
        console.error('Refresh falhou:', err)
        try {
          localStorage.removeItem('refreshToken')
        } catch {}
        if (mounted) setAccessTokenState(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    tryRestore()
    return () => {
      mounted = false
    }
  }, [apiRequest])

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
  return ctx
}
