'use client'

import { X } from 'lucide-react'

type IndicatorAddFormProps = {
  newIndicator: {
    indicatorName: string
    trigger: 'Buy' | 'Sell'
  }
  setNewIndicator: (value: { indicatorName: string; trigger: 'Buy' | 'Sell' }) => void
  handleAddIndicator: () => void
  handleClose: () => void
}

export function IndicatorAddForm({
  newIndicator,
  setNewIndicator,
  handleAddIndicator,
  handleClose
}: IndicatorAddFormProps) {
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      aria-modal='true'
      role='dialog'
    >
      {/* Overlay */}
      <div
        className='absolute inset-0 bg-black/60 backdrop-blur-sm'
        onClick={handleClose}
      />

      {/* Dialog panel */}
      <div className='relative mx-4 w-full max-w-lg'>
        <div className='bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-[1px]'>
          <div className='rounded-2xl bg-gray-900/80 border border-white/10 shadow-2xl p-5'>
            <div className='flex items-start justify-between mb-3'>
              <div>
                <h2 className='text-white text-lg font-semibold'>Add Indicator</h2>
                <p className='text-xs text-white/60'>Define the indicator and its trigger.</p>
              </div>
              <button
                onClick={handleClose}
                className='text-gray-400 hover:text-white p-1 rounded-md'
                aria-label='Close'
              >
                <X size={18} />
              </button>
            </div>

            <div className='space-y-3'>
              <div className='flex flex-col'>
                <label htmlFor='indicatorName' className='text-sm text-white/70 mb-1'>
                  Indicator Name
                </label>
                <input
                  id='indicatorName'
                  type='text'
                  placeholder='e.g., RMSE, Percent Amt., Fixed Amt.'
                  value={newIndicator.indicatorName}
                  onChange={(e) =>
                    setNewIndicator({ ...newIndicator, indicatorName: e.target.value })
                  }
                  className='rounded-md bg-gray-800 text-white border border-white/15 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2'
                />
              </div>

              <div className='flex flex-col'>
                <label htmlFor='trigger' className='text-sm text-white/70 mb-1'>
                  Trigger
                </label>
                <select
                  id='trigger'
                  value={newIndicator.trigger}
                  onChange={(e) =>
                    setNewIndicator({
                      ...newIndicator,
                      trigger: e.target.value as 'Buy' | 'Sell'
                    })
                  }
                  className='rounded-md bg-gray-800 text-white border border-white/15 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2'
                >
                  <option value='Buy'>Buy</option>
                  <option value='Sell'>Sell</option>
                </select>
              </div>
            </div>

            <div className='mt-5 flex items-center justify-end gap-2'>
              <button
                onClick={handleClose}
                className='px-4 py-2 rounded-lg border border-white/15 text-white/80
                           hover:bg-white/5 transition'
              >
                Cancel
              </button>
              <button
                onClick={handleAddIndicator}
                className='px-4 py-2 rounded-lg bg-blue-600 text-white
                           hover:bg-blue-500 active:bg-blue-700 transition'
              >
                Add Indicator
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
