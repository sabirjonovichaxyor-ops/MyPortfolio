import { useAdminProjects } from "../model/useAdminProjects"
import { ProjectStatusBadge, type ProjectStatusType } from "./ProjectStatusBadge"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectStatus } from "@/entities/project/model/ProjectStatus"
import type { Project } from "@/entities/project/model/Project"
import { 
  Loader2, 
  FolderKanban, 
  Search, 
  Filter, 
  ArrowUpDown,
  Eye,
  Edit,
  Trash2,
  MoreVertical
} from "lucide-react"
import { useState } from "react"

export function ProjectsTable() {
  const { projects, loading } = useAdminProjects()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"date" | "title">("date")
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
                           project.description?.toLowerCase().includes(search.toLowerCase()) ||
                           (project.tags && project.tags.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase())))
      const matchesStatus = statusFilter === "all" || project.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return a.title.localeCompare(b.title)
    })

  const statuses = Array.from(new Set(projects.map(p => p.status)))

  // Loading state
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-900/50 dark:to-black/30 backdrop-blur-sm rounded-3xl border border-gray-200/30 dark:border-gray-800/30 p-8">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Loader2 className="w-5 h-5 text-cyan-500 animate-spin" />
          <span className="text-gray-600 dark:text-gray-300">Loading projects...</span>
        </div>
        
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-16 rounded-xl bg-gradient-to-r from-gray-100/50 to-gray-200/30 dark:from-gray-800/30 dark:to-gray-700/30 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  // Empty state
  if (projects.length === 0 && !loading) {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-cyan-50/50 to-white/30 dark:from-cyan-900/20 dark:to-gray-900/30 backdrop-blur-sm border border-cyan-200/30 dark:border-cyan-800/30 p-8">
        <div className="flex flex-col items-center justify-center text-center py-8">
          <FolderKanban className="w-16 h-16 text-cyan-500 dark:text-cyan-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Projects Found
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
            Start by creating your first project
          </p>
        </div>
      </div>
    )
  }

  // Empty state
  if (projects.length === 0) {
    return (
      <div className="rounded-3xl bg-gradient-to-br from-cyan-50/50 to-white/30 dark:from-cyan-900/20 dark:to-gray-900/30 backdrop-blur-sm border border-cyan-200/30 dark:border-cyan-800/30 p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <FolderKanban className="w-20 h-20 text-cyan-500 dark:text-cyan-400 mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            No Projects Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
            Get started by adding your first project to showcase your work.
          </p>
          <button className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
            Add New Project
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-900/50 dark:to-black/30 backdrop-blur-sm rounded-3xl border border-gray-200/30 dark:border-gray-800/30 overflow-hidden">
      {/* Table header with controls */}
      <div className="p-6 border-b border-gray-200/30 dark:border-gray-800/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
              Projects ({projects.length})
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              Manage and organize your portfolio projects
            </p>
          </div>
          
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 self-start lg:self-center">
            + New Project
          </button>
        </div>

        {/* Filters and search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 focus:border-cyan-500/50 dark:focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-12 pr-10 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 focus:border-purple-500/50 dark:focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 appearance-none"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={() => setSortBy(sortBy === "date" ? "title" : "date")}
              className="px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all flex items-center gap-2"
            >
              <ArrowUpDown className="w-5 h-5" />
              <span className="hidden sm:inline">
                Sort by {sortBy === "date" ? "Date" : "Title"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200/30 dark:border-gray-800/30">
              <th className="text-left p-6 font-semibold text-gray-700 dark:text-gray-300">
                Project
              </th>
              <th className="text-left p-6 font-semibold text-gray-700 dark:text-gray-300">
                Status
              </th>
              <th className="text-left p-6 font-semibold text-gray-700 dark:text-gray-300">
                Stack
              </th>
              <th className="text-left p-6 font-semibold text-gray-700 dark:text-gray-300">
                Created
              </th>
              <th className="text-left p-6 font-semibold text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          
          <AnimatePresence>
            <tbody>
              {filteredProjects.map((project, index) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-200/20 dark:border-gray-800/20 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors group"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center">
                        <FolderKanban className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h4>
                        {project.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                            {project.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-6">
                    <ProjectStatusBadge status={project.status as ProjectStatusType} />
                  </td>
                  
                  <td className="p-6">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies?.slice(0, 3).map((tech: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies && project.technologies.length > 3 && (
                        <span className="px-2.5 py-1 text-xs text-gray-500">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  
                  <td className="p-6">
                    <div className="text-gray-700 dark:text-gray-300">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(project.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </td>
                  
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProject(project.id)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => {/* Edit logic */}}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => {/* Delete logic */}}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </AnimatePresence>
        </table>
      </div>

      {/* Table footer */}
      {filteredProjects.length === 0 && (
        <div className="py-12 text-center">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No projects found
          </h4>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      )}
      
      {filteredProjects.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200/30 dark:border-gray-800/30 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-colors">
              ← Previous
            </button>
            <span className="px-3 py-2 text-gray-700 dark:text-gray-300">
              Page 1 of 1
            </span>
            <button className="px-4 py-2 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-colors">
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}