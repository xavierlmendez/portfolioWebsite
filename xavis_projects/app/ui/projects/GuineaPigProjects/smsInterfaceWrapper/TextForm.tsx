'use client'

import React, { useState } from 'react'

export const TextForm: React.FC = () => {
    const [accountSid, setAccountSid] = useState('')
    const [authToken, setAuthToken] = useState('')
    const [phone, setPhone] = useState('')
    const [fromPhone, setFromPhone] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

    const cleanPhone = (value: string) => {
        return value.replace(/\D/g, '')   // removes all non-digits
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')

        // needing and putting into compatible names for downstream twilio api
        const to = cleanPhone(phone)
        const from = cleanPhone(fromPhone)
        const body = message

        try {
            const apiBase = typeof window !== 'undefined' ? window.location.origin : '';
            const res = await fetch(apiBase + '/api/smsInterfaceWrapper', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accountSid, authToken, to, from, body }),
            })

            if (!res.ok) throw new Error('Network response was not ok')
            setStatus('success')
        } catch (err) {
            console.error(err)
            setStatus('error')
        }
    }

    return (

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="authToken" className="block text-gray-200 font-medium mb-2 mt-2 pt-1">
                    Twilio Authentication Token
                </label>
                <input
                    id="authToken"
                    name="authToken"
                    value={authToken}
                    onChange={(e) => setAuthToken(e.target.value)}
                    placeholder="[auth token]"
                    className="w-full px-4 py-2 bg-[#0f172a] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FFF7]"
                    required
                />
            </div>

            <div>
                <label htmlFor="accountSid" className="block text-gray-200 font-medium mb-2 mt-2 pt-1">
                    Twilio SID
                </label>
                <input
                    id="accountSid"
                    name="accountSid"
                    value={accountSid}
                    onChange={(e) => setAccountSid(e.target.value)}
                    placeholder="[account Sid]"
                    className="w-full px-4 py-2 bg-[#0f172a] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FFF7]"
                    required
                />
            </div>

            <div>
                <label htmlFor="phone" className="block text-gray-200 font-medium mb-2">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-2 bg-[#0f172a] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FFF7]"
                    required
                />
            </div>

            <div>
                <label htmlFor="fromPhone" className="block text-gray-200 font-medium mb-2">
                    From Phone Number
                </label>
                <input
                    type="tel"
                    id="fromPhone"
                    name="fromPhone"
                    value={fromPhone}
                    onChange={(e) => setFromPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-2 bg-[#0f172a] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FFF7]"
                    required
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-gray-200 font-medium mb-2">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message here..."
                    className="w-full px-4 py-2 bg-[#0f172a] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FFF7] resize-none"
                    required
                />
            </div>


            {status === 'success' && (
                <p className="text-green-400">Message sent successfully!</p>
            )}
            {status === 'error' && (
                <p className="text-red-400">Failed to send message. Try again.</p>
            )}


            <button
                type="submit"
                className="w-full py-2 font-semibold rounded-lg bg-gradient-to-r from-[#00F5D4] via-[#00FFF7] to-[#00E5FF] shadow-md hover:from-[#00E5FF] hover:via-[#00FFF7] hover:to-[#00F5D4] transition"
                disabled={status === 'sending'}
            >
                {status === 'sending' ? 'Sending...' : 'Send Text'}
            </button>

        </form>
    )
}