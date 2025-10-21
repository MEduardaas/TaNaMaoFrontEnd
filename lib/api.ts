export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function apiRequest(path: string, method: string, body?: unknown) {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  })
  return res.json()
}
