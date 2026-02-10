// src/layouts/ui/AdminSidebar.tsx
import { NavLink, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, FileText, MessageSquare, Settings,
  ChevronLeft, ChevronRight, Briefcase, Users, BarChart3, Home,
  Bell, LogOut
} from 'lucide-react'
import { useState } from 'react'

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/blog', label: 'Blog', icon: FileText },
    { to: '/admin/messages', label: 'Xabarlar', icon: MessageSquare, badge: 3 },
    { to: '/admin/projects', label: 'Loyihalar', icon: Briefcase },
    { to: '/admin/users', label: 'Foydalanuvchilar', icon: Users },
    { to: '/admin/analytics', label: 'Analitika', icon: BarChart3 },
    { to: '/admin/settings', label: 'Sozlamalar', icon: Settings },
  ]

  const handleLogout = () => {
    // Logout logic here
    console.log('Logging out...')
    // Remove auth token, clear storage, etc.
    localStorage.removeItem('auth_token')
    navigate('/')
  }

  const handleGoToSite = () => {
    navigate('/')
  }

  return (
    <aside className={`
      relative bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
      flex flex-col transition-all duration-300 ease-in-out h-screen
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-700">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-800 dark:text-white">Admin</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Panel</div>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
            transition-colors duration-200
            ${isCollapsed ? 'mx-auto' : ''}
          `}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 py-6 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon, badge, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end || false}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
              ${isActive
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
              ${isCollapsed ? 'justify-center px-3' : ''}
            `}
          >
            {({ isActive }) => (
              <>
                {/* Active indicator */}
                {isActive && !isCollapsed && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                )}
            
            <div className={`relative ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500'}`}>
              <Icon className="w-5 h-5" />
              
              {/* Icon hover effect */}
              <div className={`
                absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 
                transition-opacity duration-300
                ${isActive ? 'bg-white' : 'bg-blue-500'}
              `} />
            </div>
            
            {!isCollapsed && (
              <>
                <span className="font-medium flex-1">{label}</span>
                
                {badge && (
                  <span className={`
                    text-xs px-2 py-1 rounded-full font-semibold
                    ${isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-red-500 text-white'
                    }
                  `}>
                    {badge}
                  </span>
                )}
              </>
            )}
            
                {/* Collapsed badge */}
                {badge && isCollapsed && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className={`
        p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30
        ${isCollapsed ? 'space-y-4' : 'space-y-3'}
      `}>
        {/* Home button */}
        <button
          onClick={handleGoToSite}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-xl 
            bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
            transition-colors duration-200 group
            ${isCollapsed ? 'justify-center' : ''}
          `}
          title="Saytga qaytish"
        >
          <Home className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-500" />
          {!isCollapsed && (
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Saytga qaytish
            </span>
          )}
        </button>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-xl 
            bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 
            transition-colors duration-200 group
            ${isCollapsed ? 'justify-center' : ''}
          `}
          title="Chiqish"
        >
          <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600" />
          {!isCollapsed && (
            <span className="font-medium text-red-600 dark:text-red-400">
              Chiqish
            </span>
          )}
        </button>
        
        {/* User info (for expanded mode) */}
        {!isCollapsed && (
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@example.com</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Collapse indicator (floating) */}
      <div 
        className="absolute -right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full p-1.5 cursor-pointer hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 hover:scale-110 shadow-lg shadow-blue-500/30 z-10"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </div>
    </aside>
  )
}

export default AdminSidebar