'use client'

import { Header } from "../ui/page/header";

export default function AboutPage() {

  const pageTitle = "About Xavi's Projects";
  
  const summary =
    "Welcome to Xavi's Projects! a window into my experiments with new software patterns, tools, and technologies. " +
    "I'm Xavier, a backend-focused developer diving into cloud platforms and picking up frontend skills along the way. " +
    'I created this site as both a living portfolio and a sandbox for learning, tinkering, and sharing insights with the developer community.';

  const sitePlan =
    'This site is intentionally minimal to start, prioritizing clean structure over visual fluff. ' +
    'My immediate goals:\n' +
    '• Build a personal playground to try out new tools, design patterns, and APIs.\n' +
    '• Provide a frontend UI for backend-focused projects, including a text message service interface and financial analytics apps.\n' +
    '• Gradually evolve this platform into a polished proof-of-work, and an open resource for fellow engineers.';

  const currentProjects = [
    {
      name: 'Kafka Visualizer',
      description: 'Visualizes real-time Kafka traffic for learning and debugging event-driven architectures.',
      status: 'In Progress',
    },
    {
      name: 'Text Message Service Interface',
      description: 'Frontend for a backend messaging API wrapper to experiment with async communication.',
      status: 'Prototype',
    },
    {
      name: 'Culinary Connection',
      description: 'Connects culinary students with local customers—explores scalable backend and data modeling.',
      status: 'Alpha',
    },
    {
      name: 'Bot Maker',
      description: 'A sandbox for building trading bots and analyzing financial signals.',
      status: 'Exploring',
    },
  ]

  return (
    <main className='w-full min-h-screen flex flex-col items-center px-4 py-8'>

      <Header title={pageTitle} description={summary} />

      <section id='sitePlan' className='w-full max-w-4xl bg-gray-900 rounded-2xl shadow-md p-6 mb-8'>
        <h2 className='text-2xl font-semibold mb-4 text-white'>Site Mission & Evolution</h2>
        <pre className='text-gray-300 whitespace-pre-line font-sans'>{sitePlan}</pre>
      </section>

      <section id='currentProjects' className='w-full max-w-4xl mb-8'>
        <h2 className='text-2xl font-semibold text-white mr-2 p-4'>Active Experiments</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {currentProjects.map((proj) => (
            <div key={proj.name} className='bg-gray-800 rounded-xl p-4 flex flex-col shadow hover:scale-[1.025] transition-transform'>
              <h3 className='text-lg font-semibold text-emerald-300'>{proj.name}</h3>
              <p className='text-gray-300 text-sm mb-1'>{proj.description}</p>
              <span className='text-xs bg-gray-700 text-emerald-400 rounded-full px-2 py-1 self-start'>{proj.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section id='archImagePlaceholder' className='w-full max-w-4xl mb-8 flex justify-center'>
        <div className='w-full h-40 max-w-lg bg-gray-900 rounded-2xl flex items-center justify-center border-2 border-dashed border-emerald-500'>
          <span className='text-gray-500 italic'>[Project architecture visual coming soon]</span>
        </div>
      </section>

      <section id='philosophy' className='w-full max-w-4xl bg-gray-900 rounded-2xl shadow-md p-6 mb-8'>
        <h2 className='text-2xl font-semibold mb-4 text-white'>How I Approach Learning & Building</h2>
        <ul className='list-disc list-inside text-gray-300 space-y-1 ml-4'>
          <li>
            <span className='text-emerald-400 font-semibold'>Learning in public:</span> I document successes and stumbles so others can learn with me.
          </li>
          <li>
            <span className='text-emerald-400 font-semibold'>Intentional system design:</span> Each project balances simplicity, flexibility, and future scalability—architectural write-ups are shared as I iterate.
          </li>
          <li>
            <span className='text-emerald-400 font-semibold'>Community focus:</span> I welcome questions, code reviews, and collaboration—connect via <a href='https://linkedin.com/in/xavierlmendez' className='underline text-emerald-400'>LinkedIn</a>!
          </li>
        </ul>
      </section>
    </main>
  )
}
