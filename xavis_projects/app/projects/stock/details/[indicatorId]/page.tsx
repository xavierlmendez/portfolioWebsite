'use client'

import { useEffect, useState } from 'react'
import { getIndicator } from '@/app/lib/projectUtils/watchLists/updates'
import { IndicatorOverview } from '@/app/ui/projects/watchList/indicatorOverview'

type Indicator = {
  id: string
  ticker: string
  title: string
  indicator: string
  signal: 'Buy' | 'Sell' | string
  signalTimeStamp: string
  value: string
  valueType: string
  previousIndicatorSignal: 'Buy' | 'Sell' | string
  previousSignalTimestamp: string
}

type IndicatorViewProps = {
  params: { indicatorId: string; }
}

export default function IndicatorView({ params }: IndicatorViewProps) {
  const [indicator, setIndicator] = useState<Indicator | null>(null)

  useEffect(() => {
    const fetchIndicator = async () => {
      const data = await getIndicator(params.indicatorId)
      setIndicator(data)
    }

    fetchIndicator()
  }, [params.indicatorId])

  if (!indicator) return <div>Loading...</div>

  return (
    <ul>
      <IndicatorOverview key={indicator.id} indicator={indicator} />
    </ul>
  )
}