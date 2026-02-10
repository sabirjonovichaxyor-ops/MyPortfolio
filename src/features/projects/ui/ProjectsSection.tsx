import { ProjectCard } from "./ProjectCard"
import type { Project } from "@/entities/project/model/Project"

interface Props {
  projects: Project[]
  loading: boolean
  error: string | null
}

export function ProjectsSection({ projects, loading, error }: Props) {
  // Debug: console ga chiqarish
  console.log('ProjectsSection - projects:', projects.length, 'loading:', loading, 'error:', error)
  console.log('Projects data:', projects)
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error loading projects</p>

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">
          Projects
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => {
              const projectProps: Parameters<typeof ProjectCard>[0]['project'] = {
                title: project.title,
                image: project.image,
                ...(project.description && { description: project.description }),
                ...(project.githubUrl && { github: project.githubUrl }),
                ...(project.liveUrl && { live: project.liveUrl }),
                ...(project.liveUrl && { link: project.liveUrl }),
                ...(project.tags && project.tags.length > 0 && { tags: project.tags }),
                ...(project.featured && { featured: project.featured }),
              }
              return (
                <ProjectCard
                  key={project.id}
                  project={projectProps}
                />
              )
            })}
        </div>
      </div>
    </section>
  )
}
