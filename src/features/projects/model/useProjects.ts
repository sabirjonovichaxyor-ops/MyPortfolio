import { useProjectsSource } from "@/entities/project/model/useProjectSource"
import { ProjectStatus } from "@/entities/project"

export function useProjects() {
  const state = useProjectsSource()

  return {
    ...state,
    projects: state.projects.filter(
      p => p.status === ProjectStatus.PUBLISHED
    ),
  }
}
