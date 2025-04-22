import { ProjectHeader } from '@/app/ui/projects/GuineaPigProjects/projectHeader'

export default function KafkaTrafficVizPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <ProjectHeader
        title="Kafka Traffic Visualizer"
        description="A UI to inspect Kafka topic traffic and live messages."
        status="Experimental"
      />

      {/* Project-specific UI and components will go here */}
    </main>
  )
}