import { ProjectStatus } from "../model/ProjectStatus"

export const projectEditorSchema = [
  { name: "title", type: "text", required: true },
  { name: "description", type: "textarea" },
  { name: "content", type: "richtext" },

  { name: "status", type: "select", options: Object.values(ProjectStatus) },

  { name: "image", type: "image" },
  { name: "images", type: "gallery" },

  { name: "tags", type: "tags" },
  { name: "technologies", type: "tags" },

  { name: "featured", type: "boolean" },
  { name: "order", type: "number" },

  { name: "liveUrl", type: "url" },
  { name: "githubUrl", type: "url" },

  { name: "client", type: "text" },
  { name: "duration", type: "text" },
  { name: "role", type: "text" },

  { name: "teamSize", type: "number" },
]
