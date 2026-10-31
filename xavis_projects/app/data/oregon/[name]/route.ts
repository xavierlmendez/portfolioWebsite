import { NextResponse } from 'next/server'
import { OREGON_NAME_RE, oregonAssetUrl } from '@/app/lib/datasets/oregon'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET /data/oregon/<file>
// The file bytes live as a GitHub release asset; this route keeps the public, stable
// address on xavisprojects.com (base URL + file name) and sends the client to the bytes.
// Browsers, wget, Python requests/urllib and MATLAB follow the redirect; curl needs -L.
export async function GET(_req: Request, ctx: { params: Promise<{ name: string }> }) {
  const { name } = await ctx.params
  if (!OREGON_NAME_RE.test(name)) {
    return new Response('not found', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  }
  return NextResponse.redirect(oregonAssetUrl(name), 307)
}

export async function HEAD(req: Request, ctx: { params: Promise<{ name: string }> }) {
  return GET(req, ctx)
}
