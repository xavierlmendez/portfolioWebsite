import { getWatchListUpdates } from '@/app/lib/projectUtils/watchLists/updates'
import { TickerDetails } from '@/app/ui/projects/watchList/tickerDetails'


export default async function WatchList() {
  const tickersWatched = await getWatchListUpdates()

  const summary = 'project to track watched stocks and indicators'

  return (
    <main className='w-full min-h-screen flex flex-col items-center px-4 py-8'>
      <section id='header' className='w-full max-w-3xl mb-8 text-center'>
        <h1 className='text-4xl font-bold text-white mb-2'>Watch List Tracker</h1>
        <p className='text-lg text-gray-300'>{summary}</p>
      </section>
      <section>
        {tickersWatched.map((ticker) => (
          <TickerDetails key={ticker.id} update={ticker} />
        ))}
      </section>
    </main>

  )
}