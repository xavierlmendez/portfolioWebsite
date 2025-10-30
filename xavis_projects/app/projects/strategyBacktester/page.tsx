'use client'

import { TimePeriod } from '@/app/ui/projects/strategyBacktester/types';
import { Header } from '../../ui/page/header';
import BacktesterClient from '@/app/ui/projects/strategyBacktester/BacktesterClient';

export default function StrategyBacktesterPage() {

  const pageTitle = 'Strategy Backtester';
  const initTickerData = [{
    id: 'NVDA',
  }, {
    id: 'PAYC'
  }]

  const initTimePeriod : TimePeriod = {
    start: new Date(),
    stop: new Date()
  }

  return (
    <main className='w-full min-h-screen flex flex-col items-center px-4 py-8'>
      <Header title={pageTitle} description={''} />
      <BacktesterClient initTickers={initTickerData} initTimePeriod={initTimePeriod} />
    </main>
  )
}
