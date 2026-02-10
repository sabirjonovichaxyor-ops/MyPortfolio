// src/features/admin/ui/AdminDashboard.tsx
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useToast } from "@/shared/hooks/useToast"
import { useAdminDashboardData } from "../model/useAdminDashboardData"
import { Overview } from "./Overview"
import { BlogTable } from "@/shared/ui/ui-decorative/BlogTable"
import { MessagesTable } from "@/shared/ui/ui-decorative/MessagesTable"
import { ProjectsTable } from "@/shared/ui/ui-decorative/ProjectsTable"
import { AnalyticsDashboard } from "./AnalyticsDashboard"
import { SettingsPanel } from "./SettingsPanel"
import { AdminTabs } from "./AdminTabs"
import { BlogPost } from "@/entities/blog/BlogPost"
import { ContactMessage } from "@/entities/contact/ContactMessage"
import { Project } from "@/entities/project/model/Project"
import BlogEditorModal from "./BlogEditorModal"
import ProjectEditorModal from "./ProjectEditorModal"
import ConfirmationModal from "@/shared/ui/ui-decorative/ConfirmationModal"
import { 
  RefreshCw, 
  Download, 
  Filter,
  Search,
  Plus,
  BarChart3,
  Settings as SettingsIcon
} from "lucide-react"

export type AdminTab = "overview" | "blog" | "messages" | "projects" | "analytics" | "settings"

interface AdminDashboardProps {
  activeTab?: AdminTab
  onTabChange?: (tab: AdminTab) => void
}

// Type for item to delete
type DeleteItem = {
  type: 'post' | 'message' | 'project'
  id: string
  name?: string | null
}

