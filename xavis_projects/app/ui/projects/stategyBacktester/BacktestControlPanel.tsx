'use client'

export function BacktestControlPanel() {
    return (
        <div className='w-full h-full text-center pb-10 mx-0 px-0'>
            <header id='indicatorManipulator' className='text-4xl font-bold text-white pb-2'>
                <h1 >Strategy Backtester</h1>
                <p className='text-sm text-gray-300'>Add or Remove Indicators to build your strategy</p>
            </header>

            <div className='w-full grid grid-cols-6 gap-4 min-h-20 '>
                <div id='indicatorManipulator' className='col-span-2 rounded-xl border border-white/10 bg-gray-800 shadow-lg'>
                    <p className='text-lg text-gray-300'>ticker adder/subtracter</p>
                </div>

                <div id='indicatorManipulator' className='rounded-xl border border-white/10 bg-gray-800 shadow-lg'>
                    <p className='text-lg text-gray-300'>initialvalue</p>
                </div>

                <div id='indicatorManipulator' className='col-span-2 rounded-xl border border-white/10 bg-gray-800 shadow-lg'>
                    <p className='text-lg text-gray-300'>start/end date</p>
                </div>

                <div id='indicatorManipulator' className='rounded-xl border border-white/10 bg-gray-800 shadow-lg'>
                    <p className='text-2xl m-6 text-center text-white'>run</p>
                </div>
            </div>
        </div>
    )
}