import Link from "next/link"

export type IndicatorProps = {
  indicator: {
    id: string
    ticker: string
    title: string
    indicator: string
    signal: string
    signalTimeStamp: string
    value: string
    valueType: string
    previousIndicatorSignal: string
    previousSignalTimestamp: string
  }
}

export function IndicatorOverview({ indicator }: IndicatorProps) {
  const signal = indicator.signal.toLowerCase()

  let titleColor = ""
  if (signal === "buy") {
    titleColor = "text-green-800"
  } else if (signal === "sell") {
    titleColor = "text-red-600"
  } else if (signal === "hold") {
    titleColor = "text-black"
  } else if (signal === "inconclusive" || signal === null) {
    titleColor = "text-gray-500"
  }

  return (
      <div className="basis-full sm:basis-1/2 lg:basis-1/3 p-2">
        <Link
          href={`projects/watchList/${indicator.id ?? 0}`}
          className="block h-full w-full p-6 bg-white hover:bg-gray-200"
        >
          {/* Pulsing light */}
          <div className="absolute right-4 top-4">
            <span className="relative flex h-4 w-4">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${titleColor} opacity-75`}></span>
              <span className={`relative inline-flex h-4 w-4 rounded-full ${titleColor}`}></span>
            </span>
          </div>

          {/* Content grid */}
          <div className="grid grid-cols-2 gap-4 h-full items-start pt-4 text-[#1E293B]">
            {/* First column */}
            <div className="space-y-2">
              <h2 className={`text-lg font-semibold ${titleColor}`}>
                {indicator.title ?? 'loading'}
              </h2>
              <div>
                <span className="block text-sm font-medium text-gray-500">Ticker</span>
                <span>{indicator.ticker ?? 'loading'}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Value</span>
                <span>{indicator.value ?? 'loading'}</span>
              </div>
            </div>

            {/* Second column */}
            <div className="space-y-2">
              <div>
                <span className="block text-sm font-medium text-gray-500">Type</span>
                <span>{indicator.indicator ?? 'loading'}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Signal</span>
                <span className="capitalize">{indicator.signal ?? 'loading'}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Prev Signal</span>
                <span className="capitalize">{indicator.previousIndicatorSignal ?? 'loading'}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
  )
}