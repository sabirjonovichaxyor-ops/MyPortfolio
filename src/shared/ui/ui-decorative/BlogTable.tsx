// src/shared/ui/ui-decorative/BlogTable.tsx
import { useState } from 'react'
import { BlogPost } from '../../../entities/blog/BlogPost'
import { PostStatus } from '../../../entities/blog/PostStatus'
import { Edit2, Trash2, Eye, Calendar, User, MoreVertical, FileText } from 'lucide-react'
import { cn } from '../../../shared/utils/cn'

interface BlogTableProps {
  posts: BlogPost[]
  onCreate?: () => void
  onEdit?: (post: BlogPost) => void
  onDelete?: (id: string) => void
  onView?: (post: BlogPost) => void
}

export function BlogTable({ posts, onCreate, onEdit, onDelete, onView }: BlogTableProps) {
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])

  const handleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(posts.map(p => p.id))
    }
  }

  const handleSelect = (id: string) => {
    setSelectedPosts(prev => 
      prev.includes(id) 
        ? prev.filter(postId => postId !== id)
        : [...prev, id]
    )
  }

  const getStatusColor = (status: PostStatus) => {
    switch (status) {
      case 'PUBLISHED': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'DRAFT': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'ARCHIVED': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('uz-UZ', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={selectedPosts.length === posts.length && posts.length > 0}
            onChange={handleSelectAll}
            className="rounded border-gray-300"
          />
          <h3 className="text-lg font-semibold">Blog Posts ({posts.length})</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onCreate}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-md"
          >
            + Yangi Post
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" onChange={handleSelectAll} />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sarlavha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Muallif
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sanasi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ko'rishlar
              </th>
              <th className="px6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Harakatlar
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() => handleSelect(post.id)}
                    className="rounded border-gray-300"
                  />
                </td>
                
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {post.title}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {post.excerpt || post.content.substring(0, 100)}...
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    getStatusColor(post.status)
                  )}>
                    {post.status}
                  </span>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{post.authorId}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(new Date(post.createdAt))}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{post.views}</span>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onView?.(post)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      title="Ko'rish"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => onEdit?.(post)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      title="Tahrirlash"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => onDelete?.(post.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-red-500"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Hozircha postlar yo'q
          </h4>
          <p className="text-gray-500 mb-4">
            Birinchi blog postingizni yozing!
          </p>
          <button
            onClick={onCreate}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-md"
          >
            Post yaratish
          </button>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedPosts.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {selectedPosts.length} ta tanlandi
            </span>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                O'chirish
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Nashr qilish
              </button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                Arxivlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}