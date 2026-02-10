// src/shared/ui/ui-decorative/ProjectsTable.tsx
import { useState } from 'react'
import { Project } from '@/entities/project/model/Project'
import { ProjectStatus } from '@/entities/project/model/ProjectStatus'
import { 
  Edit2, 
  Trash2, 
  Eye, 
  Calendar, 
  ExternalLink, 
  Github, 
  Star,
  MoreVertical,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  Clock,
  AlertCircle,
  PauseCircle,
  Grid,
  List,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { Badge } from '@/shared/ui/badge'

interface ProjectsTableProps {
  projects: Project[]
  selectedItems?: string[]
  onSelectItems?: (ids: string[]) => void
  onCreate?: () => void
  onEdit?: (project: Project) => void
  onDelete?: (id: string) => void
  onView?: (project: Project) => void
  onReorder?: (projects: Project[]) => void
  searchQuery?: string
  onSearchChange?: (query: string) => void
  loading?: boolean
  onRefresh?: () => void
}

export function ProjectsTable({ 
  projects,
  selectedItems = [],
  onSelectItems,
  onCreate,
  onEdit,
  onDelete,
  onView,
  onReorder,
  searchQuery = '',
  onSearchChange,
  loading = false,
  onRefresh
}: ProjectsTableProps) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Project | 'order'; direction: 'asc' | 'desc' } | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'ALL'>('ALL')
  const [technologyFilter, setTechnologyFilter] = useState<string>('ALL')
  const [featuredFilter, setFeaturedFilter] = useState<boolean | 'ALL'>('ALL')

  // Get all unique technologies
  const allTechnologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  ).sort()

  // Filter projects
  const filteredProjects = projects.filter(project => {
    if (statusFilter !== 'ALL' && project.status !== statusFilter) return false
    if (technologyFilter !== 'ALL' && !project.technologies.includes(technologyFilter)) return false
    if (featuredFilter !== 'ALL' && project.featured !== featuredFilter) return false
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !project.description.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortConfig) {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]
      
      // Handle null/undefined values - they should go to the end
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    }
    return a.order - b.order // Default sort by order
  })

  // Status configuration
  const statusConfig = {
    [ProjectStatus.DRAFT]: {
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      iconColor: 'text-yellow-500'
    },
    [ProjectStatus.IN_PROGRESS]: {
      icon: Clock,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      iconColor: 'text-blue-500'
    },
    [ProjectStatus.PUBLISHED]: {
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      iconColor: 'text-green-500'
    },
    [ProjectStatus.ARCHIVED]: {
      icon: PauseCircle,
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
      iconColor: 'text-gray-500'
    }
  }

  // Handle sort
  const handleSort = (key: keyof Project) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { key, direction: 'asc' }
    })
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedItems.length === sortedProjects.length) {
      onSelectItems?.([])
    } else {
      onSelectItems?.(sortedProjects.map(p => p.id))
    }
  }

  // Handle select single
  const handleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      onSelectItems?.(selectedItems.filter(itemId => itemId !== id))
    } else {
      onSelectItems?.([...selectedItems, id])
    }
  }

  // Handle reorder
  const handleMoveUp = (id: string) => {
    const index = projects.findIndex(p => p.id === id)
    if (index > 0) {
      const newProjects = [...projects]
      const temp = newProjects[index]
      const prevProject = newProjects[index - 1]
      if (temp && prevProject) {
        newProjects[index] = prevProject
        newProjects[index - 1] = temp
        // Update order
        newProjects.forEach((p, i) => p.order = i)
        onReorder?.(newProjects)
      }
    }
  }

  const handleMoveDown = (id: string) => {
    const index = projects.findIndex(p => p.id === id)
    if (index < projects.length - 1) {
      const newProjects = [...projects]
      const temp = newProjects[index]
      const nextProject = newProjects[index + 1]
      if (temp && nextProject) {
        newProjects[index] = nextProject
        newProjects[index + 1] = temp
        // Update order
        newProjects.forEach((p, i) => p.order = i)
        onReorder?.(newProjects)
      }
    }
  }

  // Get status icon
  const StatusIcon = ({ status }: { status: ProjectStatus }) => {
    const config = statusConfig[status]
    const Icon = config.icon
    return <Icon className={`w-4 h-4 ${config.iconColor}`} />
  }

  // Format date
  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return dateObj.toLocaleDateString('uz-UZ', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  // Grid view card
  const ProjectCard = ({ project }: { project: Project }) => {
    const config = statusConfig[project.status]
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
        {/* Card header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(project.id)}
                  onChange={() => handleSelect(project.id)}
                  className="rounded border-gray-300"
                />
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {project.title}
                </h4>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className={config.color}>
                  <StatusIcon status={project.status} />
                  <span>{project.status}</span>
                </Badge>
                
                {project.featured && (
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    <Star className="w-3 h-3" />
                    <span>Featured</span>
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit?.(project)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                title="Tahrirlash"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.slice(0, 3).map(tech => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={() => onView?.(project)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 ml-auto"
              title="Ko'rish"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card footer */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            {formatDate(project.updatedAt)}
          </div>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleMoveUp(project.id)}
              disabled={project.order === 0}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-50"
              title="Yuqoriga"
            >
              <ChevronUp className="w-3 h-3" />
            </button>
            <button
              onClick={() => handleMoveDown(project.id)}
              disabled={project.order === projects.length - 1}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded disabled:opacity-50"
              title="Pastga"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // List view row
  const ProjectRow = ({ project }: { project: Project }) => {
    const config = statusConfig[project.status]
    
    return (
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
        {/* Select checkbox */}
        <td className="px-6 py-4 whitespace-nowrap">
          <input
            type="checkbox"
            checked={selectedItems.includes(project.id)}
            onChange={() => handleSelect(project.id)}
            className="rounded border-gray-300"
          />
        </td>

        {/* Title */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.color.replace('text-', 'bg-').split(' ')[0]}`}>
              <StatusIcon status={project.status} />
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {project.title}
                {project.featured && (
                  <Star className="w-4 h-4 text-amber-500 inline-block ml-2" />
                )}
              </div>
              <div className="text-sm text-gray-500 truncate max-w-xs">
                {project.description}
              </div>
            </div>
          </div>
        </td>

        {/* Status */}
        <td className="px-6 py-4 whitespace-nowrap">
          <Badge className={config.color}>
            <StatusIcon status={project.status} />
            <span>{project.status}</span>
          </Badge>
        </td>

        {/* Technologies */}
        <td className="px-6 py-4">
          <div className="flex flex-wrap gap-1 max-w-xs">
            {project.technologies.slice(0, 3).map(tech => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs text-gray-500">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </td>

        {/* Updated */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(project.updatedAt)}
          </div>
        </td>

        {/* Order */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-1">
            <span className="w-6 h-6 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded text-sm">
              {project.order + 1}
            </span>
            <div className="flex flex-col">
              <button
                onClick={() => handleMoveUp(project.id)}
                disabled={project.order === 0}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => handleMoveDown(project.id)}
                disabled={project.order === projects.length - 1}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded disabled:opacity-50"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </td>

        {/* Actions */}
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            
            <button
              onClick={() => onView?.(project)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title="Ko'rish"
            >
              <Eye className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => onEdit?.(project)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              title="Tahrirlash"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => onDelete?.(project.id)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-red-500"
              title="O'chirish"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Loyihalarni qidirish..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 w-full md:w-64"
            />
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg border ${
                showFilters 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              title="Filtrlar"
            >
              <Filter className="w-4 h-4" />
            </button>
            
            <button
              onClick={onRefresh}
              disabled={loading}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              title="Yangilash"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                title="Ro'yxat ko'rinishi"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                title="Grid ko'rinishi"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={onCreate}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-md transition-shadow"
            >
              <span>+</span>
              <span className="hidden md:inline">Yangi Loyiha</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | 'ALL')}
                  className="px-3 py-2 border rounded-lg dark:bg-gray-700"
                >
                  <option value="ALL">Barchasi</option>
                  {Object.values(ProjectStatus).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Texnologiya</label>
                <select
                  value={technologyFilter}
                  onChange={(e) => setTechnologyFilter(e.target.value)}
                  className="px-3 py-2 border rounded-lg dark:bg-gray-700"
                >
                  <option value="ALL">Barchasi</option>
                  {allTechnologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Featured</label>
                <select
                  value={featuredFilter === 'ALL' ? 'ALL' : featuredFilter.toString()}
                  onChange={(e) => setFeaturedFilter(e.target.value === 'ALL' ? 'ALL' : e.target.value === 'true')}
                  className="px-3 py-2 border rounded-lg dark:bg-gray-700"
                >
                  <option value="ALL">Barchasi</option>
                  <option value="true">Featured</option>
                  <option value="false">Oddiy</option>
                </select>
              </div>
              
              <button
                onClick={() => {
                  setStatusFilter('ALL')
                  setTechnologyFilter('ALL')
                  setFeaturedFilter('ALL')
                }}
                className="self-end px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Filtrlarni tozalash
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bulk actions */}
      {selectedItems.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">
              {selectedItems.length} ta loyiha tanlandi
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  // Mark selected as featured
                  console.log('Mark as featured:', selectedItems)
                }}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
              >
                Featured qilish
              </button>
              <button
                onClick={() => {
                  // Mark selected as completed
                  console.log('Mark as completed:', selectedItems)
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Tugatilgan deb belgilash
              </button>
              <button
                onClick={() => {
                  // Delete selected
                  selectedItems.forEach(id => onDelete?.(id))
                  onSelectItems?.([])
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects count */}
      <div className="text-sm text-gray-500">
        {filteredProjects.length} ta loyiha topildi
        {projects.length !== filteredProjects.length && ` (${projects.length} tadan)`}
      </div>

      {/* Content */}
      {viewMode === 'list' ? (
        // Table view
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === sortedProjects.length && sortedProjects.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => handleSort('title')}
                  >
                    Loyiha
                    {sortConfig?.key === 'title' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => handleSort('status')}
                  >
                    Status
                    {sortConfig?.key === 'status' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Texnologiyalar
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => handleSort('updatedAt')}
                  >
                    Yangilangan
                    {sortConfig?.key === 'updatedAt' && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tartib
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harakatlar
                  </th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {sortedProjects.map((project) => (
                  <ProjectRow key={project.id} project={project} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {sortedProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Loyihalar topilmadi
              </h4>
              <p className="text-gray-500 mb-4">
                {projects.length === 0 
                  ? "Hozircha loyihalar yo'q. Yangi loyiha yarating." 
                  : "Filtrlar bo'yicha loyihalar topilmadi."}
              </p>
              {projects.length === 0 && onCreate && (
                <button
                  onClick={onCreate}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-md"
                >
                  Birinchi loyihani yaratish
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        // Grid view
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          
          {/* Empty state for grid */}
          {sortedProjects.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Loyihalar topilmadi
              </h4>
              <p className="text-gray-500 mb-4">
                {projects.length === 0 
                  ? "Hozircha loyihalar yo'q. Yangi loyiha yarating." 
                  : "Filtrlar bo'yicha loyihalar topilmadi."}
              </p>
              {projects.length === 0 && onCreate && (
                <button
                  onClick={onCreate}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-md"
                >
                  Birinchi loyihani yaratish
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProjectsTable