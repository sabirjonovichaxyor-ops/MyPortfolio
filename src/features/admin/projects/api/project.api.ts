import { Project } from '@/entities/project'
import { mapProjectFromApi, mapProjectToApi } from './project.mapper'

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch('/api/projects')
  const data = await res.json()

  return data.map(mapProjectFromApi)
}

export async function saveProject(project: Project): Promise<Project> {
  const payload = mapProjectToApi(project)

  const res = await fetch(`/api/projects/${project.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  const data = await res.json()
  return mapProjectFromApi(data)
}
