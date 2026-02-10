import { useProjects } from "../model/useProjects"
import { ProjectsSection } from "./ProjectsSection"

export default function Projects() {
  const state = useProjects()

  return <ProjectsSection {...state} />
}
