const BASE = process.env.BOT_MAKER_API_URL

export interface StrategyBacktestPayload {
    tickerCount: number;
    initialCapital: number;
    startDate: string;          // ISO or readable date
    stopDate: string;
    indicators: {
      indicatorName: string;
      trigger: 'Buy' | 'Sell';
    }[];
  }

  export async function runStrategyBacktest(payload: StrategyBacktestPayload) {
    try {
      const res = await fetch(`${BASE}/StrategyBacktester/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error('runStrategyBacktest error:', err);
      return null;
    }
  }