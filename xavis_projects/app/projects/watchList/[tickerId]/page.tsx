import { getWatchListUpdates } from '@/app/lib/projectUtils/watchLists/updates'
import { TickerDetails } from '@/app/ui/projects/tickerDetails'


export default async function TickerDetailedView() {
    const tickersWatched = await getWatchListUpdates()
   
    return (
      <ul>
        <div>botBrain individual bot view</div>
        {tickersWatched.map((ticker) => (
          <TickerDetails key={ticker.id} update={ticker} />
        ))}
      </ul>
    )
  }