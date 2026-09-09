// Course ledger: validation + append-only text file.
// Mirrors tools/ledger_server.py in the course-ai-project-framework repo.
import { appendFile, access, writeFile } from 'node:fs/promises'
import path from 'node:path'

export const ID_RE = /^[A-Z]{3}[0-9]{6}$/
export const TAG_RE = /^[a-z0-9_-]{1,32}$/
export const VAR_RE = /^[A-Za-z0-9_-]{0,32}$/

export function ledgerNonce(): string {
  return process.env.COURSE_LEDGER_NONCE ?? ''
}

export function ledgerPath(): string {
  return path.resolve(process.env.COURSE_LEDGER_PATH ?? './course-ledger.tsv')
}

export type LedgerFields = Record<string, string>

export type LedgerResult = { ok: true; ids: string[] } | { ok: false; reason: string }

export function validateEntry(fields: LedgerFields): LedgerResult & { tag?: string; variant?: string } {
  const ids = (fields.student_id ?? '')
    .split(',')
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)
  if (ids.length === 0 || ids.length > 2) {
    return { ok: false, reason: 'student_id: give one or two IDs, comma-separated' }
  }
  const bad = ids.filter((i) => !ID_RE.test(i))
  if (bad.length) {
    return { ok: false, reason: `student_id must be three letters + six digits (XXXNNNNNN): ${bad.join(',')}` }
  }
  const nonce = ledgerNonce()
  if (!nonce || (fields.nonce ?? '') !== nonce) {
    return { ok: false, reason: 'nonce does not match the published resource; fetch the page and copy it exactly' }
  }
  const tag = fields.run_tag || 'practice'
  if (!TAG_RE.test(tag)) {
    return { ok: false, reason: 'run_tag: lowercase letters, digits, - or _' }
  }
  const variant = fields.variant ?? ''
  if (!VAR_RE.test(variant)) {
    return { ok: false, reason: 'bad variant' }
  }
  return { ok: true, ids, tag, variant }
}

async function ensureHeader(file: string, nonce: string) {
  try {
    await access(file)
  } catch {
    const started = new Date().toISOString().slice(0, 10)
    await writeFile(
      file,
      `# ledger\tnonce=${nonce}\tstarted=${started}\n# utc_timestamp\tstudent_ids\trun_tag\tvariant\tclient\n`,
      'utf8',
    )
  }
}

export async function appendEntry(ids: string[], tag: string, variant: string, client: string): Promise<void> {
  const file = ledgerPath()
  await ensureHeader(file, ledgerNonce())
  const ts = new Date().toISOString().replace(/\.\d{3}Z$/, '+00:00')
  const line = [ts, ids.join('+'), tag, variant, client].join('\t') + '\n'
  await appendFile(file, line, 'utf8')
}
