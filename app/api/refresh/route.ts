import { NextResponse } from 'next/server'
import { API_URL } from '@/lib/api'

export async function POST(req: Request) {
  try {
    // Repassa cookies do cliente para o backend upstream
    const cookie = req.headers.get('cookie')

    const upstreamRes = await fetch(`${API_URL}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookie ? { cookie } : {})
      }
    })

    const text = await upstreamRes.text()
    const body = text ? JSON.parse(text) : null

    const resHeaders = new Headers()
    // Se o backend retornou Set-Cookie, repassa para o cliente
    const setCookie = upstreamRes.headers.get('set-cookie')
    if (setCookie) {
      resHeaders.set('set-cookie', setCookie)
    }

    return NextResponse.json(Object.assign({}, body ?? {}), {
      status: upstreamRes.status,
      headers: resHeaders
    })
  } catch {
    return NextResponse.json({ error: 'refresh failed' }, { status: 500 })
  }
}
