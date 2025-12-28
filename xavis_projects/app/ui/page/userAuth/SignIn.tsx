'use client'

import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { useActionState } from 'react'
import { X } from 'lucide-react'
import { signin } from '@/app/actions/auth'

type SignInFormProps = {
  open: boolean
  onClose: () => void
  setSignedInState: Dispatch<SetStateAction<string>>
  signInStateAction: (action:string) => void,
}

export default function SignInForm({ open, onClose, setSignedInState, signInStateAction }: SignInFormProps) {
  const [state, signInAction, pending] = useActionState(signin, undefined);

  // Mange state for sign in form user flows
  useEffect(() => {
    console.log('state Changed')
    console.log(state)

    if (state?.errors) {
      alert(state.errors)
    }

    if (state?.message == 'Login Successful') {
      setSignedInState('Signed In');
      onClose()
    }

  }, [state])

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

  if (!open) return null

  const closeAndOpenSignUpForm = () => {
    signInStateAction('Creating Account')
  }

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
              Welcome!
            </h2>
            <p className="mt-1 text-sm text-black/80"> 
              sign in or create an account for access to functionality that is rate limited, including modal training and data importing
            </p>
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

        <form action={signInAction} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-semibold text-black">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="email@email.com"
              required
              className={[
                'w-full rounded-xl px-4 py-2.5',
                'bg-white/90 text-black placeholder:text-black/40',
                'border border-black/10 shadow-sm',
                'focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-black/20',
              ].join(' ')}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-semibold text-black">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
              minLength={8}
              pattern="(?=.*[A-Za-z])(?=.*\d).{8,}"
              title="Password must be at least 8 characters and include a letter and a number."
              className={[
                'w-full rounded-xl px-4 py-2.5',
                'bg-white/90 text-black placeholder:text-black/40',
                'border border-black/10 shadow-sm',
                'focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-black/20',
              ].join(' ')}
            />
          </div>


          <button
            disabled={pending}
            type="submit"
            className={[
              'mt-1 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold',
              // navbar-like hover behavior: black base -> hover to white text vibe
              'bg-black text-white shadow-sm transition-colors',
              'hover:bg-white hover:text-black',
              'focus:outline-none focus:ring-2 focus:ring-black/30',
              'disabled:cursor-not-allowed disabled:opacity-60',
            ].join(' ')}
          >
            {pending ? 'Signing in…' : 'Sign In'}
          </button>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              className="text-sm font-semibold text-black/80 hover:text-white transition-colors"
              onClick={() => {
                // optional hook for forgot password
              }}
            >
              Forgot password?
            </button>

            <button
              type="button"
              className="text-sm font-semibold text-black/80 hover:text-white transition-colors"
              onClick={closeAndOpenSignUpForm}
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
