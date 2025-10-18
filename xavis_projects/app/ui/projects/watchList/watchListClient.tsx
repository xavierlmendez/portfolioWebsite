'use client'


import { useState, useCallback, useTransition } from 'react'
import { TickerDetails } from '@/app/ui/projects/watchList/tickerDetails'
import { WatchListControlPanel } from './watchListControlPanel'


type WatchListClientProps = {
    initTickers: {
        id: string;
        title: string;
        price: string;
        change: string;
        volume: string;
        bid: string;
        ask: string;
        dayRange: string;
    }[]
}

export default function WatchListClient({ initTickers }: WatchListClientProps) {
    const [tickers, setTickers] = useState(initTickers)
    const [pending, startTransition] = useTransition()

    const addTicker = useCallback(async (symbol: string) => {
        const res = await fetch(`/api/watchlist?ticker=${encodeURIComponent(symbol)}`)
        if (!res.ok) throw new Error(`Failed to fetch: ${await res.text()}`)
        const tickerObj = await res.json()

        setTickers(prev => [...prev, tickerObj])
    }, [])

    const removeTicker = useCallback((id: string) => {
        setTickers(prev => prev.filter(t => t.id !== id))
    }, [])

    const addTickerDeferred = useCallback((symbol: string) => {
        startTransition(() => { void addTicker(symbol) })
    }, [addTicker, startTransition])

    return (
        <section>
            <div className='mb-6'>
            <WatchListControlPanel
                tickers={tickers}
                onAddTicker={addTickerDeferred}
                onRemoveTicker={removeTicker}
            />
            </div>
            {tickers.map(t => <TickerDetails key={t.id} update={t} />)}
            <div className='mt-6 flex justify-center items-center'>
                {pending && (
                    <div className='w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
                )}
            </div>
        </section>
    )
}