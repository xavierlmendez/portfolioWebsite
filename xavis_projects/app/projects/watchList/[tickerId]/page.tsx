import { getWatchListUpdates } from '@/app/lib/projectUtils/watchLists/updates'
import { TickerDetails } from '@/app/ui/projects/watchList/tickerDetails'


export default async function TickerDetailedView() {
    const tickersWatched = await getWatchListUpdates(['AAPL', 'NVDA', 'PAYC'])
   
    return (
      <ul>
        <div>botBrain individual bot view</div>
        {tickersWatched.map((ticker) => (
          <TickerDetails key={ticker.id} update={ticker} onDelete={() => {}}/>
        ))}
      </ul>
    )
  }