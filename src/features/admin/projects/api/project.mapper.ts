import { Project } from '@/entities/project'
import { mapProjectStatus } from '@/entities/project/lib/mapProjectStatus'
import { ProjectStatus } from '@/entities/project/model/ProjectStatus'

/**
 * BACKEND → FRONTEND
 */
export function mapProjectFromApi(raw: any): Project {
  return {
    id: String(raw.id),
    title: raw.title ?? '',
    description: raw.description ?? '',
    image: raw.image ?? '',
    images: raw.images ?? [],

    status: mapProjectStatus(raw.status),

    content: raw.content ?? '',
    tags: raw.tags ?? [],
    technologies: raw.technologies ?? [],
    featured: Boolean(raw.featured),
    order: Number(raw.order ?? 0),

    createdAt: raw.created_at,
    updatedAt: raw.updated_at,

    liveUrl: raw.live_url ?? null,
    githubUrl: raw.github_url ?? null,

    client: raw.client,
    duration: raw.duration,
    role: raw.role,

    challenges: raw.challenges ?? [],
    achievements: raw.achievements ?? [],
    teamSize: raw.team_size
  }
}

/**
 * FRONTEND → BACKEND
 */
export function mapProjectToApi(project: Project) {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image,
    images: project.images,

    status: project.status.toLowerCase(), // DRAFT → draft

    content: project.content,
    tags: project.tags,
    technologies: project.technologies,
    featured: project.featured,
    order: project.order,

    live_url: project.liveUrl,
    github_url: project.githubUrl,

    client: project.client,
    duration: project.duration,
    role: project.role,

    challenges: project.challenges,
    achievements: project.achievements,
    team_size: project.teamSize
  }
}
