'use client'

import { CalendarButton } from "../../common/CalenderButton"

const handleOpenCalendar = (type: string) => {
    console.log(`Opening ${type} calendar...`);
    // later: setCalendarType(type), open modal, etc.
};

export function BacktestControlPanel() {
    return (
        <div id='BacktestControlPanel' className='w-full h-full text-center pb-10 mx-0 px-0'>
            <header className='text-4xl font-bold text-white pb-2'>
                <p className='text-sm text-gray-300'>Modify your strategy's preconditions and scope</p>
            </header>

            <div className='w-full grid grid-cols-1 md:grid-cols-6 gap-4 min-h-20'>
                <div className='md:col-span-2 rounded-xl border border-white/10 bg-gray-800 shadow-lg'>
                    <p className='text-lg text-gray-300'>Add/Remove</p>
                </div>

                <div className='rounded-xl border border-white/10 bg-gray-800 shadow-lg'>
                    <p className='text-lg text-gray-300'>Initial Capital</p>
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

                <div className='rounded-xl border border-white/10 bg-gray-800 shadow-lg'>
                    <p className='text-2xl m-6 text-center text-white'>Run Test</p>
                </div>
            </div>
        </div>
    )
}