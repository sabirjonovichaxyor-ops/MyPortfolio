import { useEffect, useState } from 'react'
import { Project } from '@/entities/project'
import { fetchProjects } from '../api/project.api'

export function useAdminProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading }
}
