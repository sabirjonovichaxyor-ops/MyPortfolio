// model/useAnalyticsData.ts
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { AnalyticsData } from './types'

export const useAnalyticsData = () => {
  const [data, setData] = useState<AnalyticsData>({
    totalViews: 0,
    todayViews: 0,
    popularPages: [],
    recentViews: [],
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    try {
      // === faqat backend logika ===
      const { count: totalViews } = await supabase
        .from('portfolio_views')
        .select('*', { count: 'exact', head: true })

      const today = new Date().toISOString().split('T')[0]

      const { count: todayViews } = await supabase
        .from('portfolio_views')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today)

      const { data: rawPages } = await supabase
        .from('portfolio_views')
        .select('page')

      const pageMap: Record<string, number> = {}
      rawPages?.forEach(v => {
        pageMap[v.page] = (pageMap[v.page] || 0) + 1
      })

      const popularPages = Object.entries(pageMap)
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      const { data: recentViews } = await supabase
        .from('portfolio_views')
        .select('page, created_at')
        .order('created_at', { ascending: false })
        .limit(10)

      setData({
        totalViews: totalViews ?? 0,
        todayViews: todayViews ?? 0,
        popularPages,
        recentViews: recentViews ?? [],
      })
    } finally {
      setLoading(false)
    }
  }

  return { data, loading }
}
