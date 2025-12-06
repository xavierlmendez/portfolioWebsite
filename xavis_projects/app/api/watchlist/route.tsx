import { NextResponse } from 'next/server'
import { getWatchListUpdates } from '@/app/lib/projectUtils/watchLists/updates'

// GET /api/watchlist?ticker=NVDA
// used for adding a single ticker from the client
export async function GET(req: Request) {
  const url = new URL(req.url)
  const ticker = url.searchParams.get('ticker')
  if (!ticker) {
    return NextResponse.json({ error: 'Missing ticker' }, { status: 400 })
  }

  const [result] = await getWatchListUpdates([ticker])
  return NextResponse.json(result)
}

// POST /api/watchlist
// body: { "symbols": ["AAPL", "MSFT", "GOOGL"] }
// used for refreshing multiple tickers at once
export async function POST(req: Request) {
  try {
    const { symbols } = await req.json()

    if (
      !Array.isArray(symbols) ||
      !symbols.every((s) => typeof s === 'string')
    ) {
      return NextResponse.json(
        { error: 'symbols must be an array of strings' },
        { status: 400 }
      )
    }

    const results = await getWatchListUpdates(symbols)
    return NextResponse.json(results)
  } catch (err) {
    console.error('Error in /api/watchlist POST:', err)
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    )
  }
}
