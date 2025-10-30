'use client'

import { CalendarButton } from '../../../common/CalenderButton'
import { memo } from 'react'

type Props = {
    onOpenTickersModal: () => void
    onRunTest: () => void
    tickerCount: number
    onOpenStartModal: () => void
    onOpenStopModal: () => void
    startDate: Date
    stopDate: Date
}


export const BacktestControlPanel = memo(function BacktestControlPanel(
    {
        onOpenTickersModal,
        onRunTest,
        tickerCount,
        onOpenStartModal,
        onOpenStopModal,
        startDate,
        stopDate
    }: Props) {
    return (
        <div id='BacktestControlPanel' className='w-full h-full text-center pb-10'>
            <header className='text-4xl font-bold text-white pb-2'>
                <p className='text-sm text-gray-300'>Modify strategy preconditions and scope</p>
            </header>

            <div className='w-full grid grid-cols-1 md:grid-cols-6 gap-4 min-h-20'>

                <div className='md:col-span-2 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-[1px]'>
                    <div className='rounded-2xl bg-gray-900/70 backdrop-blur border border-white/10 shadow-xl flex flex-col items-center justify-center p-4 space-y-3'>
                        <div className='text-lg font-medium text-gray-200'>
                            Total Tickers Traded: <span className='text-white font-semibold'>{tickerCount}</span>
                        </div>
                        <button
                            type='button'
                            onClick={onOpenTickersModal}
                            className='rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 transition w-full max-w-[140px]'
                        >
                            Manage
                        </button>
                    </div>
                </div>

                <div className='bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-[1px]'>
                    <div className='rounded-2xl bg-gray-900/70 backdrop-blur border border-white/10 shadow-xl flex flex-col items-center justify-center p-4 space-y-3'>
                        <p className='text-lg font-medium text-gray-200 text-center'>Initial Capital</p>
                        <input
                            id='initialCapitalValue'
                            type='number'
                            step='500'
                            defaultValue={5000}
                            className='w-28 text-center rounded-md bg-gray-800 text-white border border-white/20 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 py-1.5 shadow-inner'
                        />
                    </div>
                </div>

                <div className='md:col-span-2 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-[1px]'>
                    <div className='rounded-2xl bg-gray-900/70 backdrop-blur border border-white/10 shadow-xl'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10'>
                            <div className='p-4'>
                                <CalendarButton
                                    label='Start'
                                    date={startDate}
                                    onClickFunction={onOpenStartModal}                              
                                />
                            </div>
                            <div className='p-4'>
                                <CalendarButton
                                    label='Stop'
                                    date={stopDate}
                                    onClickFunction={onOpenStopModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-[1px]">
                    <div className="rounded-2xl bg-gray-900/70 backdrop-blur border border-white/10 shadow-xl 
                        flex items-center justify-center h-full p-4">
                        <button
                            type="button"
                            onClick={onRunTest}
                            className="rounded-lg px-6 py-2 bg-blue-600 text-white 
                                hover:bg-blue-500 active:bg-blue-700 transition 
                                w-full"
                        >
                            Run Test
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
})
