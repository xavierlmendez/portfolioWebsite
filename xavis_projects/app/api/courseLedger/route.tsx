import { appendEntry, validateEntry, type LedgerFields } from '@/app/lib/projectUtils/courseAiFramework/ledger'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function text(body: string, status = 200) {
  return new Response(body, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}

// GET /api/courseLedger — the ledger is write-only; never serve the file.
export async function GET() {
  return text('The ledger is write-only. Sign it at /projects/courseAiFramework/ledger', 405)
}

// POST /api/courseLedger — form-encoded or JSON: student_id, nonce, run_tag?, variant?
export async function POST(req: Request) {
  let fields: LedgerFields = {}
  const ctype = req.headers.get('content-type') ?? ''
  try {
    if (ctype.includes('json')) {
      const body = await req.json()
      if (!body || typeof body !== 'object') return text('bad json', 400)
      fields = Object.fromEntries(Object.entries(body).map(([k, v]) => [k, String(v)]))
    } else {
      const raw = await req.text()
      fields = Object.fromEntries(new URLSearchParams(raw).entries())
    }
  } catch {
    return text(ctype.includes('json') ? 'bad json' : 'bad form body', 400)
  }

  const v = validateEntry(fields)
  if (!v.ok) return text(v.reason, 400)

  const client = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  try {
    await appendEntry(v.ids, v.tag ?? 'practice', v.variant ?? '', client)
  } catch (err) {
    console.error('courseLedger append failed:', err)
    return text('ledger unavailable; tell course staff', 500)
  }
  return text('ok: ledger signed for ' + v.ids.join('+'))
}
