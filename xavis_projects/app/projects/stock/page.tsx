import { getWatchListUpdates } from '@/app/lib/projectUtils/watchLists/updates'
import { TickerDetails } from '@/app/ui/projects/watchList/tickerDetails'


export default async function WatchList() {
    const tickersWatched = await getWatchListUpdates()
   
    return (
      <ul>
        <div>watchlist ticker overview</div>
        {tickersWatched.map((ticker) => (
          <TickerDetails key={ticker.id} update={ticker} />
        ))}
      </ul>
    )
  }