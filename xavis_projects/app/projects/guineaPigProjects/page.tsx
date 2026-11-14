import { Header } from '@/app/ui/page/header';
import { ProjectOverview } from '@/app/ui/projects/projectOverview';
import { guineaPigProjects } from '@/app/lib/projects';


export default async function GuineaPigProjects() {

  const pageTitle = 'Guinea Pig Projects';
  const pageDescription = 'A collection of modular, skeleton projects designed to quickly prototype and showcase backend-first implementations with new technologies. Serves as a sandbox for learning, experimentation, and template generation across different stacks.';

  return (
    <>
      <Header title={pageTitle} description={pageDescription} />
      {guineaPigProjects.map((project) => (
        <ProjectOverview
          key={project.id}
          update={{ title: project.name, description: project.description, link: project.href, tags: project.tags }}
        />
      ))}
    </>
  )
}