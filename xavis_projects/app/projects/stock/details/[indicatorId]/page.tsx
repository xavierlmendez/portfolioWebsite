'use client'

import { useEffect, useState } from 'react'
import { getAllIndicators } from '@/app/lib/projectUtils/watchLists/updates'
import { IndicatorOverview } from '@/app/ui/projects/watchList/indicatorOverview'

type IndicatorProps = {
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

export default function IndicatorView() {
  const [allIds, setAllIds] = useState<IndicatorProps[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchIndicators() {
      try {
        const ids = await getAllIndicators()
        setAllIds(ids)
      } catch (err) {
        console.error(err)
        setError('Failed to load indicators.')
      }
    }
    fetchIndicators()
  }, [])

  if (allIds === null && error === null) {
    return <div className='p-4 text-center'>Loading indicators…</div>
  }

  if (error) {
    return <div className='p-4 text-red-500 text-center'>{error}</div>
  }

  return (
    <ul>
      {allIds!.map((indicatorId) => (
        <li key={indicatorId.id} className='border-b py-2 text-sm'>
          <IndicatorOverview indicator={indicatorId} />
        </li>
      ))}
    </ul>
  )
}