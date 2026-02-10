// src/features/admin/ui/AdminTabs.tsx
import { cn } from "@/shared/utils/cn"
import { AdminTab } from "./AdminDashboard"

interface AdminTabsProps {
  active: AdminTab
  onChange: (tab: AdminTab) => void 
}

const tabs: { id: AdminTab; label: string; path?: string }[] = [
  { id: 'overview', label: 'Overview', path: '/admin' },
  { id: 'blog', label: 'Blog Posts', path: '/admin/blog' },
  { id: 'messages', label: 'Messages', path: '/admin/messages' },
  { id: 'projects', label: 'Projects', path: '/admin/projects' },
  { id: 'analytics', label: 'Analytics', path: '/admin/analytics' },
  { id: 'settings', label: 'Settings', path: '/admin/settings' },
]

export function AdminTabs({ active, onChange }: AdminTabsProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-2 md:space-x-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "py-3 px-1 md:px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex items-center gap-2",
              active === tab.id
                ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
            )}
          >
            {tab.label}
            {/* Badge for messages */}
            {tab.id === 'messages' && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                3
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}