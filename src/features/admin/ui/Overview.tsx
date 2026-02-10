// src/features/admin/ui/Overview.tsx
import { DashboardStats } from '../model/useAdminDashboardData'
import { ContactMessage } from '../../../entities/contact/ContactMessage'
import { StatCard } from '../../../shared/ui/ui-decorative/StatCard'
import { TrendingUp, TrendingDown, Eye, Mail, FileText, Users, Briefcase } from 'lucide-react'

interface OverviewProps {
  stats: DashboardStats
  messages: ContactMessage[]
}

export function Overview({ stats, messages }: OverviewProps) {
  const recentMessages = messages.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard
          title="Jami Tashriflar"
          value={stats.totalVisits.toLocaleString()}
          icon={Eye}
          label={stats.visitTrend >= 0 ? `+${stats.visitTrend}% o'tgan haftaga nisbatan` : `${stats.visitTrend}% o'tgan haftaga nisbatan`}
          color={stats.visitTrend >= 0 ? "green" : "red"}
        />

        <StatCard
          title="Yangi Xabarlar"
          value={stats.newMessages.toLocaleString()}
          icon={Mail}
          label="O'qilmagan xabarlar"
          color="blue"
        />

        <StatCard
          title="Blog Maqolalar"
          value={stats.blogPosts.toLocaleString()}
          icon={FileText}
          label="Jami maqolalar soni"
          color="green"
        />

        <StatCard
          title="Loyihalar"
          value={stats.totalProjects.toLocaleString()}
          icon={Briefcase}
          label="Portfoliodagi loyihalar"
          color="purple"
        />

        <StatCard
          title="Faol Foydalanuvchilar"
          value={stats.activeUsers.toLocaleString()}
          icon={Users}
          label="Oxirgi 30 kun"
          color="orange"
        />

        <StatCard
          title="O'sish Darajasi"
          value={`${Math.abs(stats.visitTrend)}%`}
          icon={stats.visitTrend >= 0 ? TrendingUp : TrendingDown}
          label={stats.visitTrend >= 0 ? "Ijobiy o'sish" : "Salbiy o'sish"}
          color={stats.visitTrend >= 0 ? "green" : "red"}
        />
      </div>

      {/* Recent Messages */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">So'nggi Xabarlar</h3>
        {recentMessages.length > 0 ? (
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div 
                key={msg.id} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white">
                    {msg.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{msg.name}</p>
                    <p className="text-sm text-gray-500 truncate max-w-xs">{msg.subject}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    msg.status === 'NEW' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  }`}>
                    {msg.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">Hozircha xabarlar yo'q</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl hover:shadow-lg transition-shadow">
          <div className="font-semibold">Yangi Post</div>
          <div className="text-sm opacity-90">Blog qo'shish</div>
        </button>

        <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl hover:shadow-lg transition-shadow">
          <div className="font-semibold">Loyiha qo'shish</div>
          <div className="text-sm opacity-90">Portfolioni yangila</div>
        </button>

        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl hover:shadow-lg transition-shadow">
          <div className="font-semibold">Statistikalar</div>
          <div className="text-sm opacity-90">Batafsil ko'rish</div>
        </button>

        <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-xl hover:shadow-lg transition-shadow">
          <div className="font-semibold">Export</div>
          <div className="text-sm opacity-90">Ma'lumotlarni yuklash</div>
        </button>
      </div>
    </div>
  )
}