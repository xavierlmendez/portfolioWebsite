import { getWatchListUpdates, getMarketStatus } from '@/app/lib/projectUtils/watchLists/updates'
import { Header } from '@/app/ui/page/header'
import WatchListClient from '@/app/ui/projects/watchList/watchListClient'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export default async function WatchList() {
  const pageTitle = 'Watch List Tracker'

  // 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX', 'AMD', 'INTC'
  const initTickerSymbols = ['AAPL', 'MSFT', 'GOOGL']
  const initTickerData = await getWatchListUpdates(initTickerSymbols)
  const marketStatus = await getMarketStatus();
  const tooltip = (<TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent side="right" className="text-sm text-gray-100 bg-gray-800 border border-gray-700">
        <p>This tool lets you monitor selected stocks and key market indicators in real time.</p>
        <p className="mt-1 italic text-gray-400">NYSE is currently: {marketStatus.isOpen ? 'Open' : 'Closed'}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>)

  return (
    <main>
      <Header title={pageTitle} description={''} tooltip={tooltip} />
      <section>
        <WatchListClient initTickers={initTickerData} />
      </section>
    </main>

  )
}