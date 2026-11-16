import { Header } from '@/app/ui/page/header';

// Static content only. The sample findings below were generated offline from an original test
// story (invented names, planted mistakes) with the tool's fixture provider; see docs/BACKLOG.md.

interface Receipt {
  quote: string;
  where: string;
}

interface SampleFinding {
  title: string;
  rule: string;
  severity: string;
  receipts: Receipt[];
  why: string;
}

const steps = [
  {
    title: 'Read',
    text: 'You give it your manuscript (Markdown, plain text or EPUB) and any world material you keep: maps, character sheets, a world bible.',
  },
  {
    title: 'Pull out facts, each with its quote',
    text: 'It notes who is where, who has what, who is related to whom and what happens when. Every fact keeps the exact quote it came from and where that quote is. When it cannot settle something, such as which character a pronoun means, it asks you instead of guessing.',
  },
  {
    title: 'Check the facts against written rules',
    text: 'Contradictions come only from explicit logic rules (for example: a character who has died cannot act later; a journey cannot be faster than the route allows). A language model reads the text, but it does not decide what counts as a contradiction.',
  },
  {
    title: 'You review each finding',
    text: 'Each finding shows the conflicting quotes, a plain explanation and the ways to resolve it. You decide. Every decision is added to a log that is never rewritten, so any decision can be undone.',
  },
  {
    title: 'It suggests, and never edits',
    text: 'It can suggest which side is right, marked as unverified, and draft a replacement passage as a separate patch file. It never changes your manuscript.',
  },
];

const sampleFindings: SampleFinding[] = [
  {
    title: 'A character acts after dying',
    rule: 'dead_acts',
    severity: 'Blocker',
    receipts: [
      { quote: 'Hesk died that night.', where: 'ch01.md ¶5 · 2 Mar 1204' },
      {
        quote: 'Hesk had cousins in Fennick and meant to sell his barrels there.',
        where: 'ch02.md ¶2 · 3 Mar 1204',
      },
    ],
    why: 'hesk is recorded dead at 2 Mar 1204 but at is narrated at 3 Mar 1204.',
  },
  {
    title: 'Two different fathers',
    rule: 'attr_conflict',
    severity: 'Major',
    receipts: [
      { quote: 'Mara, daughter of Leofric, said nothing more about it.', where: 'ch02.md ¶3' },
      { quote: 'Mara, daughter of Aldric, said nothing more about it.', where: 'ch04.md ¶5' },
    ],
    why: 'mara has two values for the static attribute father: leofric and aldric.',
  },
  {
    title: 'A journey faster than the route allows',
    rule: 'travel_time',
    severity: 'Major',
    receipts: [
      { quote: 'On 2 March 1204 Mara Venn set out from Harrowgate', where: 'ch01.md ¶2 · 2 Mar 1204' },
      { quote: 'on 3 March 1204 the cart finally reached Fennick', where: 'ch02.md ¶2 · 3 Mar 1204' },
      { quote: '| Harrowgate | Fennick | 3 |', where: 'bible.md ¶5 · route table, minimum days' },
    ],
    why: 'mara goes from harrowgate (2 Mar 1204) to fennick (3 Mar 1204) in 1 days, but the route takes at least 3.',
  },
];

const builtToday = [
  'A command-line tool and a web interface that both run on your own computer. The web interface listens only on your own machine, has no login, and is not meant to be put on a network.',
  'An offline mode that reads prepared test data, so the whole pipeline can run with no API key and nothing leaving the computer. 400 automated tests run in this mode.',
  'A live mode in which you supply your own Anthropic API key. In this mode, passages of your manuscript are sent to the Anthropic API to be read.',
];

const notYet = [
  'It is not released. There is no download, public code repository or licence yet.',
  'The live mode is a proof of concept: it has had one small, documented test run on three short passages.',
  'The evaluation harness, which compares it with a plain long-prompt approach on planted mistakes, is described in its own documentation as a rough proof of concept.',
  'There is no hosted demo. The tool is meant to run on your own machine with your own key, so your manuscript stays under your control, and its web interface has no login.',
];

export default function Lorecheck() {
  return (
    <main className="w-full max-w-4xl">
      <Header
        title="lorecheck"
        description="A consistency checker for authors, editors and game masters."
      />

      <section aria-labelledby="what-it-is" className="mb-10">
        <h2 id="what-it-is" className="text-2xl font-semibold text-white mb-3">
          What it is
        </h2>
        <p className="text-gray-200 leading-relaxed">
          lorecheck reads a manuscript together with the world material around it and looks for
          places where the story contradicts itself: a character who appears after their death, a
          journey made faster than the map allows, a parent who changes between chapters. Every
          finding comes with the exact quotes that disagree, so you can check it yourself. It points
          out problems and suggests fixes; the decisions and the writing stay yours.
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

      <section aria-labelledby="sample-findings" className="mb-10">
        <h2 id="sample-findings" className="text-2xl font-semibold text-white mb-3">
          Sample findings
        </h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Three of the twelve findings from one offline run on a short test story written for the
          tool, with invented names and mistakes planted on purpose. In this mode the facts come
          from prepared test data rather than a language model; the rule checks, explanations and
          findings are the tool&rsquo;s own output, with quotes and explanations shown as it wrote
          them.
        </p>
        <ul className="space-y-4">
          {sampleFindings.map((finding) => (
            <li key={finding.rule} className="rounded-xl bg-white p-4 shadow-md">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold text-blue-600">{finding.title}</h3>
                <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  {finding.severity} · rule {finding.rule}
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {finding.receipts.map((receipt) => (
                  <blockquote
                    key={receipt.where}
                    className="border-l-4 border-blue-200 pl-3 text-gray-800"
                  >
                    <p>&ldquo;{receipt.quote}&rdquo;</p>
                    <footer className="text-sm text-gray-500">{receipt.where}</footer>
                  </blockquote>
                ))}
              </div>
              <p className="mt-3 text-gray-700">
                <span className="font-medium">Why it is flagged:</span> {finding.why}
              </p>
            </li>
          ))}
        </ul>
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
          Python 3.12, SWI-Prolog for the logic rules, the Anthropic API for reading the text
          (structured outputs validated with pydantic), and a standard-library local web server
          with plain JavaScript modules for the interface.
        </p>
      </section>
    </main>
  );
}
