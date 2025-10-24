'use client'

import { Header } from '../../ui/page/header';
import BacktesterClient from '@/app/ui/projects/stategyBacktester/BacktesterClient';

export default function StrategyBacktesterPage() {

  const pageTitle = 'Strategy Backtester';
  const initTickerData = [{
    id: 'NVDA',
  }, {
    id: 'PAYC'
  }]

  return (
    <main className='w-full min-h-screen flex flex-col items-center px-4 py-8'>
      <Header title={'Initial UI, BE under development'} description={''} />

      <Header title={pageTitle} description={''} />
      <BacktesterClient initTickers={initTickerData} />
    </main>
  )
}
