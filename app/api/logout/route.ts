import { NextResponse } from 'next/server'
import { API_URL } from '@/lib/api'

export async function POST(req: Request) {
  try {
    // Repassa cookies do cliente para o backend logout
    const cookie = req.headers.get('cookie')

    const upstreamRes = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookie ? { cookie } : {})
      }
    })

    // Se o backend retornou Set-Cookie (ex.: limpar cookie), repassa para o cliente
    const setCookie = upstreamRes.headers.get('set-cookie')
    const resHeaders = new Headers()
    if (setCookie) resHeaders.set('set-cookie', setCookie)

    const text = await upstreamRes.text()
    const body = text ? JSON.parse(text) : null

    return NextResponse.json(body ?? {}, {
      status: upstreamRes.status,
      headers: resHeaders
    })
  } catch {
    return NextResponse.json({ error: 'logout failed' }, { status: 500 })
  }
}
