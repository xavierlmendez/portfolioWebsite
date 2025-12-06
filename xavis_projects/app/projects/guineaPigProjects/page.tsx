import { Header } from '@/app/ui/page/header';
import { ProjectOverview } from '@/app/ui/projects/projectOverview';


export default async function GuineaPigProjects() {

  const pageTitle = 'Guinea Pig Projects';
  const pageDescription = 'A collection of modular, skeleton projects designed to quickly prototype and showcase backend-first implementations with new technologies. Serves as a sandbox for learning, experimentation, and template generation across different stacks.';

  const projectInformation = [
    {
      title: 'Chart Builder',
      description:
        'A flexible experimental UI for plotting coordinate data, generating trendlines, and testing custom chart types. Designed as a guinea pig environment for future BotMaker and Strategy Backtester project visualizations and interactive data models.',
      link: '/projects/guineaPigProjects/chartBuilder',
      tags: ['Charts', 'Data Viz', 'Regression', 'Guinea Pig'],
    },
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
      link: '/projects/guineaPigProjects/smsInterfaceWrapper',
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