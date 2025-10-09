import { NextResponse } from 'next/server'
import { getWatchListUpdates } from '@/app/lib/projectUtils/watchLists/updates'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const ticker = url.searchParams.get('ticker')
  if (!ticker) return NextResponse.json({ error: 'Missing ticker' }, { status: 400 })

  const [result] = await getWatchListUpdates([ticker])
  return NextResponse.json(result)
}