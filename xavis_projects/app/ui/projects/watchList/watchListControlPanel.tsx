'use client'

import { useState, memo, FormEvent } from 'react'

type Ticker = {
  id: string
  title: string
  price: string
  change: string
  volume: string
  bid: string
  ask: string
  dayRange: string
}

type Props = {
  tickers: Ticker[]
  onAddTicker: (symbol: string) => void
  onRemoveTicker: (id: string) => void
}

export const WatchListControlPanel = memo(function WatchListControlPanel({
  tickers,
  onAddTicker,
  onRemoveTicker
}: Props) {
  const [symbol, setSymbol] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = symbol.trim().toUpperCase();
    if (!cleaned) { return; }

    const symbolAlreadyInTickers = tickers.some(ticker => ticker.id.includes(cleaned)); // todo fix storage escaping ticker
    if (symbolAlreadyInTickers) {
      alert('Ticker is already in Watch List.');
      return;
    }

    onAddTicker(cleaned);
    setSymbol('');
  }

  return (
    <div className="rounded-xl w-full border border-white/10 bg-gray-800 shadow-lg p-4">
      <form onSubmit={submit} className="flex gap-2">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Add ticker (e.g., NVDA)"
          className="flex-1 rounded-lg bg-black/30 px-3 py-2 outline-none"
        />
        <button
          type="submit"
          className="rounded-lg px-4 py-2 bg-blue-600 text-white disabled:opacity-50"
        >
          Add
        </button>
      </form>

      <div className="mt-3 text-sm text-white">
        {tickers.length + ' tickers tracked '}
        <button
              type="button"
              onClick={() => alert('Watch List Save functionality disabled pending user profile and login implementation.')}
              className="text-blue-400 hover:underline"
            >
              Save List
            </button>
            {}
      </div>

      <ul className="mt-2 flex flex-wrap gap-2">
        {tickers.map(t => (
          <li key={t.id} className="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1">
            <span>{t.id}</span>
            <button
              type="button"
              onClick={() => onRemoveTicker(t.id)}
              className="text-red-400 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
})