export function AdminDashboard({ 
  activeTab: externalTab = "overview", 
  onTabChange: externalTabChange 
}: AdminDashboardProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()
  
  // Internal state for tab management
  const [internalTab, setInternalTab] = useState<AdminTab>("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  
  // Modal states
  const [showBlogEditor, setShowBlogEditor] = useState(false)
  const [showProjectEditor, setShowProjectEditor] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<DeleteItem | null>(null)

  // Determine active tab from URL or props
  const activeTab = externalTab !== undefined ? externalTab : internalTab
  const setActiveTab = externalTabChange || ((tab: AdminTab) => {
    setInternalTab(tab)
    // Update URL when tab changes
    navigate(`/admin${tab === 'overview' ? '' : `/${tab}`}`)
  })

  // Sync tab with URL
  useEffect(() => {
    const path = location.pathname
    const tabFromPath = path.split('/admin/')[1] || 'overview'
    
    if (['overview', 'blog', 'messages', 'projects', 'analytics', 'settings'].includes(tabFromPath)) {
      setActiveTab(tabFromPath as AdminTab)
    }
  }, [location.pathname, setActiveTab])

  const {
    stats,
    posts,
    messages,
    projects,
    loading,
    error,
    refresh,
    createPost,
    updatePost,
    deletePost,
    markMessageAsRead,
    deleteMessage,
    createProject,
    updateProject,
    deleteProject,
    exportData
  } = useAdminDashboardData()

  // Handlers for blog posts
  const handleCreatePost = async (postData: any): Promise<void> => {
    const loadingId = toast.loading({
      title: 'Post yaratilmoqda...',
      message: 'Iltimos kuting'
    })
    
    try {
      await createPost(postData)
      toast.success({
        title: 'Muvaffaqiyatli!',
        message: 'Post yaratildi'
      })
      setShowBlogEditor(false)
    } catch (err: any) {
      toast.error({
        title: 'Xatolik!',
        message: err.message || 'Post yaratishda xatolik'
      })
      throw err
    } finally {
      toast.dismiss(loadingId)
    }
  }

  const handleUpdatePost = async (id: string, updates: any): Promise<void> => {
    const loadingId = toast.loading({
      title: 'Yangilanmoqda...',
      message: 'Post yangilanmoqda'
    })
    
    try {
      await updatePost(id, updates)
      toast.success({
        title: 'Yangilandi!',
        message: 'Post muvaffaqiyatli yangilandi'
      })
      setShowBlogEditor(false)
      setEditingPost(null)
    } catch (err: any) {
      toast.error({
        title: 'Xatolik!',
        message: err.message || 'Post yangilashda xatolik'
      })
      throw err
    } finally {
      toast.dismiss(loadingId)
    }
  }

  const handleDeletePost = async (id: string, name?: string) => {
    setItemToDelete({ type: 'post', id, name: name || null })
    setShowDeleteConfirm(true)
  }

  // Handlers for messages
  const handleMarkMessageAsRead = async (id: string) => {
    try {
      await markMessageAsRead(id)
      toast.success({
        title: 'Xabar o\'qildi',
        message: 'Xabar o\'qilganlar ro\'yxatiga o\'tkazildi'
      })
    } catch (err: any) {
      toast.error({
        title: 'Xatolik!',
        message: err.message || 'Xabarni yangilashda xatolik'
      })
    }
  }

  const handleDeleteMessage = async (id: string) => {
    setItemToDelete({ type: 'message', id })
    setShowDeleteConfirm(true)
  }

  // Handlers for projects
  const handleCreateProject = async (projectData: any): Promise<void> => {
    const loadingId = toast.loading({
      title: 'Loyiha yaratilmoqda...',
      message: 'Iltimos kuting'
    })
    
    try {
      await createProject(projectData)
      toast.success({
        title: 'Muvaffaqiyatli!',
        message: 'Loyiha yaratildi'
      })
      setShowProjectEditor(false)
    } catch (err: any) {
      toast.error({
        title: 'Xatolik!',
        message: err.message || 'Loyiha yaratishda xatolik'
      })
      throw err
    } finally {
      toast.dismiss(loadingId)
    }
  }

  const handleUpdateProject = async (id: string, updates: any): Promise<void> => {
    const loadingId = toast.loading({
      title: 'Yangilanmoqda...',
      message: 'Loyiha yangilanmoqda'
    })
    
    try {
      await updateProject(id, updates)
      toast.success({
        title: 'Yangilandi!',
        message: 'Loyiha muvaffaqiyatli yangilandi'
      })
      setShowProjectEditor(false)
      setEditingProject(null)
    } catch (err: any) {
      toast.error({
        title: 'Xatolik!',
        message: err.message || 'Loyiha yangilashda xatolik'
      })
      throw err
    } finally {
      toast.dismiss(loadingId)
    }
  }

  const handleDeleteProject = async (id: string, name?: string) => {
    setItemToDelete({ type: 'project', id, name: name || null })
    setShowDeleteConfirm(true)
  }

  // Handle edit post
  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setShowBlogEditor(true)
  }

  // Handle reply to message (add this function)
  const handleReplyMessage = (message: ContactMessage) => {
    window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`
  }

  // Confirm delete handler
  const confirmDelete = async () => {
    if (!itemToDelete) return
    
    const loadingId = toast.loading({
      title: 'O\'chirilmoqda...',
      message: 'Ma\'lumot o\'chirilmoqda'
    })
    
    try {
      switch (itemToDelete.type) {
        case 'post':
          await deletePost(itemToDelete.id)
          toast.success({ 
            title: 'Post o\'chirildi',
            message: itemToDelete.name ? `"${itemToDelete.name}" o'chirildi` : 'Post o\'chirildi'
          })
          break
        case 'message':
          await deleteMessage(itemToDelete.id)
          toast.success({ title: 'Xabar o\'chirildi' })
          break
        case 'project':
          await deleteProject(itemToDelete.id)
          toast.success({ 
            title: 'Loyiha o\'chirildi',
            message: itemToDelete.name ? `"${itemToDelete.name}" o'chirildi` : 'Loyiha o\'chirildi'
          })
          break
      }
    } catch (err: any) {
      toast.error({
        title: 'Xatolik!',
        message: err.message || 'O\'chirishda xatolik'
      })
    } finally {
      toast.dismiss(loadingId)
      setShowDeleteConfirm(false)
      setItemToDelete(null)
    }
  }

  // Export data
  const handleExport = async () => {
    const loadingId = toast.loading({
      title: 'Eksport qilinmoqda...',
      message: 'Ma\'lumotlar yuklanmoqda'
    })
    
    try {
      const data = await exportData(activeTab)
      // Create download link
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${activeTab}-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success({
        title: 'Eksport muvaffaqiyatli!',
        message: 'Ma\'lumotlar yuklandi'
      })
    } catch (err: any) {
      toast.error({
        title: 'Xatolik!',
        message: err.message || 'Eksport qilishda xatolik'
      })
    } finally {
      toast.dismiss(loadingId)
    }
  }

  // Filter data based on search query
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.message.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-500">Yuklanmoqda...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="text-center py-12">
      <div className="text-red-500 mb-4">Xatolik: {error}</div>
      <button 
        onClick={refresh}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Qayta urinish
      </button>
    </div>
  )

  // Get action button for current tab
  const getActionButton = () => {
    switch (activeTab) {
      case 'blog':
        return (
          <button
            onClick={() => {
              setEditingPost(null)
              setShowBlogEditor(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-md transition-shadow"
          >
            <Plus className="w-4 h-4" />
            Yangi Post
          </button>
        )
      case 'projects':
        return (
          <button
            onClick={() => {
              setEditingProject(null)
              setShowProjectEditor(true)
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-md transition-shadow"
          >
            <Plus className="w-4 h-4" />
            Yangi Loyiha
          </button>
        )
      case 'analytics':
        return (
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-md transition-shadow"
          >
            <Download className="w-4 h-4" />
            Eksport qilish
          </button>
        )
      case 'settings':
        return (
          <button
            onClick={() => toast.info({ title: 'Sozlamalar saqlanmoqda...' })}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:shadow-md transition-shadow"
          >
            <SettingsIcon className="w-4 h-4" />
            Saqlash
          </button>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Portfolio ma'lumotlaringizni boshqaring
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search bar for list tabs */}
          {(activeTab === 'blog' || activeTab === 'messages' || activeTab === 'projects') && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 w-full md:w-64"
              />
            </div>
          )}

          {/* Filter button */}
          {(activeTab === 'blog' || activeTab === 'messages' || activeTab === 'projects') && (
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg border ${
                showFilters 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
          )}

          {/* Action button */}
          {getActionButton()}

          {/* Refresh button */}
          <button
            onClick={refresh}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            title="Yangilash"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-4">
            {activeTab === 'blog' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select className="px-3 py-2 border rounded-lg dark:bg-gray-700">
                    <option>Barchasi</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sanasi</label>
                  <input type="date" className="px-3 py-2 border rounded-lg dark:bg-gray-700" />
                </div>
              </>
            )}
            {activeTab === 'messages' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select className="px-3 py-2 border rounded-lg dark:bg-gray-700">
                    <option>Barchasi</option>
                    <option>Yangi</option>
                    <option>O'qilgan</option>
                    <option>Javob berilgan</option>
                  </select>
                </div>
              </>
            )}
            <button className="self-end px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              Filtrlash
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <AdminTabs active={activeTab} onChange={setActiveTab} />

      {/* Content */}
      <div className="mt-6">
        {activeTab === "overview" && (
          <Overview 
            stats={stats} 
            messages={messages}
          />
        )}

        {activeTab === "blog" && (
          <BlogTable 
            posts={filteredPosts}
            onCreate={() => {
              setEditingPost(null)
              setShowBlogEditor(true)
            }}
            onEdit={handleEditPost}
            onDelete={(id: string, name?: string) => handleDeletePost(id, name)}
            onView={(post) => window.open(`/blog/${post.slug}`, '_blank')}
          />
        )}

        {activeTab === "messages" && (
          <MessagesTable 
            messages={filteredMessages}
            onMarkRead={handleMarkMessageAsRead}
            onDelete={handleDeleteMessage}
          />
        )}

        {activeTab === "projects" && (
          <ProjectsTable 
            projects={filteredProjects}
            onCreate={() => {
              setEditingProject(null)
              setShowProjectEditor(true)
            }}
            onEdit={(project) => {
              setEditingProject(project)
              setShowProjectEditor(true)
            }}
            onDelete={(id: string, name?: string) => handleDeleteProject(id, name)}
            onView={(project) => window.open(project.liveUrl || project.githubUrl || '#', '_blank')}
          />
        )}

        {activeTab === "analytics" && (
          <AnalyticsDashboard 
            stats={stats}
            onExport={handleExport}
            onRefresh={refresh}
          />
        )}

        {activeTab === "settings" && (
          <SettingsPanel 
            onSave={() => toast.success({ title: 'Sozlamalar saqlandi' })}
            onReset={() => toast.warning({ title: 'Sozlamalar tiklandi' })}
          />
        )}
      </div>

      {/* Modals */}
      {showBlogEditor && (
        <BlogEditorModal
          post={editingPost}
          onSave={editingPost 
            ? (data: any) => handleUpdatePost(editingPost.id, data)
            : handleCreatePost
          }
          onClose={() => {
            setShowBlogEditor(false)
            setEditingPost(null)
          }}
        />
      )}

      {showProjectEditor && (
        <ProjectEditorModal
          project={editingProject}
          onSave={editingProject
            ? (data: any) => handleUpdateProject(editingProject.id, data)
            : handleCreateProject
          }
          onClose={() => {
            setShowProjectEditor(false)
            setEditingProject(null)
          }}
        />
      )}

      {showDeleteConfirm && itemToDelete && (
        <ConfirmationModal
          isOpen={showDeleteConfirm}
          onClose={() => {
            setShowDeleteConfirm(false)
            setItemToDelete(null)
          }}
          onConfirm={confirmDelete}
          title={`${itemToDelete.type === 'post' ? 'Post' : itemToDelete.type === 'message' ? 'Xabar' : 'Loyiha'}ni o'chirish`}
          message={`Rostan ham ${itemToDelete.type === 'post' ? 'postni' : itemToDelete.type === 'message' ? 'xabarni' : 'loyihani'} o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.`}
          confirmText="O'chirish"
          cancelText="Bekor qilish"
          variant="danger"
        />
      )}
    </div>
  )
}

export default AdminDashboard