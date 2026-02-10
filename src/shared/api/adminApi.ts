import { supabase } from "../../lib/supabase"

export const adminApi = {
  async loadDashboard() {
    const today = new Date().toISOString().split("T")[0]

    const views = await supabase
      .from("portfolio_views")
      .select("*", { count: "exact", head: true })

    const todayViews = await supabase
      .from("portfolio_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", today)

    const messages = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })

    const posts = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false })

    return {
      stats: {
        totalViews: views.count || 0,
        todayViews: todayViews.count || 0,
        totalMessages: messages.data?.length || 0,
        totalPosts: posts.data?.length || 0,
      },
      posts: posts.data || [],
      messages: messages.data || [],
    }
  },
}
