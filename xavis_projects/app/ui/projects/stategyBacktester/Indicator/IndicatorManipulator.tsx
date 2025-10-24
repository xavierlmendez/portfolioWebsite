'use client'

import { useEffect, useRef } from 'react'
import { Minus, Plus } from 'lucide-react'
import { IndicatorAddForm } from './IndicatorAddForm'

type Indicator = {
    id: string
    indicatorName: string
    trigger: 'Buy' | 'Sell'
  }
  
  type NewIndicator = {
    indicatorName: string
    trigger: 'Buy' | 'Sell'
  }

type IndicatorManipulatorProps = {
    indicators: Indicator[]
    showModal: boolean
    onOpen: () => void
    onClose: () => void
    onAddIndicator: () => void
    onRemove: (id: string) => void
    newIndicator: NewIndicator
    setNewIndicator: (v: NewIndicator) => void
  }
  
  export function IndicatorManipulator({
    indicators,
    showModal,
    onOpen,
    onClose,
    onAddIndicator,
    onRemove,
    newIndicator,
    setNewIndicator,
  }: IndicatorManipulatorProps) {

    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (showModal) {
            document.addEventListener('keydown', onKey)
            // slight delay to ensure element is mounted
            setTimeout(() => inputRef.current?.focus(), 0)
            // prevent background scroll
            const prev = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            return () => {
                document.removeEventListener('keydown', onKey)
                document.body.style.overflow = prev
            }
        }
    }, [showModal])

    return (
        <div className='w-full h-full text-center'>
            <header id='indicatorManipulatorHeader' className='text-2xl font-bold text-white pb-2'>
                <h1>Indicators</h1>
                <p className='text-sm text-gray-300'>Add or Remove Indicators to build your strategy</p>
            </header>

            <div
                id='indicatorManipulatorContent'
                className='w-full min-h-80 rounded-2xl border border-white/10 bg-gray-900/70
                   backdrop-blur shadow-xl p-4 flex flex-col items-center'
            >
                <button
                    onClick={onOpen}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white 
                     hover:bg-blue-500 active:bg-blue-700 transition mb-4'
                >
                    <Plus size={18} />
                    Add Indicator
                </button>

                <div className='w-full max-w-md flex-1 overflow-y-auto space-y-2'>
                    {indicators.length === 0 ? (
                        <p className='text-gray-400 italic'>No indicators added yet.</p>
                    ) : (
                        indicators.map(i => (
                            <div
                                key={i.id}
                                className='flex justify-between items-center bg-gray-800/60 border border-white/10 
                           rounded-lg px-4 py-2 hover:bg-gray-800/90 transition'
                            >
                                <div className='text-left'>
                                    <p className='text-white font-medium'>{i.indicatorName}</p>
                                    <p
                                        className={`text-sm ${i.trigger === 'Buy' ? 'text-green-400' : 'text-red-400'
                                            }`}
                                    >
                                        {i.trigger}
                                    </p>
                                </div>
                                <button
                                    onClick={() => onRemove(i.id)}
                                    className='text-gray-400 hover:text-red-500 transition'
                                    aria-label='Remove indicator'
                                    title='Remove'
                                >
                                    <Minus size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {showModal && (
                <IndicatorAddForm
                    newIndicator={newIndicator}
                    setNewIndicator={setNewIndicator}
                    handleAddIndicator={onAddIndicator}
                    handleClose={onClose}
                />
            )}
        </div>
    )
}
