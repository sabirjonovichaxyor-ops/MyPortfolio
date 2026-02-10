import { supabase } from "@/lib/supabase";
import { BlogPost, PostStatus } from "@/entities/blog";

export const BlogAdminApi = {
  // Blog CRUD
  getBlogPosts: async (page = 1, limit = 20) => {
    const from = (page - 1) * limit;
    const { data, error, count } = await supabase
      .from("blog_posts")
      .select("*", { count: "exact" })
      .range(from, from + limit - 1)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return { data: data as BlogPost[], total: count || 0 };
  },

  createBlogPost: async (post: Omit<BlogPost, "id" | "created_at" | "updatedAt">) => {
    const payload = {
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || null,
      status: post.status,
      tags: post.tags || []
    };

    const { data, error } = await supabase
      .from("blog_posts")
      .insert([payload])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }
    return data as BlogPost;
  },

  updateBlogPost: async (id: string, updates: Partial<BlogPost>) => {
    const payload: any = {};
    
    if (updates.title) payload.title = updates.title;
    if (updates.slug) payload.slug = updates.slug;
    if (updates.content) payload.content = updates.content;
    if (updates.excerpt !== undefined) payload.excerpt = updates.excerpt;
    if (updates.status) payload.status = updates.status;
    if (updates.tags) payload.tags = updates.tags;

    const { data, error } = await supabase
      .from("blog_posts")
      .update(payload)
      .eq("id", id)
      .select()
      .single();
    
    if (error) {
      console.error('Supabase update error:', error);
      throw error;
    }
    return data as BlogPost;
  },

  deleteBlogPost: async (id: string) => {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  }
};