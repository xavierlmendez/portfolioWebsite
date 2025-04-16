import { getIndicator } from '@/app/lib/projectUtils/watchLists/updates'
import { IndicatorOverview } from '@/app/ui/projects/watchList/indicatorOverview'


export default async function IndicatorView({
  params,
}: {
  params: { indicator: string }
}) {
  const indicator = await getIndicator(params.indicator)
  
  return (
    <ul>
      <div>botBrain individual bot view</div>
        <IndicatorOverview key={indicator.id} indicator={indicator} />
    </ul>
  )
}