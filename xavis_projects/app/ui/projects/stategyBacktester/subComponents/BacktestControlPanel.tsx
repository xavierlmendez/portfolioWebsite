'use client'

import { CalendarButton } from "../../../common/CalenderButton"
import { memo } from 'react'

type Props = {
      onOpenTickersModal?: () => void
      tickerCount: number
}

const handleOpenCalendar = (type: string) => {
    console.log(`Opening ${type} calendar...`);
    // later: setCalendarType(type), open modal, etc.
};

export const BacktestControlPanel = memo(function WatchListControlPanel({
    onOpenTickersModal,
    tickerCount
}: Props) {

    return (
        <div id='BacktestControlPanel' className='w-full h-full text-center pb-10 mx-0 px-0'>
            <header className='text-4xl font-bold text-white pb-2'>
                <p className='text-sm text-gray-300'>Modify strategy preconditions and scope</p>
            </header>

            <div className='w-full grid grid-cols-1 md:grid-cols-6 gap-4 min-h-20'>
                <div className='rounded-xl md:col-span-2 border border-white/10 bg-gray-800 shadow-lg px-4 py-3 flex flex-col items-center space-y-3'>
                        <div className='text-lg font-medium text-gray-300 text-center'>Total Tickers Traded: {tickerCount}</div>
                        <button
                            type="button"
                            onClick={onOpenTickersModal}
                            className='w-28 text-center rounded-md bg-gray-700 text-white border border-gray-600 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 py-1.5 hover:underline'
                        >
                            Manage
                        </button>
                </div>

                <div className='rounded-xl border border-white/10 bg-gray-800 shadow-lg px-4 py-3 flex flex-col items-center space-y-3'>
                    <p className='text-lg font-medium text-gray-300 text-center'>Initial Capital</p>

                    <input
                        id='initialCapitalValue'
                        type='number'
                        step='500'
                        defaultValue={5000}
                        className='w-28 text-center rounded-md bg-gray-700 text-white border border-gray-600 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 py-1.5'
                    />
                </div>

                <div className='md:col-span-2 rounded-xl border border-white/10 bg-gray-800 shadow-lg'>

                    <div className="grid grid-cols-2 h-full">
                        <CalendarButton
                            label="Start"
                            date={new Date()}
                            onClick={() => handleOpenCalendar('start')}
                        />
                        <CalendarButton
                            label="Stop"
                            date={new Date()}
                            onClick={() => handleOpenCalendar('stop')}
                        />
                    </div>
                </div>

                <div className='rounded-xl border border-white/10 bg-gray-800 shadow-lg flex flex-col justify-between p-4'>
                    <button
                        className="rounded-lg h-full bg-blue-600 text-white disabled:opacity-50"
                    >
                        <p className='text-xl text-center text-white'>Run Test</p>
                    </button>
                </div>
            </div>
        </div>
    )
})