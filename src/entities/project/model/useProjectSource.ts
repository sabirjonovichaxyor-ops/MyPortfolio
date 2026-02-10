import { useEffect, useState } from "react"
import type { Project } from "./Project"
import { getAllProjects } from "../api/project.api"

export function useProjectsSource() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAllProjects()
      .then(setProjects)
      .catch(() => setError("Failed to load projects"))
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading, error }
}
