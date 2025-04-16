import { getAllIndicators } from '@/app/lib/projectUtils/watchLists/updates'
import { IndicatorOverview } from '@/app/ui/projects/watchList/indicatorOverview'


export default async function StockOverview() {
    const Indicators = await getAllIndicators()
   
    return (
      <ul className="flex flex-wrap -m-2">
      {Indicators.map((indicator) => (
        <IndicatorOverview key={indicator.id} indicator={indicator} />
      ))}
    </ul>
    )
  }