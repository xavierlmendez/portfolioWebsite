'use client'

import React, { useState } from 'react'

export const TextForm: React.FC = () => {
    const [token, setToken] = useState('')
    const [sid, setSid] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('sending')

        try {
            // Replace '/api/send-sms' with your actual API endpoint
            const res = await fetch('/api/send-sms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({token, sid, phone, message }),
            })

            if (!res.ok) throw new Error('Network response was not ok')
            setStatus('success')
            setToken('')
            setPhone('')
            setMessage('')
        } catch (err) {
            console.error(err)
            setStatus('error')
        }
    }

    return (

        <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="token" className="block text-gray-200 font-medium mb-2 mt-2 pt-1">
                        Twilio Authentication Token
                    </label>
                    <input
                        id="token"
                        name="token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="[auth token]"
                        className="w-full px-4 py-2 bg-[#0f172a] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FFF7]"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="sid" className="block text-gray-200 font-medium mb-2 mt-2 pt-1">
                        Twilio SID
                    </label>
                    <input
                        id="sid"
                        name="sid"
                        value={sid}
                        onChange={(e) => setSid(e.target.value)}
                        placeholder="[sid]"
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