import {
  appendEntry,
  clientAddress,
  parseFormFields,
  parseJsonFields,
  validateEntry,
  type LedgerFields,
} from '@/app/lib/projectUtils/courseAiFramework/ledger'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function text(body: string, status = 200) {
  return new Response(body, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}

// GET /api/courseLedger — the ledger is write-only; never serve the file.
// The reference server answers GET /ledger with the sign-in form; here the form
// is a page in the app, so this points at it.
export async function GET() {
  return text('The ledger is write-only. Sign it at /projects/courseAiFramework/ledger', 405)
}

// POST /api/courseLedger — form-encoded or JSON: student_id, nonce, run_tag?, variant?
export async function POST(req: Request) {
  let fields: LedgerFields
  const ctype = req.headers.get('content-type') ?? ''
  try {
    if (ctype.includes('json')) {
      const parsed = parseJsonFields(await req.json())
      if (!parsed) return text('bad json', 400)
      fields = parsed
    } else {
      fields = parseFormFields(await req.text())
    }
  } catch {
    return text('bad json', 400)
  }

  const v = validateEntry(fields)
  if (!v.ok) return text(v.reason, 400)

  try {
    await appendEntry(v.ids, v.tag, v.variant, clientAddress(req.headers))
  } catch (err) {
    console.error('courseLedger append failed:', err)
    return text('ledger unavailable; tell course staff', 500)
  }
  return text('ok: ledger signed for ' + v.ids.join('+'))
}
