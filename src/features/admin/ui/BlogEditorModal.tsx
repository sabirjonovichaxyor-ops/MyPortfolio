// src/features/admin/ui/BlogEditorModal.tsx
import { useState, useEffect } from 'react'
import { BlogPost } from '@/entities/blog/BlogPost'
import { PostStatus } from '@/entities/blog/PostStatus'
import { X } from 'lucide-react'
import { useToast } from '../../../shared/hooks/useToast'

interface BlogEditorModalProps {
  post?: BlogPost | null
  onSave: (data: Partial<BlogPost>) => Promise<void> // Partial qilib o'zgartirdik
  onClose: () => void
}

interface BlogFormData {
  title: string
  content: string
  excerpt: string
  slug: string
  status: PostStatus
  tags: string[]
}

export default function BlogEditorModal({ post, onSave, onClose }: BlogEditorModalProps) {
  const toast = useToast()
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    status: 'DRAFT' as PostStatus,
    tags: []
  })
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        slug: post.slug,
        status: post.status,
        tags: post.tags || []
      })
    } else {
      // Reset form for new post
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        slug: '',
        status: 'DRAFT' as PostStatus,
        tags: []
      })
    }
  }, [post])

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Form validation
    if (!formData.title.trim()) {
      setError('Sarlavha majburiy')
      return
    }
    if (!formData.content.trim()) {
      setError('Kontent majburiy')
      return
    }
    if (!formData.slug.trim()) {
      setError('Slug majburiy')
      return
    }

    // Auto-generate slug from title if empty
    const finalFormData = {
      ...formData,
      slug: formData.slug.trim() || formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
    }

    setLoading(true)
    setError(null)
    
    try {
      await onSave(finalFormData)
      toast.success({ // to'g'ri funksiyani chaqirish
        title: 'Muvaffaqiyat',
        message: post ? 'Post yangilandi' : 'Post yaratildi'
      })
      onClose()
    } catch (err: any) {
      const errorMessage = err?.message || 'Saqlashda xatolik yuz berdi'
      setError(errorMessage)
      toast.error({ // to'g'ri funksiyani chaqirish
        title: 'Xatolik',
        message: errorMessage
      })
      console.error('Blog saqlashda xatolik:', err)
    } finally {
      setLoading(false)
    }
  }

  // Escape to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {post ? 'Postni tahrirlash' : 'Yangi post yaratish'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {post ? `ID: ${post.id}` : 'Yangi post'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Sarlavha
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Post sarlavhasi"
                required
                autoFocus
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Slug
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400">/blog/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="post-slug"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                URL uchun qisqa nom. Masalan: "mening-birinchi-postim"
              </p>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Qisqacha tavsif
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows={3}
                placeholder="Postning qisqacha tavsifi..."
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Bu tavsif post ro'yxatida va SEO uchun ishlatiladi
              </p>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Kontent
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono"
                rows={12}
                placeholder="Post kontenti..."
                required
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Markdown yoki HTML formatida yozishingiz mumkin</span>
                <span>{formData.content.length} belgi</span>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as PostStatus }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Teglar
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Teg qo'shish (Enter tugmasi)"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  Qo'shish
                </button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-800 dark:text-blue-300 rounded-full flex items-center gap-2 text-sm font-medium"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-500 transition-colors"
                        aria-label={`${tag} tegini o'chirish`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-900/30">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
              disabled={loading}
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saqlanmoqda...
                </span>
              ) : (
                post ? 'Yangilash' : 'Yaratish'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}