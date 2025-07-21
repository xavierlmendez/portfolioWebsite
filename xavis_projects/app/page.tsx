'use client'

const currentProjects = [
  {
    name: 'Kafka Visualizer',
    description: 'Monitor and understand real-time message flows in distributed systems using Apache Kafka.',
    status: 'In Progress',
  },
  {
    name: 'Text Message Service Interface',
    description: 'A frontend UI for testing and visualizing backend messaging API integrations.',
    status: 'Prototype',
  },
  {
    name: 'Culinary Connection',
    description: 'A marketplace connecting culinary students with customers, emphasizing scalable system design.',
    status: 'Alpha',
  },
  {
    name: 'Bot Maker',
    description: 'An experimentation ground for algorithmic trading bots and analytics tools.',
    status: 'Exploring',
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
        <h2 className='text-2xl font-semibold mb-4 text-white'>Current Projects</h2>
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

      <section id='sysArchDiagramPlaceholder' className='w-full max-w-4xl mb-8 flex justify-center'>
        <div className='w-full h-40 max-w-lg bg-gray-900 rounded-2xl flex items-center justify-center border-2 border-dashed border-emerald-500'>
          <span className='text-gray-500 italic'>[System architecture visual coming soon]</span>
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