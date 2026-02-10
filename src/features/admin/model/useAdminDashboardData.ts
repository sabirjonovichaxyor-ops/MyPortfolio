// src/features/admin/model/useAdminDashboardData.ts
import { useState, useEffect } from 'react'
import { BlogAdminApi } from '../../../shared/api/admin/blog.admin.api'
import { BlogPost } from '../../../entities/blog/BlogPost'
import { ContactMessage } from '../../../entities/contact/ContactMessage'
import { MessageStatus } from '../../../entities/contact/MessageStatus'
import { Project } from '../../../entities/project/model/Project'
import { MessagesAdminApi } from '@/shared/api/admin/messages.admin.api'
import { ProjectsAdminApi } from '@/shared/api/admin/projects.admin.api'
import { AnalyticsAdminApi } from '@/shared/api/admin/analytics.admin.api'

export interface DashboardStats {
  totalVisits: number
  newMessages: number
  totalProjects: number
  blogPosts: number
  activeUsers: number
  visitTrend: number
  revenue?: number
  icon?: string
}

export const useAdminDashboardData = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    totalVisits: 0,
    newMessages: 0,
    totalProjects: 0,
    blogPosts: 0,
    activeUsers: 0,
    visitTrend: 0
  })
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Blog posts - try/catch
      let blogData: { data: BlogPost[], total: number } = { data: [], total: 0 }
      try {
        blogData = await BlogAdminApi.getBlogPosts(1, 5)
      } catch (err) {
        console.warn('Blog posts API failed:', err)
      }

      // Messages - try/catch  
      let messagesData: { data: ContactMessage[], total: number } = { data: [], total: 0 }
      try {
        messagesData = await MessagesAdminApi.getMessages(1, 20)
      } catch (err) {
        console.warn('Messages API failed:', err)
      }

      // Projects - fallback (table yo'q)
      let projectsData: { data: Project[], total: number } = { data: [], total: 0 }
      try {
        projectsData = await ProjectsAdminApi.getProjects()
      } catch (err) {
        console.warn('Projects API failed:', err)
        // Fallback: mock data
        projectsData = { data: [], total: 0 }
      }

      // Analytics - fallback (function yo'q)
      let analyticsData: { totalVisits: number, activeUsers: number, trend: number } | null = null
      try {
        analyticsData = await AnalyticsAdminApi.getAnalytics('week')
      } catch (err) {
        console.warn('Analytics API failed:', err)
        // Fallback: mock data
        analyticsData = { totalVisits: 0, activeUsers: 0, trend: 0 }
      }

      setPosts(blogData.data)
      setMessages(messagesData.data)
      setProjects(projectsData.data)

      // Stats hisoblash
      setStats({
        totalVisits: analyticsData?.totalVisits || 0,
        newMessages: messagesData.data?.length || 0,
        totalProjects: projectsData.data?.length || 0,
        blogPosts: blogData.total,
        activeUsers: analyticsData?.activeUsers || 0,
        visitTrend: analyticsData?.trend || 0
      })

    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard data')
      console.error('Dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }

  // CRUD operations
  const createPost = async (postData: Omit<BlogPost, 'id' | 'created_at' | 'updatedAt'>) => {
    try {
      const newPost = await BlogAdminApi.createBlogPost(postData)
      setPosts(prev => [newPost, ...prev])
      setStats(prev => ({ ...prev, blogPosts: prev.blogPosts + 1 }))
      return newPost
    } catch (err) {
      throw err
    }
  }

  const updatePost = async (id: string, updates: Partial<BlogPost>) => {
    try {
      const updated = await BlogAdminApi.updateBlogPost(id, updates)
      setPosts(prev => prev.map(p => p.id === id ? updated : p))
      return updated
    } catch (err) {
      throw err
    }
  }

  const deletePost = async (id: string) => {
    try {
      await BlogAdminApi.deleteBlogPost(id)
      setPosts(prev => prev.filter(p => p.id !== id))
      setStats(prev => ({ ...prev, blogPosts: prev.blogPosts - 1 }))
    } catch (err) {
      throw err
    }
  }

  const markMessageAsRead = async (id: string) => {
    try {
      await MessagesAdminApi.markAsRead(id)
      setMessages(prev => prev.map(m => 
        m.id === id ? { ...m, status: MessageStatus.READ, readAt: new Date().toISOString() } : m
      ))
      setStats(prev => ({ ...prev, newMessages: Math.max(0, prev.newMessages - 1) }))
    } catch (err) {
      throw err
    }
  }

  const deleteMessage = async (id: string) => {
    try {
      await MessagesAdminApi.deleteMessage(id)
      setMessages(prev => prev.filter(m => m.id !== id))
      setStats(prev => ({ 
        ...prev, 
        newMessages: prev.newMessages - (messages.find(m => m.id === id)?.status === 'NEW' ? 1 : 0)
      }))
    } catch (err) {
      throw err
    }
  }

  // Project CRUD operations
  const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newProject = await ProjectsAdminApi.createProject(projectData)
      setProjects(prev => [newProject, ...prev])
      setStats(prev => ({ ...prev, totalProjects: prev.totalProjects + 1 }))
      return newProject
    } catch (err) {
      throw err
    }
  }

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const updated = await ProjectsAdminApi.updateProject(id, updates)
      setProjects(prev => prev.map(p => p.id === id ? updated : p))
      return updated
    } catch (err) {
      throw err
    }
  }

  const deleteProject = async (id: string) => {
    try {
      await ProjectsAdminApi.deleteProject(id)
      setProjects(prev => prev.filter(p => p.id !== id))
      setStats(prev => ({ ...prev, totalProjects: prev.totalProjects - 1 }))
    } catch (err) {
      throw err
    }
  }

  // Analytics export
  const exportData = async (type: string) => {
    try {
      let data: any = {}
      
      switch (type) {
        case 'blog':
          data = {
            posts: posts,
            exportedAt: new Date().toISOString(),
            total: posts.length
          }
          break
        case 'messages':
          data = {
            messages: messages,
            exportedAt: new Date().toISOString(),
            total: messages.length
          }
          break
        case 'projects':
          data = {
            projects: projects,
            exportedAt: new Date().toISOString(),
            total: projects.length
          }
          break
        case 'analytics':
          data = {
            stats: stats,
            exportedAt: new Date().toISOString()
          }
          break
        default:
          data = { error: 'Invalid export type' }
      }
      
      return data
    } catch (err) {
      throw err
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return {
    stats,
    posts,
    messages,
    projects,
    loading,
    error,
    refresh: fetchDashboardData,
    createPost,
    updatePost,
    deletePost,
    markMessageAsRead,
    deleteMessage,
    createProject,
    updateProject,
    deleteProject,
    exportData
  }
}