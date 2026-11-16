import { Header } from '@/app/ui/page/header';

// Static content only. The sample scores below were produced offline by running a verbatim copy of
// the prototype's scoring function on invented reports; see docs/BACKLOG.md.

interface SampleScore {
  report: string;
  urgencyHint: string;
  priority: string;
  confidence: string;
}

const steps = [
  {
    title: 'A report comes in',
    text: 'Someone describes an animal that needs help, where it is, and, optionally, how urgent they think it is (low, medium or high).',
  },
  {
    title: 'The software suggests a priority',
    text: 'A small set of written rules looks for words such as "stuck", "flood", "injured" or "fire" in the report and takes the urgency hint into account. It suggests a priority from P1 (most urgent) to P3, with a confidence value, and always marks the suggestion as needing human approval.',
  },
  {
    title: 'A person reviews it',
    text: 'Every new incident goes straight to "needs human review". A reviewer approves or rejects it, gives a reason, and can set a different final priority than the one suggested.',
  },
  {
    title: 'Only approved incidents can be acted on',
    text: 'An approved incident can be marked as executed. A rejected incident can be reopened for another review.',
  },
  {
    title: 'Every step is recorded',
    text: 'Each change of state is written to an audit trail: from which state to which, who made the change, why, and when. A step taken out of order, such as executing an incident nobody has approved, is refused.',
  },
];

const sampleScores: SampleScore[] = [
  {
    report: 'Dog stuck on a roof in rising flood water',
    urgencyHint: 'high',
    priority: 'P1',
    confidence: '0.95',
  },
  {
    report: 'Dog stuck on a roof in rising flood water',
    urgencyHint: 'none given',
    priority: 'P2',
    confidence: '0.75',
  },
  {
    report: 'Cat hiding under a porch, seems calm, owner is nearby',
    urgencyHint: 'none given',
    priority: 'P3',
    confidence: '0.5',
  },
];

const transitions = [
  { from: 'draft', to: 'needs human review', note: 'happens automatically when an incident is created' },
  { from: 'needs human review', to: 'approved or rejected', note: 'a reviewer decides and gives a reason' },
  { from: 'approved', to: 'executed', note: 'only approved incidents can be executed' },
  { from: 'rejected', to: 'needs human review', note: 'reopened for another review' },
  { from: 'executed', to: 'nothing further', note: 'final state' },
];

const builtToday = [
  'A backend prototype with endpoints to score a report, create and list incidents, look up one incident with its history, and review, reopen or execute an incident.',
  'The approval state machine shown above, with an audit trail of every change and out-of-order steps refused.',
  'The rule-based priority scorer. It is a short list of keyword and urgency rules, not a trained model.',
];

const notYet = [
  'Saving data. Incidents are kept in memory and are lost when the server restarts. A database schema is drafted but not connected.',
  'Sign-in and roles. The frontend names three roles (operator, reviewer, admin), but nothing enforces them yet, and the reviewer is whoever the request says it is.',
  'The responder and reviewer dashboard. The frontend is an early scaffold: a page stating the intent, a sign-in page with only a heading, and a placeholder dashboard. It does not talk to the backend yet.',
  'Automated tests.',
  'Hosting. Nothing is online, and it has not been used in a real disaster response.',
];

export default function DisasterPaws() {
  return (
    <main className="w-full max-w-4xl">
      <Header
        title="Disaster Paws"
        description="An early prototype for organising animal rescue reports after natural disasters, with a person approving every decision."
      />

      <section aria-labelledby="what-it-is" className="mb-10">
        <h2 id="what-it-is" className="text-2xl font-semibold text-white mb-3">
          What it is
        </h2>
        <p className="text-gray-200 leading-relaxed">
          Disaster Paws is meant to help teams reunite lost animals with their families after
          natural disasters, with tools that support field responders. The core idea is that the
          software may suggest how urgent a report is, but a person must approve it before anything
          is acted on. It is at an early stage: a backend prototype and the start of a frontend.
        </p>
      </section>

      <section aria-labelledby="how-it-works" className="mb-10">
        <h2 id="how-it-works" className="text-2xl font-semibold text-white mb-3">
          How it works
        </h2>
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="sample-scores" className="mb-10">
        <h2 id="sample-scores" className="text-2xl font-semibold text-white mb-3">
          Sample suggestions
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Three invented reports run offline through an exact copy of the prototype&rsquo;s scoring
          rules. The priorities and confidence values are its real output. Each one is only a
          suggestion and would still go to a person for review.
        </p>
        <ul className="space-y-4">
          {sampleScores.map((sample) => (
            <li
              key={`${sample.report}-${sample.urgencyHint}`}
              className="rounded-xl bg-white p-4 shadow-md"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <blockquote className="border-l-4 border-blue-200 pl-3 text-gray-800">
                  <p>&ldquo;{sample.report}&rdquo;</p>
                  <footer className="text-sm text-gray-500">Urgency hint: {sample.urgencyHint}</footer>
                </blockquote>
                <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  Suggested {sample.priority} · confidence {sample.confidence}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="states" className="mb-10">
        <h2 id="states" className="text-2xl font-semibold text-white mb-3">
          Allowed steps
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          An incident can only move along these steps. Any other move is refused.
        </p>
        <div className="overflow-x-auto rounded-xl bg-white shadow-md">
          <table className="w-full text-left text-gray-800">
            <thead className="bg-blue-50 text-sm text-blue-800">
              <tr>
                <th scope="col" className="px-4 py-2 font-semibold">From</th>
                <th scope="col" className="px-4 py-2 font-semibold">Can move to</th>
                <th scope="col" className="px-4 py-2 font-semibold">Note</th>
              </tr>
            </thead>
            <tbody>
              {transitions.map((row) => (
                <tr key={row.from} className="border-t border-gray-200">
                  <td className="px-4 py-2 font-medium">{row.from}</td>
                  <td className="px-4 py-2">{row.to}</td>
                  <td className="px-4 py-2 text-gray-600">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="status" className="mb-10">
        <h2 id="status" className="text-2xl font-semibold text-white mb-3">
          What is built today, and what is not
        </h2>
        <h3 className="font-semibold text-white mb-2">Built today</h3>
        <ul className="list-disc space-y-2 pl-6 text-gray-300 leading-relaxed mb-4">
          {builtToday.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h3 className="font-semibold text-white mb-2">Not yet</h3>
        <ul className="list-disc space-y-2 pl-6 text-gray-300 leading-relaxed">
          {notYet.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="stack">
        <h2 id="stack" className="text-2xl font-semibold text-white mb-3">
          Stack
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Backend: Node.js 20, TypeScript, Fastify 5 and Zod for request validation, with a drafted
          Prisma schema for PostgreSQL. Frontend scaffold: Next.js 16, React 19 and Tailwind CSS 4.
        </p>
      </section>
    </main>
  );
}
