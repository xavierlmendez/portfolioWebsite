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

    return (
      <ul>
        <div>Guinea Pig Projects</div>
        {projectInformation.map((project) => (
          <ProjectOverview key={project.title} update={project} />
        ))}
      </ul>
    )
  }