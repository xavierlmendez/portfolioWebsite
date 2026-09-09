// Tests for the course ledger. These lock the site to tools/ledger_server.py in the
// course-ai-project-framework repo: the same accepted input, the same rejection
// messages, the same TSV format. A change to ID_RE or the header format that
// desyncs the site from the TA tooling should fail here.
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  appendEntry,
  appendEntrySync,
  clientAddress,
  entryLine,
  headerLines,
  ID_RE,
  parseFormFields,
  parseJsonFields,
  TAG_RE,
  utcTimestamp,
  validateEntry,
  VAR_RE,
} from './ledger'

const NONCE = 'test-nonce-123'
let dir: string

beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), 'ledger-'))
  process.env.COURSE_LEDGER_NONCE = NONCE
  process.env.COURSE_LEDGER_PATH = path.join(dir, 'course-ledger.tsv')
  delete process.env.COURSE_LEDGER_TRUST_PROXY
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

const file = () => path.join(dir, 'course-ledger.tsv')
const read = () => readFileSync(file(), 'utf8')

describe('regexes match ledger_server.py', () => {
  it('accepts three letters and six digits only', () => {
    expect(ID_RE.test('ABC123456')).toBe(true)
    expect(ID_RE.test('ABC12345')).toBe(false)
    expect(ID_RE.test('ABCD12345')).toBe(false)
    expect(ID_RE.test('abc123456')).toBe(false)
    expect(ID_RE.test('ABC123456\n')).toBe(false)
  })

  it('accepts run tags of lowercase letters, digits, - and _', () => {
    expect(TAG_RE.test('grading-k1')).toBe(true)
    expect(TAG_RE.test('practice')).toBe(true)
    expect(TAG_RE.test('Grading')).toBe(false)
    expect(TAG_RE.test('a'.repeat(33))).toBe(false)
  })

  it('accepts an empty variant and rejects punctuation', () => {
    expect(VAR_RE.test('')).toBe(true)
    expect(VAR_RE.test('v2_a-b')).toBe(true)
    expect(VAR_RE.test('v/2')).toBe(false)
  })
})

describe('validateEntry', () => {
  const ok = { student_id: 'ABC123456', nonce: NONCE }

  it('accepts a single ID and defaults the run tag to practice', () => {
    const v = validateEntry(ok)
    expect(v).toEqual({ ok: true, ids: ['ABC123456'], tag: 'practice', variant: '' })
  })

  it('normalises a comma-separated pair, trimming and upper-casing', () => {
    const v = validateEntry({ student_id: ' abc123456 , def654321 ', nonce: NONCE })
    expect(v.ok && v.ids).toEqual(['ABC123456', 'DEF654321'])
    expect(v.ok && entryLine(v.ids, v.tag, v.variant, 'unknown').split('\t')[1]).toBe('ABC123456+DEF654321')
  })

  it('rejects zero and three IDs with the reference message', () => {
    const msg = 'student_id: give one or two IDs, comma-separated'
    expect(validateEntry({ nonce: NONCE })).toEqual({ ok: false, reason: msg })
    expect(validateEntry({ student_id: ' , ', nonce: NONCE })).toEqual({ ok: false, reason: msg })
    expect(validateEntry({ student_id: 'ABC123456,DEF654321,GHI111111', nonce: NONCE })).toEqual({
      ok: false,
      reason: msg,
    })
  })

  it('names every malformed ID in the rejection', () => {
    expect(validateEntry({ student_id: 'AB1,ZZ2', nonce: NONCE })).toEqual({
      ok: false,
      reason: 'student_id must be three letters + six digits (XXXNNNNNN): AB1,ZZ2',
    })
  })

  it('rejects a wrong, missing or empty-server nonce', () => {
    const msg = 'nonce does not match the published resource; fetch the page and copy it exactly'
    expect(validateEntry({ student_id: 'ABC123456', nonce: 'wrong' })).toEqual({ ok: false, reason: msg })
    expect(validateEntry({ student_id: 'ABC123456' })).toEqual({ ok: false, reason: msg })
    delete process.env.COURSE_LEDGER_NONCE
    expect(validateEntry({ student_id: 'ABC123456', nonce: '' })).toEqual({ ok: false, reason: msg })
  })

  it('checks the ID before the nonce, as the reference does', () => {
    const v = validateEntry({ student_id: 'nope', nonce: 'wrong' })
    expect(v.ok).toBe(false)
    expect(!v.ok && v.reason.startsWith('student_id must be')).toBe(true)
  })

  it('rejects a bad run tag and a bad variant', () => {
    expect(validateEntry({ ...ok, run_tag: 'Grading K1' })).toEqual({
      ok: false,
      reason: 'run_tag: lowercase letters, digits, - or _',
    })
    expect(validateEntry({ ...ok, variant: 'v 2' })).toEqual({ ok: false, reason: 'bad variant' })
  })

  it('treats an empty run tag as practice', () => {
    expect(validateEntry({ ...ok, run_tag: '' })).toEqual({ ok: true, ids: ['ABC123456'], tag: 'practice', variant: '' })
  })
})

