'use client'

import { useCallback } from 'react'
import { useAuth } from '@/hooks/useAuth'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export function useApi() {
  const { accessToken } = useAuth()

  const apiRequest = useCallback(
    async (path: string, method: string, body?: unknown) => {
      const res = await fetch(`${API_URL}${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
        },
        body: body ? JSON.stringify(body) : undefined
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || res.statusText)
      }

      return res.json()
    },
    [accessToken]
  )

  return { apiRequest }
}
