import yahooFinance from 'yahoo-finance2'

export async function getWatchListUpdates() {
  const tickers = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX', 'AMD', 'INTC']
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
          price: "Price: N/A",
          change: "Change: N/A",
          volume: "Volume: N/A",
          bid: "Bid: N/A",
          ask: "Ask: N/A",
          dayRange: "Day Range: N/A"
        }
      }
    })
  )

  return results
}