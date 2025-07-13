import { ProjectHeader } from '@/app/ui/projects/GuineaPigProjects/projectHeader'
import { KafkaMessagesViewer } from '@/app/ui/projects/GuineaPigProjects/kafkaFrontEnd/KafkaMessagesViewer'


export default function KafkaTrafficVizPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <ProjectHeader
        title="Kafka Traffic Visualizer"
        description="A UI to inspect Kafka topic traffic and live messages."
        status="Experimental"
      />

      <KafkaMessagesViewer />
    </main>
  )
}