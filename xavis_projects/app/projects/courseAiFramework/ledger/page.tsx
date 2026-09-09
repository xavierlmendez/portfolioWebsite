'use client'

import { useState } from 'react'
import { Header } from '@/app/ui/page/header'

export default function CourseLedgerForm() {
  const [studentId, setStudentId] = useState('')
  const [nonce, setNonce] = useState('')
  const [runTag, setRunTag] = useState('practice')
  const [variant, setVariant] = useState('')
  const [reply, setReply] = useState<{ ok: boolean; text: string } | null>(null)
  const [busy, setBusy] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true)
    setReply(null)
    try {
      const body = new URLSearchParams({ student_id: studentId, nonce, run_tag: runTag, variant })
      const res = await fetch('/api/courseLedger', { method: 'POST', body })
      setReply({ ok: res.ok, text: await res.text() })
    } catch {
      setReply({ ok: false, text: 'Could not reach the ledger. Try again.' })
    } finally {
      setBusy(false)
    }
  }

  const field = 'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900'
  const label = 'block text-sm font-medium text-gray-200 mb-1'

  return (
    <main>
      <Header title="Course ledger" description="Sign with your student ID and the nonce from the published resource." />
      <form onSubmit={submit} className="max-w-md space-y-4">
        <div>
          <label htmlFor="student_id" className={label}>Student ID(s), comma-separated for a pair</label>
          <input id="student_id" className={field} value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="ABC123456" required />
        </div>
        <div>
          <label htmlFor="nonce" className={label}>Nonce from the resource page</label>
          <input id="nonce" className={field} value={nonce} onChange={(e) => setNonce(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="run_tag" className={label}>Run tag</label>
          <input id="run_tag" className={field} value={runTag} onChange={(e) => setRunTag(e.target.value)} />
        </div>
        <div>
          <label htmlFor="variant" className={label}>Variant (only if your URL had one)</label>
          <input id="variant" className={field} value={variant} onChange={(e) => setVariant(e.target.value)} />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-black/80 px-4 py-2 text-sm font-semibold text-white hover:bg-white hover:text-black transition-colors disabled:opacity-50"
        >
          {busy ? 'Signing…' : 'Sign the ledger'}
        </button>
      </form>
      {reply && (
        <p className={`mt-4 font-mono text-sm ${reply.ok ? 'text-green-300' : 'text-red-300'}`} role="status">
          {reply.text}
        </p>
      )}
      <p className="mt-6 text-sm text-gray-400">The ledger is write-only. Entries are visible to course staff only.</p>
    </main>
  )
}
