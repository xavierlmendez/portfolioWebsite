'use client'

import { useCallback } from 'react'
import { BacktestControlPanel } from './subComponents/BacktestControlPanel'
import LineChart from '@/app/ui/projects/strategyBacktester/subComponents/LineChart'
import { BacktestStatistics } from './subComponents/BacktestStatistics'
import { IndicatorManipulator } from './Indicator/IndicatorManipulator'
import TickerModal from './subComponents/TickerModal'
import { useIndicators } from './Indicator/IndicatorHooks'
import { useTimePeriod } from './subComponents/TimePeriodHooks'
import { TimePeriod } from './types'
import { useTickers } from './Indicator/TickerHooks'
import CalendarPopupModal from './subComponents/CalenderPopupModal'

type BacktesterClientProps = {
    initTickers: { id: string }[]
    initTimePeriod: TimePeriod
}

export default function BacktesterClient(
    { initTickers, initTimePeriod }: BacktesterClientProps) {

    //  Tickers 
    const {
        tickers,
        addTicker,
        removeTicker,
        isTickersOpen,
        openTickers,
        closeTickers
    } = useTickers(initTickers);

    // Indicators
    const {
        indicators,
        isIndicatorModalOpen,
        openIndicatorModal,
        closeIndicatorModal,
        draftIndicator,
        setDraftIndicator,
        addIndicator,
        removeIndicator
    } = useIndicators();

    const {
        isStartModalOpen,
        isStopModalOpen,
        openStartModal,
        openStopModal,
        closeStartModal,
        closeStopModal,
        startDate,
        setStartDate,
        stopDate,
        setStopDate
    } = useTimePeriod(initTimePeriod);

    const runTest = useCallback(() => {
        alert("Under development, check back soon!")
        console.log("running back test dummy function")
    }, [])

    return (
        <section className='mx-auto max-w-7xl px-6 md:px-8 py-6 space-y-6'>
            <BacktestControlPanel
                onOpenTickersModal={() => openTickers()}
                onRunTest={runTest}
                tickerCount={tickers.length}
                onOpenStartModal={openStartModal}
                onOpenStopModal={openStopModal}
                startDate={startDate}
                stopDate={stopDate}
            />

            <div className='grid grid-cols-12 gap-6'>
                <div className='col-span-12 md:col-span-8'>
                    <div className='rounded-2xl border border-white/10 bg-gradient-to-b from-gray-800/90 
                    to-gray-800/70 backdrop-blur-md shadow-xl p-4 md:p-5 min-h-[280px]'>
                        <LineChart />
                    </div>
                </div>

                <div className='col-span-12 md:col-span-4'>
                    <div className='rounded-2xl border border-white/10 bg-gradient-to-b from-gray-800/90 
                    to-gray-800/70 backdrop-blur-md shadow-xl p-4 md:p-5'>
                        <IndicatorManipulator indicators={indicators} showModal={isIndicatorModalOpen} onOpen={openIndicatorModal}
                            onClose={closeIndicatorModal} onAddIndicator={addIndicator}
                            onRemove={removeIndicator} newIndicator={draftIndicator} setNewIndicator={setDraftIndicator} />
                    </div>
                </div>
            </div>

            <div className='rounded-2xl border border-white/10 bg-gradient-to-b from-gray-800/90 to-gray-800/70 
            backdrop-blur-md shadow-xl p-4 md:p-5'>
                <BacktestStatistics />
            </div>

            <TickerModal
                open={isTickersOpen}
                onClose={closeTickers}
                tickers={tickers}
                onAddTicker={addTicker}
                onRemoveTicker={removeTicker}
            />

            <CalendarPopupModal
                open={isStartModalOpen}
                onClose={closeStartModal}
                date={startDate}
                onChange={setStartDate}
                title="Select Start Date"
            />

            <CalendarPopupModal
                open={isStopModalOpen}
                onClose={closeStopModal}
                date={stopDate}
                onChange={setStopDate}
                title="Select End Date"
            />
        </section>
    )
}
