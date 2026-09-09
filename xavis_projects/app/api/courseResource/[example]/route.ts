import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { VAR_RE, ledgerNonce } from '@/app/lib/projectUtils/courseAiFramework/ledger'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Explicit mapping: anything else is a 404.
const RESOURCES: Record<string, string> = {
  '01-morris': '01-morris.md',
  '02-astar': '02-astar.md',
  '03-bencode': '03-bencode.md',
  '03-snapshot-bep_0003': '03-snapshot-bep_0003.md',
  '04-scheduling': '04-scheduling.md',
}

const RESOURCE_DIR = path.join(process.cwd(), 'app', 'lib', 'projectUtils', 'courseAiFramework', 'resources')

function text(body: string, status = 200) {
  return new Response(body, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}

// GET /api/courseResource/<example>[?v=<variant>]
export async function GET(req: Request, ctx: { params: Promise<{ example: string }> }) {
  const { example } = await ctx.params
  const file = RESOURCES[example]
  if (!file) return text('not found', 404)

  const url = new URL(req.url)
  const variant = url.searchParams.get('v') ?? ''
  if (!VAR_RE.test(variant)) return text('bad variant', 400)

  let body: string
  try {
    body = await readFile(path.join(RESOURCE_DIR, file), 'utf8')
  } catch {
    return text('not found', 404)
  }

  const origin = url.origin
  // Example 03 lists its snapshot as a sibling of the resource page. Serve it from this route family.
  const sibling = `${origin}/api/courseResource/03-snapshot-bep_0003`
  body = body
    .replaceAll('{{BASE_URL}}/ledger', `${origin}/api/courseLedger`)
    .replaceAll('{{BASE_URL}}/snapshot-bep_0003.md', sibling)
    .replaceAll('{{BASE_URL}}', `${origin}/api/courseResource`)
    .replaceAll('{{NONCE}}', ledgerNonce() || 'NONCE-NOT-SET')
    .replaceAll('{{VARIANT}}', variant)

  return text(body)
}
