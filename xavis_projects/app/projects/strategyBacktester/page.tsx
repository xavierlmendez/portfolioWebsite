'use client'

import BarChart from '@/app/ui/projects/stategyBacktester/BarChar';
import { Header } from '../../ui/page/header';
import { UnderDevelopment } from '../../ui/page/underDevelopment';

export default function LinksPage() {

  const pageTitle = 'Strategy Backtester';

  return (
    <main className='w-full min-h-screen flex flex-col items-center px-4 py-8'>
      <Header title={pageTitle} description={''} />
      <UnderDevelopment message='' />
      <Header title={"Inital Chart more to come muhohaha"} description={''} />
      <BarChart/>
    </main>
  )
}
