export default async function about() {

  const summary = 'Welcome to Xavis Projects, this is a central playground for new patterns, tools, and industry exposure. ' +
    'I am a backend focused software developer gaining experience in cloud solutions and exposure to frontend development through this site. ' +
    'Feel free to connect, ask questions, or shoot over question to me on linkedin and I will try my best to get back to you. :)';

  // Ideally have a visual here but will have to brainstorm more
  const sitePlan = 'For now, this website is minmalistic, but will expand out soon. ' +
    'The first use cases will be a learning environment for new tools, design patterns, thrid party APIs, and more. ' +
    'The second use cases will be a frontend for personal projects such as a BE text messaging API wrapper UI, and a financial analytics and bot making application. ' +
    'Later this site will be more polished and updated to be used as a proof of work and tool repository for me and others to pull from';

  // Make into component later with ta dones and todos listed
  const currentProjects = [
    'Kafka Visualizer',
    'Text Message Service Interface',
    'Culinary Connection',
    'Bot Maker',
  ];

  return (
    <ul>
      <section className='space-y-4' id='aboutPageSummary'>
        <h2 className='text-2xl font-semibold border-b border-gray-700 pb-2 pt-8'>Summary</h2>
        <p className='leading-relaxed whitespace-pre-line'>{summary}</p>
      </section>

      <section className='space-y-4' id='sitePlan'>
        <h2 className='text-2xl font-semibold border-b border-gray-700 pb-2 pt-8'>Plan for Portfolio Site</h2>
        <p className='leading-relaxed whitespace-pre-line'>{sitePlan}</p>
      </section>

      <section className='flex justify-center' id='sitePlanVisual'>
        <div className='w-full max-w-md h-48 bg-gray-800 rounded-lg flex items-center justify-center'>
          <span className='text-gray-400 italic'>Visual coming soon…</span>
        </div>
      </section>

      <section className='space-y-4' id='currentProjectsOverview'>
        <h2 className='text-2xl font-semibold border-b border-gray-700 pb-2 pt-8'>Current Projects</h2>
        <ul className='list-disc list-inside space-y-1'>
          {currentProjects.map((proj) => (
            <li key={proj} className='bg-gray-800 px-4 py-2 rounded-lg'>
              {proj}
            </li>
          ))}
        </ul>
      </section>
    </ul>
  )
}