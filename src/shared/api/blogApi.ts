import { supabase } from '@/lib/supabase'
import { BlogPost } from '@/entities/blog/BlogPost'

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as BlogPost[]
}
