import yahooFinance from 'yahoo-finance2'

const BASE = process.env.BOT_MAKER_API_URL

export async function getWatchListUpdates(tickers: Array<string>) {
  const results = await Promise.all(
    tickers.map(async (symbol) => {
      try {
        const quote = await yahooFinance.quote(symbol);

        // handle case where quote is null/undefined
        if (!quote) {
          return {
            id: symbol,
            title: symbol,
            price: 'Price: N/A',
            change: 'Change: N/A',
            volume: 'Volume: N/A',
            bid: 'Bid: N/A',
            ask: 'Ask: N/A',
            dayRange: 'Day Range: N/A',
          };
        }

        const changePercent =
          typeof quote.regularMarketChangePercent === 'number'
            ? quote.regularMarketChangePercent.toFixed(2)
            : 'N/A';

        const volume =
          typeof quote.regularMarketVolume === 'number'
            ? quote.regularMarketVolume.toLocaleString()
            : 'N/A';

        const bidPrice =
          typeof quote.bid === 'number' ? quote.bid : null;
        const bidSize =
          typeof quote.bidSize === 'number' ? quote.bidSize : null;

        const askPrice =
          typeof quote.ask === 'number' ? quote.ask : null;
        const askSize =
          typeof quote.askSize === 'number' ? quote.askSize : null;

        const dayLow =
          typeof quote.regularMarketDayLow === 'number'
            ? quote.regularMarketDayLow
            : null;
        const dayHigh =
          typeof quote.regularMarketDayHigh === 'number'
            ? quote.regularMarketDayHigh
            : null;

        return {
          id: symbol,
          title: symbol,
          price:
            bidPrice != null
              ? `Price: $${quote.regularMarketPrice}`
              : 'Price: N/A',
          change: `Change: ${changePercent}%`,
          volume: `Volume: ${volume}`,
          bid:
            bidPrice != null && bidSize != null
              ? `Bid: $${bidPrice} x ${bidSize}`
              : 'Bid: N/A',
          ask:
            askPrice != null && askSize != null
              ? `Ask: $${askPrice} x ${askSize}`
              : 'Ask: N/A',
          dayRange:
            dayLow != null && dayHigh != null
              ? `Day Range: $${dayLow} - $${dayHigh}`
              : 'Day Range: N/A',
        };
      } catch (err) {
        console.error(err);
        return {
          id: symbol,
          title: symbol,
          price: 'Price: N/A',
          change: 'Change: N/A',
          volume: 'Volume: N/A',
          bid: 'Bid: N/A',
          ask: 'Ask: N/A',
          dayRange: 'Day Range: N/A',
        };
      }
    })
  );

  return results;
}

export async function getWatchListData(watchlistId: string) {

  const url = new URL(`${BASE}/watchListData`);
  url.searchParams.set('watchlistId', watchlistId);

  const res = await fetch(url.toString(), { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
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

export async function getMarketStatus() {
  const now = new Date();
  const hour = now.getHours();
  let isTradingHours = 8 <= hour && hour < 4;

  const day = now.getDay();
  isTradingHours = isTradingHours && 1 <= day && day < 6;
  return {isOpen: isTradingHours}
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