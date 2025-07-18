import { ProjectOverview } from '@/app/ui/projects/GuineaPigProjects/projectOverview';


export default async function GuineaPigProjects() {
  const projectInformation = [
    {
      title: 'Kafka Traffic Visualizer',
      description:
        'An experimental frontend UI for monitoring Kafka topics, viewing live message streams, and exploring partition data in real-time.',
      link: '/projects/guineaPigProjects/kafkaFrontEnd',
      tags: ['Kafka', 'Frontend for Backend', 'Real-time', 'Data Viz'],
    },
    {
      title: 'Text Message Interface Wrapper',
      description:
        'A frontend dashboard for sending and receiving SMS via a backend messaging API. Features message logs, delivery status tracking, and quick-reply templates.',
      link: '/projects/guineaPigProjects/sms-interface-wrapper',
      tags: ['Messaging', 'SMS', 'API Wrapper', 'Frontend for Backend'],
    }
  ];

  const summary = 'Projects used as templates and testing of new technology implementations'

  return (
    <main className='w-full min-h-screen flex flex-col items-center px-4 py-8'>
      <section id='header' className='w-full max-w-3xl mb-8 text-center'>
        <h1 className='text-4xl font-bold text-white mb-2'>Guinea Pig Projects</h1>
        <p className='text-lg text-gray-300'>{summary}</p>
      </section>
      {projectInformation.map((project) => (
        <ProjectOverview key={project.title} update={project} />
      ))}
    </main>
  )
}