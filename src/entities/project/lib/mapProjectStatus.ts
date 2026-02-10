import { ProjectStatus } from "../model/ProjectStatus"

export function mapProjectStatus(raw: string): ProjectStatus {
  switch (raw) {
    case "draft":
      return ProjectStatus.DRAFT

    case "published":
      return ProjectStatus.PUBLISHED

    case "archived":
      return ProjectStatus.ARCHIVED

    case "in_progress":
      return ProjectStatus.IN_PROGRESS

    default:
      return ProjectStatus.DRAFT
  }
}
