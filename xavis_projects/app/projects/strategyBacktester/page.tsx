'use client'

import LineChart from '@/app/ui/projects/stategyBacktester/LineChart';
import {IndicatorManipulator} from '@/app/ui/projects/stategyBacktester/IndicatorManipulator';
import {BacktestStatistics} from '@/app/ui/projects/stategyBacktester/BacktestStatistics';
import {BacktestControlPanel} from '@/app/ui/projects/stategyBacktester/BacktestControlPanel';
import { Header } from '../../ui/page/header';
import { UnderDevelopment } from '../../ui/page/underDevelopment';

export default function LinksPage() {

  const pageTitle = 'Strategy Backtester';

  return (
    <main className='w-full min-h-screen flex flex-col items-center px-4 py-8'>
      <Header title={pageTitle} description={''} />
      <UnderDevelopment message='' />
      <Header title={"Inital Chart more to come muhohaha"} description={''} />

      <BacktestControlPanel/>

      <div className='w-full grid grid-cols-3 gap-4'>
        <div className="col-span-2">
          <LineChart />
        </div>
        <div>
          <IndicatorManipulator/>
        </div>
      </div>

      <BacktestStatistics/>
    </main>
  )
}
