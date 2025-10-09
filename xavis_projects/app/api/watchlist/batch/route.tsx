import { NextResponse } from 'next/server'
import { getWatchListUpdates } from '@/app/lib/projectUtils/watchLists/updates'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const list = (url.searchParams.get('symbols') ?? '')
    .split(',')
    .map(s => s.trim().toUpperCase())
    .filter(Boolean)

  if (!list.length) return NextResponse.json([], { status: 200 })

  const results = await getWatchListUpdates(list)
  return NextResponse.json(results)
}