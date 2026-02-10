// src/features/admin/ui/AnalyticsDashboard.tsx
import { DashboardStats } from "../model/useAdminDashboardData"
import { BarChart3, TrendingUp, TrendingDown, Users, Eye, Download } from "lucide-react"
import StatCard from "@/shared/ui/ui-decorative/StatCard"

interface AnalyticsDashboardProps {
  stats: DashboardStats
  onExport: () => void
  onRefresh: () => void
}

export function AnalyticsDashboard({ stats, onExport, onRefresh }: AnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Jami Tashriflar"
          value={stats.totalVisits.toLocaleString()}
          icon={Eye} // ✅ JSX EMAS, komponent o'zi
          label={stats.visitTrend > 0 ? `+${stats.visitTrend}% oyiga` : `${stats.visitTrend}% oyiga`}
          color="blue"
        />
        <StatCard
          title="Ortacha Sessiya"
          value="2m 34s"
          icon={BarChart3} // ✅ JSX EMAS, komponent o'zi
          label="O'tgan oydan +12s"
          color="green"
        />
        <StatCard
          title="Qaytish Darajasi"
          value="32%"
          icon={Users} // ✅ JSX EMAS, komponent o'zi
          label="O'tgan oydan -2%"
          color="purple"
        />
        <StatCard
          title="Eng Yaxshi Sahifa"
          value="/projects"
          icon={TrendingUp} // ✅ JSX EMAS, komponent o'zi
          label="Eng ko'p tashrif"
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Tashriflar statistikasi</h3>
          <div className="h-64 flex items-center justify-center border rounded-lg">
            <p className="text-gray-500">Chart komponenti (Chart.js yoki Recharts)</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Tezkor amallar</h3>
            <div className="space-y-3">
              <button
                onClick={onExport}
                className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span>Statistikalarni yuklash</span>
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={onRefresh}
                className="w-full flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <span>Ma'lumotlarni yangilash</span>
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Eng ko'p tashrif</h3>
            <div className="space-y-3">
              {['/projects', '/blog/react-guide', '/about', '/contact'].map((page, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm truncate">{page}</span>
                  <span className="text-sm font-medium">{(1234 - i * 234).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}