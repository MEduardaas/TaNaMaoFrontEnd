'use client'

import { useAuthContext } from '@/Provider/AuthProvider'

export function useAuth() {
  return useAuthContext()
}