describe('body parsing mirrors the reference', () => {
  it('drops blank form values and keeps the first of a repeated key, like parse_qs', () => {
    expect(parseFormFields('student_id=ABC123456&variant=&run_tag=a&run_tag=b')).toEqual({
      student_id: 'ABC123456',
      run_tag: 'a',
    })
  })

  it('stringifies JSON values and refuses anything that is not an object', () => {
    expect(parseJsonFields({ student_id: 'ABC123456', variant: 3 })).toEqual({
      student_id: 'ABC123456',
      variant: '3',
    })
    expect(parseJsonFields(['ABC123456'])).toBeNull()
    expect(parseJsonFields(null)).toBeNull()
    expect(parseJsonFields('ABC123456')).toBeNull()
  })
})

describe('client address', () => {
  const headers = (h: Record<string, string>) => ({ get: (n: string) => h[n.toLowerCase()] ?? null })

  it('ignores a forwarded header when no proxy is trusted', () => {
    expect(clientAddress(headers({ 'x-forwarded-for': '1.2.3.4' }))).toBe('unknown')
  })

  it('takes the first forwarded hop behind a trusted proxy', () => {
    process.env.COURSE_LEDGER_TRUST_PROXY = 'true'
    expect(clientAddress(headers({ 'x-forwarded-for': '1.2.3.4, 10.0.0.1' }))).toBe('1.2.3.4')
    expect(clientAddress(headers({ 'x-real-ip': '5.6.7.8' }))).toBe('5.6.7.8')
    expect(clientAddress(headers({}))).toBe('unknown')
  })
})

describe('file format', () => {
  const at = new Date('2026-09-08T12:34:56.789Z')

  it('writes a second-resolution UTC timestamp like isoformat(timespec="seconds")', () => {
    expect(utcTimestamp(at)).toBe('2026-09-08T12:34:56+00:00')
  })

  it('writes the two reference header lines', () => {
    expect(headerLines(NONCE, at)).toBe(
      `# ledger\tnonce=${NONCE}\tstarted=2026-09-08\n# utc_timestamp\tstudent_ids\trun_tag\tvariant\tclient\n`,
    )
  })

  it('writes the five TSV columns in order', () => {
    expect(entryLine(['ABC123456', 'DEF654321'], 'grading-k1', 'v2', '1.2.3.4', at)).toBe(
      '2026-09-08T12:34:56+00:00\tABC123456+DEF654321\tgrading-k1\tv2\t1.2.3.4\n',
    )
  })

  it('is greppable the way the TA tooling greps it', () => {
    appendEntrySync(['ABC123456'], 'grading-k1', '', 'unknown', file(), NONCE, at)
    expect(read().includes('\tgrading-k1\t')).toBe(true)
  })
})

describe('appending', () => {
  it('writes the header once, on the first entry only', () => {
    appendEntrySync(['ABC123456'], 'practice', '', 'unknown', file(), NONCE)
    appendEntrySync(['DEF654321'], 'practice', '', 'unknown', file(), NONCE)
    const lines = read().trimEnd().split('\n')
    expect(lines).toHaveLength(4)
    expect(lines.filter((l) => l.startsWith('# ledger'))).toHaveLength(1)
    expect(lines[2].split('\t')[1]).toBe('ABC123456')
    expect(lines[3].split('\t')[1]).toBe('DEF654321')
  })

  it('keeps every concurrent entry, and the first one is not lost to the header write', async () => {
    const ids = Array.from({ length: 25 }, (_, i) => `ABC${String(i).padStart(6, '0')}`)
    await Promise.all(ids.map((id) => appendEntry([id], 'practice', '', 'unknown')))
    const lines = read().trimEnd().split('\n')
    expect(lines.filter((l) => l.startsWith('#'))).toHaveLength(2)
    const written = lines.filter((l) => !l.startsWith('#')).map((l) => l.split('\t')[1])
    expect(written).toHaveLength(ids.length)
    expect(new Set(written)).toEqual(new Set(ids))
    for (const l of lines.filter((x) => !x.startsWith('#'))) {
      expect(l.split('\t')).toHaveLength(5)
    }
  })

  it('appends to a ledger that already exists without a header', () => {
    appendEntrySync(['ABC123456'], 'practice', '', 'unknown', file(), NONCE)
    const before = read()
    appendEntrySync(['DEF654321'], 'practice', '', 'unknown', file(), NONCE)
    expect(read().startsWith(before)).toBe(true)
  })
})
