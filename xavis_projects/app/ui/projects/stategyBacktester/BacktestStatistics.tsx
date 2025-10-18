'use client'

export function BacktestStatistics() {
    const stats = {
        strategyName: 'Mean Reversion Strategy - SPY',
        testPeriod: 'Jan 2020 – Dec 2024',
        initialCapital: 10000,
        finalCapital: 18450,
        totalProfit: 9500,
        totalReturn: 84.5,
        cagr: 13.1,
        sharpeRatio: 1.42,
        sortinoRatio: 1.95,
        maxDrawdown: -18.6,
        winRate: 57.3,
        totalTrades: 142,
        avgTradeReturn: 0.62,
        profitFactor: 1.78,
        volatility: 9.5,
        avgHoldingPeriod: 4.3,
        bestTrade: 12.4,
        worstTrade: -7.1,
    }

    return (
        <div className='w-full h-full text-center pt-10'>
            <header className='text-2xl font-bold text-white pb-2'>
                <h1>Statistics</h1>
            </header>

            <div className='w-full text-left min-h-80 rounded-xl border border-white/10 bg-gray-800 shadow-lg p-6'>
                <div className='flex justify-between items-center mb-2'>
                    <h2 className='text-xl md:text-3xl font-semibold text-white'>{stats.strategyName}</h2>
                    <div className='text-xl md:text-3xl font-semibold text-white flex gap-4'>
                        {(stats.totalProfit >= 0) ?
                            <span className='text-green-400'>Profit: ${stats.totalProfit.toLocaleString()}</span>
                            :
                            <span className='text-red-400'>Loss: ${stats.totalProfit.toLocaleString()}</span>
                        }
                    </div>
                </div>

                <p className='text-gray-400 mb-6'>Test Period: {stats.testPeriod}</p>

                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-300 text-xs md:text-2xl'>
                    <div>
                        <span className='font-semibold text-white'>Initial Capital:</span> ${stats.initialCapital.toLocaleString()}
                    </div>
                    <div>
                        <span className='font-semibold text-white'>Final Capital:</span> ${stats.finalCapital.toLocaleString()}
                    </div>
                    <div>
                        <span className='font-semibold text-white'>Total Return:</span> {stats.totalReturn.toFixed(1)}%
                    </div>
                    <div>
                        <span className='font-semibold text-white'>CAGR:</span> {stats.cagr.toFixed(1)}%
                    </div>
                    <div>
                        <span className='font-semibold text-white'>Sharpe Ratio:</span> {stats.sharpeRatio.toFixed(2)}
                    </div>
                    <div>
                        <span className='font-semibold text-white'>Sortino Ratio:</span> {stats.sortinoRatio.toFixed(2)}
                    </div>
                    <div>
                        <span className='font-semibold text-white'>Max Drawdown:</span> {stats.maxDrawdown.toFixed(1)}%
                    </div>
                    <div>
                        <span className='font-semibold text-white'>Win Rate:</span> {stats.winRate.toFixed(1)}%
                    </div>
                    <div>
                        <span className='font-semibold text-white'>Total Trades:</span> {stats.totalTrades}
                    </div>
                    <div>
                        <span className='font-semibold text-white'>Avg Trade Return:</span> {stats.avgTradeReturn.toFixed(2)}%
                    </div>
                    <div>
                        <span className='font-semibold text-white'>Profit Factor:</span> {stats.profitFactor.toFixed(2)}
                    </div>
                    <div>
                        <span className='font-semibold text-white'>Volatility:</span> {stats.volatility.toFixed(1)}%
                    </div>
                    <div>
                        <span className='font-semibold text-white'>Avg Holding Period:</span> {stats.avgHoldingPeriod.toFixed(1)} days
                    </div>
                    <div>
                        <span className='font-semibold text-white'>Best Trade:</span> {stats.bestTrade.toFixed(1)}%
                    </div>
                    <div>
                        <span className='font-semibold text-white'>Worst Trade:</span> {stats.worstTrade.toFixed(1)}%
                    </div>
                </div>
            </div>
        </div>
    )
}