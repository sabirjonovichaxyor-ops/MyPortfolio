// src/pages/AdminPage.tsx
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AdminDashboard from '../features/admin/ui/AdminDashboard'
import { AdminTab } from '../features/admin/ui/AdminDashboard'

const AdminPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<AdminTab>('overview')

  // URL'ga qarab tabni o'rnatish
  useEffect(() => {
    const path = location.pathname
    
    if (path === '/admin' || path === '/admin/') {
      setActiveTab('overview')
    } else if (path.includes('/admin/blog')) {
      setActiveTab('blog')
    } else if (path.includes('/admin/messages')) {
      setActiveTab('messages')
    } else if (path.includes('/admin/users')) {
      setActiveTab('overview') // Hozircha users tab yo'q, default overview
    } else if (path.includes('/admin/projects')) {
      setActiveTab('overview') // Hozircha projects tab yo'q, default overview
    }
  }, [location.pathname])

  // Tab o'zgarganda URL'ni yangilash
  const handleTabChange = (tab: AdminTab) => {
    setActiveTab(tab)
    
    switch (tab) {
      case 'overview':
        navigate('/admin')
        break
      case 'blog':
        navigate('/admin/blog')
        break
      case 'messages':
        navigate('/admin/messages')
        break
      default:
        navigate('/admin')
    }
  }

  return (
    <AdminDashboard 
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
  )
}

export default AdminPage