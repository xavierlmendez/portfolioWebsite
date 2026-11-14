import { ProjectOverview } from '@/app/ui/projects/projectOverview';
import { Header } from '../ui/page/header';
import { topLevelProjects } from '@/app/lib/projects';


export default async function Projects() {

  const pageTitle = "Project's Home";
  const pageDescription = 'Home page covering all projects complete, abandoned, in maintenance, underdevelopment, and yet to start!'

  return (
    <>
      <Header title={pageTitle} description={pageDescription} />
      {topLevelProjects.map((project) => (
        <ProjectOverview
          key={project.id}
          update={{ title: project.name, description: project.description, link: project.href, tags: project.tags }}
        />
      ))}
    </>
  )
}