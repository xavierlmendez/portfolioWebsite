import yahooFinance from 'yahoo-finance2'

export async function getWatchListUpdates(tickers : Array<string>) {
  const results = await Promise.all(
    tickers.map(async (symbol) => {
      try {
        const quote = await yahooFinance.quote(symbol)
        return {
          id: symbol,
          title: symbol,
          price: `Price: $${quote.regularMarketPrice}`,
          change: `Change: ${quote.regularMarketChangePercent?.toFixed(2)}%`,
          volume: `Volume: ${quote.regularMarketVolume?.toLocaleString()}`,
          bid: `Bid: $${quote.bid} x ${quote.bidSize}`,
          ask: `Ask: $${quote.ask} x ${quote.askSize}`,
          dayRange: `Day Range: $${quote.regularMarketDayLow} - $${quote.regularMarketDayHigh}`
        };
      } catch (err) {
        console.log(err)
        return {
          id: symbol,
          title: symbol,
          price: 'Price: N/A',
          change: 'Change: N/A',
          volume: 'Volume: N/A',
          bid: 'Bid: N/A',
          ask: 'Ask: N/A',
          dayRange: 'Day Range: N/A'
        }
      }
    })
  )

  return results
}

// Dummy data function
export async function getIndicator(_indicatorId: string) {
  // Ignoring the passed-in indicator ID and returning static dummy data
  console.log(_indicatorId); // logging due to eslint error I want to keept
  const now = new Date()
  const oneDayAgo = new Date(Date.now() - 86400000)

  return {
    id: 'adadADad',
    ticker: 'AAPL',
    title: 'Apple RSI',
    indicator: 'RSI',
    signal: 'Buy',
    signalTimeStamp: now.toISOString(),
    value: '45.2',
    valueType: 'RSI',
    previousIndicatorSignal: 'Sell',
    previousSignalTimestamp: oneDayAgo.toISOString(),
  }
}

// Dummy data function
export async function getAllIndicators() {
  const now = new Date()
  const oneDayAgo = new Date(Date.now() - 86400000)

  return [
    {
      id: 'aapl-indicator-1',
      ticker: 'AAPL',
      title: 'RSI Indicator',
      indicator: 'RSI',
      signal: 'Buy',
      signalTimeStamp: now.toISOString(),
      value: '42.7',
      valueType: 'RSI',
      previousIndicatorSignal: 'Sell',
      previousSignalTimestamp: oneDayAgo.toISOString(),
    },
    {
      id: 'aapl-indicator-2',
      ticker: 'AAPL',
      title: 'MACD Indicator',
      indicator: 'MACD',
      signal: 'Sell',
      signalTimeStamp: now.toISOString(),
      value: '-1.24',
      valueType: 'MACD',
      previousIndicatorSignal: 'Buy',
      previousSignalTimestamp: oneDayAgo.toISOString(),
    },
    {
      id: 'msft-indicator-1',
      ticker: 'MSFT',
      title: 'SMA Indicator',
      indicator: 'SMA',
      signal: 'Hold',
      signalTimeStamp: now.toISOString(),
      value: '310.5',
      valueType: 'SMA',
      previousIndicatorSignal: 'Hold',
      previousSignalTimestamp: oneDayAgo.toISOString(),
    },
    {
      id: 'msft-indicator-2',
      ticker: 'MSFT',
      title: 'EMA Indicator',
      indicator: 'EMA',
      signal: 'Buy',
      signalTimeStamp: now.toISOString(),
      value: '312.1',
      valueType: 'EMA',
      previousIndicatorSignal: 'Sell',
      previousSignalTimestamp: oneDayAgo.toISOString(),
    },
    {
      id: 'googl-indicator-1',
      ticker: 'GOOGL',
      title: 'RSI Indicator',
      indicator: 'RSI',
      signal: 'Sell',
      signalTimeStamp: now.toISOString(),
      value: '30.2',
      valueType: 'RSI',
      previousIndicatorSignal: 'Buy',
      previousSignalTimestamp: oneDayAgo.toISOString(),
    },
    {
      id: 'googl-indicator-2',
      ticker: 'GOOGL',
      title: 'MACD Indicator',
      indicator: 'MACD',
      signal: 'Buy',
      signalTimeStamp: now.toISOString(),
      value: '0.54',
      valueType: 'MACD',
      previousIndicatorSignal: 'Sell',
      previousSignalTimestamp: oneDayAgo.toISOString(),
    },
  ]
}