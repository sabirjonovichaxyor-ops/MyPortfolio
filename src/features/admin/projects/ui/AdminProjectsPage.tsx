// src/features/admin/projects/ui/AdminProjectsPage.tsx
import { useState, useEffect } from 'react'
import ProjectsTable from './ProjectsTable'
import ProjectEditorModal from '@/features/admin/ui/ProjectEditorModal'
import { Project } from '@/entities/project'
import { fetchProjects, createProject, updateProject, deleteProject } from '@/entities/project/api/project.api'

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // Load projects
  const loadProjects = async () => {
    setLoading(true)
    try {
      const data = await fetchProjects()
      setProjects(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  // Open modal for create or edit
  const handleOpenModal = (project?: Project | null) => {
    setSelectedProject(project || null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
    setIsModalOpen(false)
  }

  // Save project (create or update)
  const handleSaveProject = async (formData: any) => {
    if (selectedProject) {
      await updateProject(selectedProject.id, formData)
    } else {
      await createProject(formData)
    }
    handleCloseModal()
    loadProjects()
  }

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Loyihani o‘chirmoqchimisiz?')) {
      await deleteProject(projectId)
      loadProjects()
    }
  }

  const handleToggleFeatured = async (project: Project) => {
    await updateProject(project.id, { ...project, featured: !project.featured })
    loadProjects()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin - Loyihalar</h1>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Yangi loyiha
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Yuklanmoqda...</p>
      ) : (
        <ProjectsTable
          projects={projects}
          onEdit={handleOpenModal}
          onDelete={handleDeleteProject}
          onToggleFeatured={handleToggleFeatured}
        />
      )}

      {isModalOpen && (
        <ProjectEditorModal
          project={selectedProject}
          onSave={handleSaveProject}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
