'use client'

import LineChart from '@/app/ui/projects/stategyBacktester/LineChart';
import {IndicatorManipulator} from '@/app/ui/projects/stategyBacktester/Indicator/IndicatorManipulator';
import {BacktestStatistics} from '@/app/ui/projects/stategyBacktester/BacktestStatistics';
import {BacktestControlPanel} from '@/app/ui/projects/stategyBacktester/BacktestControlPanel';
import { Header } from '../../ui/page/header';

export default function LinksPage() {

  const pageTitle = 'Strategy Backtester';

  return (
    <main className='w-full min-h-screen flex flex-col items-center px-4 py-8'>
      <Header title={"Initial UI, BE under development"} description={''} />

      <Header title={pageTitle} description={''} />
      <BacktestControlPanel/>

      <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className="md:col-span-2 min-h-80px ">
          <LineChart />
        </div>
        <IndicatorManipulator/>
      </div>

      <BacktestStatistics/>
    </main>
  )
}
