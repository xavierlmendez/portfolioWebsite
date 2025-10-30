'use client'

import { useEffect, useRef, useState } from 'react'
import { Ticker } from '../types'

type TickerModalProps = {
  open: boolean
  onClose: () => void
  tickers: Ticker[]
  onAddTicker: (symbol: string) => void
  onRemoveTicker: (id: string) => void
}

export default function TickerModal({
  open,
  onClose,
  tickers,
  onAddTicker,
  onRemoveTicker
}: TickerModalProps) {
  const [symbol, setSymbol] = useState('')
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open && dialogRef.current) dialogRef.current.focus()
  }, [open])

  if (!open) return null

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleaned = symbol.trim().toUpperCase().replace(/\s+/g, '')
    if (!cleaned) return
    onAddTicker(cleaned)
    setSymbol('')
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4' role='dialog' aria-modal='true'>
      <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' onClick={onClose} />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className='relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-gradient-to-b from-gray-800/90 to-gray-800/70 shadow-2xl p-5 outline-none'
      >
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold text-white'>Manage Tickers</h2>
          <button
            onClick={onClose}
            className='rounded-md p-2 text-gray-300 hover:bg-gray-700/60 hover:text-white transition'
            aria-label='Close'
          >
            ✕
          </button>
        </div>

        <form onSubmit={submit} className='mt-4 flex gap-2'>
          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder='Add ticker (e.g., AAPL)'
            className='flex-1 rounded-lg bg-black/30 px-3 py-2 text-white placeholder-gray-400
                        border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
          />
          <button
            type='submit'
            className='rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 transition'
          >
            Add
          </button>
        </form>

        <div className='mt-5 max-h-72 overflow-y-auto pr-1'>
          {tickers.length === 0 ? (
            <p className='text-sm text-gray-400'>No tickers yet—add one above.</p>
          ) : (
            <ul className='space-y-2'>
              {tickers.map((t) => (
                <li
                  key={t.id}
                  className='flex items-center justify-between rounded-lg border border-white/10 bg-gray-900/40 px-3 py-2'
                >
                  <span className='text-gray-100'>{t.id}</span>
                  <button
                    onClick={() => onRemoveTicker(t.id)}
                    className='rounded-md px-2 py-1 text-sm text-gray-300 hover:bg-gray-700/60 hover:text-white transition'
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='mt-4 flex justify-end'>
          <button
            onClick={onClose}
            className='rounded-lg px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 transition'
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
