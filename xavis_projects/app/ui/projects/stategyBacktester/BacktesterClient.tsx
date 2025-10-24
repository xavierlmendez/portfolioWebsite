'use client'

import { useState, useCallback } from 'react'
import { BacktestControlPanel } from './subComponents/BacktestControlPanel'
import LineChart from '@/app/ui/projects/stategyBacktester/subComponents/LineChart'
import { BacktestStatistics } from './subComponents/BacktestStatistics'
import { IndicatorManipulator } from './Indicator/IndicatorManipulator'
import TickerModal from './subComponents/TickerModal'

type BacktesterClientProps = {
  initTickers: { id: string }[]
}

export default function BacktesterClient({ initTickers }: BacktesterClientProps) {
  const [tickers, setTickers] = useState(initTickers)
  const [showTickers, setShowTickers] = useState(false)

  const addTicker = useCallback((symbol: string) => {
    const cleaned = symbol.trim().toUpperCase()
    setTickers(prev => (prev.some(t => t.id === cleaned) ? prev : [...prev, { id: cleaned }]))
  }, [])

  const removeTicker = useCallback((id: string) => {
    setTickers(prev => prev.filter(t => t.id !== id))
  }, [])

  const runTest = useCallback(() => {
    alert("Under development, check back soon!")
    console.log("running back test dummy function")
  }, [])

  return (
    <section className='mx-auto max-w-7xl px-6 md:px-8 py-6 space-y-6'>
      <BacktestControlPanel
        onOpenTickersModal={() => setShowTickers(true)}
        onRunTest={runTest}
        tickerCount={tickers.length}
      />

      <div className='grid grid-cols-12 gap-6'>
        <div className='col-span-12 md:col-span-8'>
          <div className='rounded-2xl border border-white/10 bg-gradient-to-b from-gray-800/90 to-gray-800/70 backdrop-blur-md shadow-xl p-4 md:p-5 min-h-[280px]'>
            <LineChart />
          </div>
        </div>

        <div className='col-span-12 md:col-span-4'>
          <div className='rounded-2xl border border-white/10 bg-gradient-to-b from-gray-800/90 to-gray-800/70 backdrop-blur-md shadow-xl p-4 md:p-5'>
            <IndicatorManipulator />
          </div>
        </div>
      </div>

      <div className='rounded-2xl border border-white/10 bg-gradient-to-b from-gray-800/90 to-gray-800/70 backdrop-blur-md shadow-xl p-4 md:p-5'>
        <BacktestStatistics />
      </div>

      <TickerModal
        open={showTickers}
        onClose={() => setShowTickers(false)}
        tickers={tickers}
        onAddTicker={addTicker}
        onRemoveTicker={removeTicker}
      />
    </section>
  )
}
