import { Header } from '@/app/ui/page/header';
import { ProjectOverview } from '@/app/ui/projects/projectOverview';


export default async function GuineaPigProjects() {

  const pageTitle = 'Guinea Pig Projects';
  const pageDescription = 'A collection of modular, skeleton projects designed to quickly prototype and showcase backend-first implementations with new technologies. Serves as a sandbox for learning, experimentation, and template generation across different stacks.';

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

  return (
    <>
      <Header title={pageTitle} description={pageDescription} />
      {projectInformation.map((project) => (
        <ProjectOverview key={project.title} update={project} />
      ))}
    </>
  )
}