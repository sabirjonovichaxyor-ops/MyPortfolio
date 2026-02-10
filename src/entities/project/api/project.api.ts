import { Project } from "../model/Project"
import { mapProjectDto } from "./project.mapper"
import { PROJECTS_MOCK } from "../mock/projects.mock"
import { supabase } from "@/lib/supabase"

export const fetchProjects = getAllProjects

export async function createProject(project: Project) {
  if (USE_MOCK) {
    console.log("Creating project:", project)
    return project
  }

  const { data, error } = await supabase
    .from("projects")
    .insert([project])
    .select()

  if (error) throw error
  return data[0]
}

export async function updateProject(id: string, project: Partial<Project>) {
  if (USE_MOCK) {
    console.log("Updating project:", id, project)
    // Mock da o'zgartirish log qilamiz
    return { ...project, id } as Project
  }

  const { data, error } = await supabase
    .from("projects")
    .update(project)
    .eq("id", id)
    .select()

  if (error) throw error
  return data[0]
}

export async function deleteProject(id: string) {
  if (USE_MOCK) {
    console.log("Deleting project:", id)
    return
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)

  if (error) throw error
}

const USE_MOCK = true

export async function getAllProjects(): Promise<Project[]> {
  if (USE_MOCK) {
    return PROJECTS_MOCK
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*")

  if (error) throw error

  return data.map(mapProjectDto)
}
