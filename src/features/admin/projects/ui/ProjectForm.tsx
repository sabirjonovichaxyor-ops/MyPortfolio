import { Project } from "@/entities/project"

type Props = {
  project: Project
  onChange: (p: Project) => void
}

export function ProjectForm({ project, onChange }: Props) {
  return (
    <div className="space-y-4">
      <input
        value={project.title}
        onChange={e => onChange({ ...project, title: e.target.value })}
        className="input"
        placeholder="Title"
      />

      <textarea
        value={project.description}
        onChange={e =>
          onChange({ ...project, description: e.target.value })
        }
        className="textarea"
        placeholder="Description"
      />
    </div>
  )
}
