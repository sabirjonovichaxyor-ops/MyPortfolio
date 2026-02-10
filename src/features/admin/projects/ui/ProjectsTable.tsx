import { Project } from '@/entities/project'
import { ProjectStatus } from '@/entities/project/model/ProjectStatus'
import { Pencil, Trash, Star } from 'lucide-react'

interface ProjectsTableProps {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: (projectId: string) => void
  onToggleFeatured: (project: Project) => void
}

export default function ProjectsTable({
  projects,
  onEdit,
  onDelete,
  onToggleFeatured,
}: ProjectsTableProps) {
  if (projects.length === 0) {
    return <p className="text-center text-gray-500">Loyiha topilmadi</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left">#</th>
            <th className="px-4 py-2 text-left">Sarlavha</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Featured</th>
            <th className="px-4 py-2 text-left">Order</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, idx) => (
            <tr
              key={project.id}
              className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <td className="px-4 py-2">{idx + 1}</td>
              <td className="px-4 py-2 font-medium">{project.title}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold ${
                    project.status === ProjectStatus.PUBLISHED
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  }`}
                >
                  {project.status}
                </span>
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => onToggleFeatured(project)}
                  className={`p-1 rounded-full ${
                    project.featured
                      ? 'text-yellow-400 hover:text-yellow-500'
                      : 'text-gray-400 hover:text-gray-500'
                  }`}
                  title="Toggle Featured"
                >
                  <Star className="w-5 h-5" />
                </button>
              </td>
              <td className="px-4 py-2">{project.order}</td>
              <td className="px-4 py-2 flex justify-center gap-2">
                <button
                  onClick={() => onEdit(project)}
                  className="p-2 text-blue-500 hover:text-blue-600 rounded-lg"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(project.id)}
                  className="p-2 text-red-500 hover:text-red-600 rounded-lg"
                  title="Delete"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
