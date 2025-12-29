'use client'
import Image from 'next/image'

const currentProjects = [
  {
    name: 'Stock Watchlist',
    description: 'A Frontend UI to pull stock information for the day from the Yahoo Finance API.',
    status: 'Prototype - Continuous Development',
    link: '/projects/watchList',
  },
  {
    name: 'Text Message Service Interface',
    description: 'A frontend UI for testing and visualizing backend messaging API integrations.',
    status: 'Prototype',
    link: '/projects/guineaPigProjects/smsInterfaceWrapper',
  },
  {
    name: 'Kafka Visualizer',
    description: 'Monitor and understand real-time message flows in distributed systems using Apache Kafka.',
    status: 'In Progress',
    link: '/projects/guineaPigProjects/kafkaFrontEnd',
  },
  {
    name: 'Real-Time Alerts',
    description: 'A project that will incorporate the Text Message Service and Stock Watchlist to provide real time alerts based off indicators.',
    status: 'Exploring',
    link: '/projects/alerts',
  },
  {
    name: 'Strategy Backtester',
    description: 'This will serve as a pre-cursor to Bot Maker to start building the infrastructure to store analytical data and display it via the displaying and analysis of indicators created in Stategy Backtester',
    status: 'Exploring',
    link: '/projects/strategyBacktester',
  },
  {
    name: 'Bot Maker',
    description: 'An experimentation ground for algorithmic trading / general ML bots and analytics tools.',
    status: 'Exploring',
    link: '/projects/botMaker',
  },
]

// Portfolio Feature Ideas
const featureIdeas = [
  {
    title: 'API Sandbox & Live Demo',
    desc: 'Interactive playgrounds for each backend service, letting visitors experiment with your APIs in real time—showcasing live request/response and code snippets.',
  },
  {
    title: 'Architecture Deep-Dives',
    desc: 'Clickable diagrams and write-ups for major projects—walk through the decisions, trade-offs, and lessons learned, helping recruiters see your system-level thinking.',
  },
  {
    title: 'Project Evolution Timeline',
    desc: 'A visual timeline or changelog, tracking your tech growth, migrations, and major learning moments. Highlights your iterative process and adaptation to new tech.',
  },
]

export default function LandingPage() {
  return (
    <main className='w-full min-h-screen  flex flex-col items-center px-4 py-8'>
      <section id='summary' className='w-full mb-8 text-center'>
        <h1 className='text-4xl font-bold mb-2 text-white'>Welcome to Xavi&apos;s Projects</h1>
        <p className='text-lg text-gray-300'>
          Playground and showcase for modern backend architectures, system design patterns, and full-stack experimentation.<br />
          <span className='text-emerald-400'>I’m Xavier, a backend-focused software developer exploring cloud, APIs, and frontend integration.</span>
        </p>
      </section>

      <section id='systemDesign' className='w-full max-w-4xl bg-gray-900 rounded-2xl shadow-md p-6 mb-8'>
        <h2 className='text-2xl font-semibold mb-4 text-white'>How I Design Systems</h2>
        <p className='text-gray-300 mb-2'>
          Every project is built to be a learning experience, starting simple, but structured for future scalability. Expect layered architectures, robust API boundaries, and intentional trade-offs between impact, speed and maintainability.
        </p>
        <ul className='list-disc list-inside text-gray-400 space-y-1 ml-4'>
          <li>Cloud-native first: AWS, containerization, and CI/CD</li>
          <li>Testable APIs: REST, event-driven patterns, and contract validation</li>
          <li>Clean separation between frontend skins and backend logic</li>
        </ul>
      </section>

      <section id='navigationGuide' className='w-full max-w-4xl bg-gray-900 rounded-2xl shadow-md p-6 mb-8'>
        <h2 className='text-2xl font-semibold mb-4 text-white'>How to Navigate This Site</h2>
        <ul className='list-inside text-gray-300 space-y-2'>
          <li><span className='font-semibold text-emerald-400'>Projects:</span> Explore hands-on builds. Each project page details its purpose, architecture, and code links.</li>
          <li><span className='font-semibold text-emerald-400'>System Design:</span> Deep-dives into design patterns, architectural choices, and migration strategies.</li>
          <li><span className='font-semibold text-emerald-400'>Blog / Changelog:</span> Reflections, lessons learned, and “aha” moments along the way.</li>
        </ul>
      </section>

      <section id='projectsOverview' className='w-full max-w-4xl mb-8'>
        <div className='text-2xl font-semibold mb-4 text-white grid grid-cols-5 gap-4'>
          <h2 className="col-span-4">Current Projects</h2>
          <a
            href="/projects"
            className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10
               px-3 py-1 text-sm font-semibold text-emerald-300
               transition hover:bg-emerald-500/20 hover:text-emerald-200
               focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
          >
            See all projects <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {currentProjects.map((proj) => (
            <a key={proj.name} href={proj.link}>
              <div className='bg-gray-800 rounded-xl p-4 flex flex-col shadow hover:scale-[1.025] transition-transform'>
                <h3 className='text-lg font-semibold text-emerald-300'>{proj.name}</h3>
                <p className='text-gray-300 text-sm mb-1'>{proj.description}</p>
                <span className='text-xs bg-gray-700 text-emerald-400 rounded-full px-2 py-1 self-start'>{proj.status}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id='sysArchDiagram' className='w-full max-w-3xl mb-8 flex justify-center'>
      <div className="relative w-full aspect-[15/9] overflow-hidden bg-gray-900 rounded-2xl flex items-center justify-center border-2 border-dashed border-emerald-500">
          <Image
            src="/portfolioArchitecture.png"
            alt="Arch Overview"
            width={740}
            height={430}
            className="max-w-full object-contain"
          />
        </div>
      </section>

      <section id='extraFeatureIdeas' className='w-full max-w-4xl bg-gray-900 rounded-2xl shadow-md p-6 mb-8'>
        <h2 className='text-2xl font-semibold mb-4 text-white'>Ideas to Expand This Portfolio</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {featureIdeas.map((idea) => (
            <div key={idea.title} className='bg-gray-800 rounded-xl p-4 flex flex-col shadow'>
              <h4 className='text-lg font-semibold text-emerald-300'>{idea.title}</h4>
              <p className='text-gray-300 text-sm'>{idea.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}