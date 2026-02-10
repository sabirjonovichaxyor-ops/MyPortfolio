import { Project } from '@/entities/project'
import { saveProject } from '../api/project.api'

export function useSaveProject() {
  const save = async (project: Project) => {
    return saveProject(project)
  }

  return { save }
}
