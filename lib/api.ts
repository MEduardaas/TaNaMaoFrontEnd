export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

/**
 * Server-safe helper to call the upstream API.
 *
 * Note: this function does NOT read from localStorage. If you are calling
 * from the server (getServerSideProps, API routes, etc.), pass an explicit
 * token when needed. For client-side calls prefer using the `useApi` hook
 * which handles credentials and in-memory accessToken.
 */
export async function apiRequest(path: string, method: string, body?: unknown) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }

  return { ...(await res.json()), status: res.status }
}
