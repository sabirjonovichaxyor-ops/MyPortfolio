import { useState } from 'react'
import { useAdminBlog } from '../blog/model/useAdminBlog'
import { BlogTable } from '@/shared/ui/ui-decorative/BlogTable'
import { BlogPost } from '@/entities/blog/BlogPost'
import BlogEditorModal from './BlogEditorModal'
import { useToast } from '@/shared/hooks/useToast'

const AdminBlog = () => {
  const { posts, total, isLoading, createPost, updatePost, deletePost, error } = useAdminBlog()
  const toast = useToast() // showToast emas, balki toast
  const [showEditor, setShowEditor] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  const handleCreatePost = () => {
    setEditingPost(null)
    setShowEditor(true)
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setShowEditor(true)
  }

  const handleSavePost = async (postData: any) => {
    try {
      if (editingPost) {
        await updatePost({ id: editingPost.id, updates: postData }) // Object sifatida
        toast.success({ // toast.success ishlatish
          title: 'Muvaffaqiyat',
          message: 'Post yangilandi'
        })
      } else {
        await createPost(postData)
        toast.success({
          title: 'Muvaffaqiyat',
          message: 'Post yaratildi'
        })
      }
      setShowEditor(false)
      setEditingPost(null)
    } catch (err: any) {
      const errorMessage = err?.message || 'Saqlashda xatolik yuz berdi'
      toast.error({
        title: 'Xatolik',
        message: errorMessage
      })
      console.error('Post saqlashda xatolik:', err)
    }
  }

  const handleCloseEditor = () => {
    setShowEditor(false)
    setEditingPost(null)
  }

  // Agar loading bo'lsa
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Agar xato bo'lsa
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Xatolik: {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Qayta yuklash
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Blog</h1>
          <p className="text-gray-500 text-sm mt-1">Blog postlarni boshqaring</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            Jami: {total} ta
          </div>
          <button
            onClick={handleCreatePost}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-md transition-shadow"
          >
            + Yangi Post
          </button>
        </div>
      </div>

      <BlogTable 
        posts={posts}
        onCreate={handleCreatePost}
        onEdit={handleEditPost}
        onDelete={(id) => deletePost(id)}
        onView={(post) => window.open(`/blog/${post.slug}`, '_blank')}
      />

      <BlogEditorModal
        post={editingPost || null}
        onClose={handleCloseEditor}
        onSave={handleSavePost}
      />
    </div>
  )
}

export default AdminBlog