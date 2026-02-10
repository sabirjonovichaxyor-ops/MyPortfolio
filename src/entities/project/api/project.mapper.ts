import { Project } from "../model/Project"
import { ProjectStatus } from "../model/ProjectStatus"
import { mapProjectStatus } from "../lib/mapProjectStatus"

type ProjectDTO = {
  id: string
  title: string
  description: string
  image: string
  images?: string[]

  status: string

  content: string
  tags: string[]
  technologies: string[]
  featured: boolean
  order: number

  created_at: string
  updated_at: string

  live_url?: string | null
  github_url?: string | null
}

export function mapProjectDto(dto: ProjectDTO): Project {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    image: dto.image,

    images: dto.images ?? [],

    status: mapProjectStatus(dto.status),

    content: dto.content,
    tags: dto.tags,
    technologies: dto.technologies,
    featured: dto.featured,
    order: dto.order,

    createdAt: dto.created_at,
    updatedAt: dto.updated_at,

    liveUrl: dto.live_url ?? undefined,
    githubUrl: dto.github_url ?? undefined,
  }
}
