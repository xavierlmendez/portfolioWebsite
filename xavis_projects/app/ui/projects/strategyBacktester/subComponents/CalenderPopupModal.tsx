'use client'

import { useEffect, useRef, useState } from 'react'

type CalendarPopupModalProps = {
    open: boolean
    onClose: () => void
    date: Date
    onChange: (newDate: Date) => void
    title?: string
}

export default function CalendarPopupModal({
    open,
    onClose,
    date,
    onChange,
    title = 'Select Date',
}: CalendarPopupModalProps) {
    const [localDate, setLocalDate] = useState<string>(toInputValue(date))
    const dialogRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!open) return
        const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [open, onClose])

    useEffect(() => {
        if (open && dialogRef.current) dialogRef.current.focus()
        setLocalDate(toInputValue(date))
    }, [open, date])

    if (!open) return null

    const handleSave = () => {
        const parsed = parseInputValue(localDate)
        if (parsed) onChange(parsed)
        onClose()
    }

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            role='dialog'
            aria-modal='true'
        >
            <div className='absolute inset-0 bg-black/60 backdrop-blur-sm' onClick={onClose} />

            <div
                ref={dialogRef}
                tabIndex={-1}
                className='relative z-10 w-full max-w-lg rounded-2xl border border-white/10 
                    bg-gradient-to-b from-gray-800/90 to-gray-800/70 shadow-2xl p-5 outline-none'
            >
                <div className='flex items-center justify-between'>
                    <h2 className='text-xl font-semibold text-white'>{title}</h2>
                    <button
                        onClick={onClose}
                        className='rounded-md p-2 text-gray-300 hover:bg-gray-700/60 hover:text-white transition'
                        aria-label='Close'
                    >
                        ✕
                    </button>
                </div>

                <div className='mt-5'>
                    <input
                        id='date-input'
                        type='date'
                        value={localDate}
                        onChange={(e) => setLocalDate(e.target.value)}
                        className='w-full rounded-lg bg-black/30 px-3 py-2 text-white placeholder-gray-400
                        border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    />
                </div>

                <div className='mt-6 flex justify-end gap-2'>
                    <button
                        onClick={onClose}
                        className='rounded-lg px-4 py-2 bg-gray-700 text-white hover:bg-gray-600 transition'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className='rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 transition'
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

// Helpers
function toInputValue(date: Date): string {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

function parseInputValue(value: string): Date | null {
    if (!value) return null
    const [y, m, d] = value.split('-').map(Number)
    if (!y || !m || !d) return null
    return new Date(y, m - 1, d)
}
