// Course ledger: validation + append-only text file.
//
// This mirrors tools/ledger_server.py in the course-ai-project-framework repo,
// deliberately and line for line where behaviour is observable: the same regexes,
// the same accepted input, the same rejection messages, the same TSV columns and
// the same two header lines. TA tooling greps the file (`grep -P '\tgrading-k[123]\t'`),
// so a divergence here silently breaks grading. See DECISIONS.md.
import { appendFileSync, writeFileSync } from 'node:fs'
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

export type LedgerResult =
  | { ok: true; ids: string[]; tag: string; variant: string }
  | { ok: false; reason: string }

// urllib.parse.parse_qs drops blank values and the reference takes v[0] of each key.
export function parseFormFields(raw: string): LedgerFields {
  const out: LedgerFields = {}
  for (const [k, v] of new URLSearchParams(raw)) {
    if (v === '') continue
    if (!(k in out)) out[k] = v
  }
  return out
}

// json.loads(raw).items() raises for anything that is not an object, and str(v)
// stringifies each value. Returns null where the reference would answer 'bad json'.
export function parseJsonFields(body: unknown): LedgerFields | null {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) return null
  return Object.fromEntries(Object.entries(body as Record<string, unknown>).map(([k, v]) => [k, String(v)]))
}

export function validateEntry(fields: LedgerFields): LedgerResult {
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
  // The reference server refuses to start without --nonce, so an empty nonce is
  // unreachable there. Here the value comes from a Secret that may be missing:
  // fail closed rather than accept an empty nonce, with the same message.
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

// The reference reads the peer address off the socket (self.client_address[0]).
// A Next route handler has no socket, only headers, and X-Forwarded-For is
// forgeable with `curl -H 'X-Forwarded-For: 1.2.3.4'` unless an ingress that
// overwrites it sits in front. Behind the current LoadBalancer Service (L4) no
// such header exists, so the column reads 'unknown' until an ingress is added
// and COURSE_LEDGER_TRUST_PROXY is set. The column is informational only.
export function trustedProxy(): boolean {
  const v = (process.env.COURSE_LEDGER_TRUST_PROXY ?? '').trim().toLowerCase()
  return v === '1' || v === 'true' || v === 'yes'
}

export function clientAddress(headers: { get(name: string): string | null }): string {
  if (!trustedProxy()) return 'unknown'
  const xff = headers.get('x-forwarded-for')?.split(',')[0].trim()
  return xff || headers.get('x-real-ip')?.trim() || 'unknown'
}

// datetime.now(timezone.utc).isoformat(timespec="seconds") -> 2026-09-08T12:34:56+00:00
export function utcTimestamp(now: Date = new Date()): string {
  return now.toISOString().slice(0, 19) + '+00:00'
}

export function headerLines(nonce: string, now: Date = new Date()): string {
  const started = now.toISOString().slice(0, 10)
  return (
    `# ledger\tnonce=${nonce}\tstarted=${started}\n` +
    '# utc_timestamp\tstudent_ids\trun_tag\tvariant\tclient\n'
  )
}

export function entryLine(ids: string[], tag: string, variant: string, client: string, now: Date = new Date()): string {
  return [utcTimestamp(now), ids.join('+'), tag, variant, client].join('\t') + '\n'
}

// One write per entry, and the header is written together with the first entry
// under an exclusive create (wx). Two concurrent first signatures therefore
// cannot both truncate the file: the loser gets EEXIST and appends instead.
export function appendEntrySync(
  ids: string[],
  tag: string,
  variant: string,
  client: string,
  file: string = ledgerPath(),
  nonce: string = ledgerNonce(),
  now: Date = new Date(),
): void {
  const line = entryLine(ids, tag, variant, client, now)
  try {
    writeFileSync(file, headerLines(nonce, now) + line, { encoding: 'utf8', flag: 'wx' })
    return
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'EEXIST') throw err
  }
  appendFileSync(file, line, 'utf8')
}

// Per-process serialisation on top of the exclusive create: request handlers in
// one Node process queue behind each other, so entries land in arrival order.
let chain: Promise<void> = Promise.resolve()

export async function appendEntry(ids: string[], tag: string, variant: string, client: string): Promise<void> {
  const run = chain.then(() => appendEntrySync(ids, tag, variant, client))
  chain = run.then(
    () => undefined,
    () => undefined,
  )
  return run
}
