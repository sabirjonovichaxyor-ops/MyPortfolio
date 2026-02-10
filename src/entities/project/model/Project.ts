import { ProjectStatus } from "./ProjectStatus"

export interface Project {
  id: string
  title: string
  description: string
  image: string
  images?: string[]

  status: ProjectStatus

  content: string
  tags: string[]
  technologies: string[]
  featured: boolean
  order: number

  createdAt: string
  updatedAt: string

  liveUrl?: string | null | undefined
  githubUrl?: string | null | undefined

  client?: string
  duration?: string
  role?: string

  challenges?: string[]
  achievements?: string[]
  teamSize?: number
}
