import Link from 'next/link'
import { Header } from '@/app/ui/page/header'

const examples = [
  {
    id: '01-morris',
    title: 'Morris Game, Variant (Project 2, recast)',
    type: 'B',
    twist: 'The Spring 2026 project as assigned: a 23-point board with four diagonal spokes, MINIMAX and ALPHA-BETA opening play, four weighted parts. The prompt-regeneration check becomes a pinned, seeded Type B regeneration with a stated equivalence policy per test category.',
    href: '/api/courseResource/01-morris',
    note: 'Multi-part (45/35/10/10), file-argument CLI contract, graduate depth-4 category.',
  },
  {
    id: '02-astar',
    title: 'A* with a momentum rule',
    type: 'A',
    twist: 'Every fourth step in a straight run is free, so the heuristic has to change to stay admissible.',
    href: '/api/courseResource/02-astar',
    note: 'Deterministic grading path; the ledger is a gate.',
  },
  {
    id: '03-bencode',
    title: 'Bencode with three changes',
    type: 'B',
    twist: 'Hex length prefixes, keys ordered by length then bytes, one-character booleans and null.',
    href: '/api/courseResource/03-bencode',
    note: 'Research-pointer variant: the page points at the BitTorrent BEP 3 spec, snapshotted.',
  },
  {
    id: '04-scheduling',
    title: 'Interval scheduling with a cooldown',
    type: 'A',
    twist: 'A gap derived from the student’s variant must separate chosen jobs, except priority jobs.',
    href: '/api/courseResource/04-scheduling?v=demo',
    note: 'Each student gets their own variant in the URL; this link shows the demo variant.',
  },
]

export default function CourseAiFramework() {
  return (
    <main>
      <Header
        title="Course AI Project Framework"
        description="Four published resources and a ledger for a project students solve by directing an AI harness."
      />

      <p className="text-gray-200 mb-6 leading-relaxed">
        A course project in this framework is a professor-controlled published resource carrying a twist on a
        well-known problem, plus an interface contract, public tests, and hidden tests in weighted categories.
        Students may develop with any tool, but the grade comes only from what a free, local, pinned reference
        harness does with their work, so every run is reproducible and every submission faces the same
        conditions. The published resource instructs the harness to sign a ledger, which turns &ldquo;the harness
        used the internet&rdquo; into a checkable fact. The pages below are the four worked examples&rsquo;
        published resources, served exactly as a harness would fetch them.
      </p>

      <ul className="space-y-4">
        {examples.map((ex) => (
          <li key={ex.id} className="rounded-xl bg-white p-4 shadow-md">
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-semibold text-blue-600">{ex.title}</h3>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                Type {ex.type}
              </span>
            </div>
            <p className="text-gray-700 mt-1">
              <span className="font-medium">Twist:</span> {ex.twist}
            </p>
            <p className="text-gray-500 text-sm mt-1">{ex.note}</p>
            <div className="mt-3 flex gap-4 text-sm">
              <a href={ex.href} className="text-blue-600 underline underline-offset-2">
                Published resource
              </a>
              <Link href="/projects/courseAiFramework/ledger" className="text-blue-600 underline underline-offset-2">
                Sign the ledger
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-gray-400 text-sm mt-6">
        Full design, templates, tools, and the four examples live in the framework repo (private until Xavier
        publishes it).
      </p>
    </main>
  )
}
