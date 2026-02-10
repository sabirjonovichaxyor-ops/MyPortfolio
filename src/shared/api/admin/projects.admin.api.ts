import { supabase } from "@/lib/supabase";
import { Project, ProjectStatus } from "@/entities/project";

export const ProjectsAdminApi = {
  // Projects CRUD
  getProjects: async (page = 1, limit = 20) => {
    const from = (page - 1) * limit;
    const { data, error, count } = await supabase
      .from("projects")
      .select("*", { count: "exact" })
      .range(from, from + limit - 1)
      .order("createdAt", { ascending: false });
    
    if (error) throw error;
    return { data: data as Project[], total: count || 0 };
  },

  getProject: async (id: string) => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  createProject: async (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    const { data, error } = await supabase
      .from("projects")
      .insert([{
        ...project,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  updateProject: async (id: string, project: Partial<Project>) => {
    const { data, error } = await supabase
      .from("projects")
      .update({
        ...project,
        updatedAt: new Date()
      })
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data as Project;
  },

  deleteProject: async (id: string) => {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  }
};