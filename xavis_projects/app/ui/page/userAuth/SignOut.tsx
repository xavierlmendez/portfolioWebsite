'use client'

import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { X } from 'lucide-react'

type SignInFormProps = {
    open: boolean
    onClose: () => void
    setSignedInState: Dispatch<SetStateAction<string>>
    signInStateAction: (action:string) => void,
}

export default function SignOutForm({ open, onClose, setSignedInState, signInStateAction }: SignInFormProps) {


    // Prevent background scroll while open
    useEffect(() => {
        if (!open) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = prev
        }
    }, [open])

    // Close on Escape
    useEffect(() => {
        if (!open) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [open, onClose])

    const signOut = () => {
        setSignedInState('Signed Out')
        signInStateAction('Signed Out')
    }

    if (!open) return null

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Sign in"
        >
            {/* Backdrop (blocks interaction with page) */}
            <button
                type="button"
                aria-label="Close sign-in"
                onClick={onClose}
                className="absolute inset-0 cursor-default bg-black/60"
            />

            {/* Modal panel */}
            <div
                className={[
                    'relative w-[min(92vw,460px)] rounded-2xl',
                    'bg-[#f07a05]/90 backdrop-blur-lg border border-white/10 shadow-lg',
                    'p-6 sm:p-7 text-black',
                    'animate-in fade-in zoom-in-95 duration-150',
                ].join(' ')}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-extrabold tracking-tight text-black">
                            Do you want to sign out?
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/30"
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    onClick={() => signOut()}
                    className={[
                        'mt-1 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold',
                        // navbar-like hover behavior: black base -> hover to white text vibe
                        'bg-black text-white shadow-sm transition-colors',
                        'hover:bg-white hover:text-black',
                        'focus:outline-none focus:ring-2 focus:ring-black/30',
                        'disabled:cursor-not-allowed disabled:opacity-60',
                    ].join(' ')}
                >
                    Sign out
                </button>
            </div>
        </div>
    )
}
