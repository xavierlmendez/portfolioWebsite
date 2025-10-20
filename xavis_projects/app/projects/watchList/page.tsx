import { getWatchListUpdates } from '@/app/lib/projectUtils/watchLists/updates'
import WatchListClient from '@/app/ui/projects/watchList/watchListClient'

export default async function WatchList() {
  const summary = 'project to track watched stocks and indicators'

  // 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX', 'AMD', 'INTC'
  const initTickerSymbols = ['AAPL', 'MSFT', 'GOOGL']
  const initTickerData = await getWatchListUpdates(initTickerSymbols)

  return (
    <main className='w-full min-h-screen flex flex-col items-center md:px-4 py-8'>
      <section id='header' className='w-full max-w-3xl mb-8 text-center'>
        <h1 className='text-4xl font-bold text-white mb-2'>Watch List Tracker</h1>
        <p className='text-lg text-gray-300'>{summary}</p>
      </section>
      <section>
        <WatchListClient initTickers={initTickerData} />
      </section>
    </main>
  
  )
}