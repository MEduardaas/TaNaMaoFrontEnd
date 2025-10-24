"use client"

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
        // tenta trocar o refresh token (guardado em cookie HttpOnly) por um access token
        const res = await fetch('/api/refresh', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        })

        if (!res.ok) {
          // sem sessão válida -> redireciona para página negada/login
          if (mounted) {
            setAccessToken(null)
            router.replace('/Negado')
          }
          return
        }

        const data = await res.json()
        if (mounted) setAccessToken(data?.accessToken ?? null)
      } catch {
        if (mounted) {
          setAccessToken(null)
          router.replace('/Negado')
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
      // chama endpoint de logout que deve limpar cookie no servidor
      await fetch('/api/logout', { method: 'POST', credentials: 'include' })
    } catch {
      // ignore
    } finally {
      setAccessToken(null)
      router.replace('/Login')
    }
  }, [router])

  return { accessToken, loading, logout }
}
