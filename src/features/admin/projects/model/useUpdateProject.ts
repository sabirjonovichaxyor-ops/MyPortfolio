import { Project } from "@/entities/project"

export function useUpdateProject() {
  async function updateProject(project: Project) {
    // hozir mock
    console.log("Saving project:", project)

    // keyin supabase update
  }

  return { updateProject }
}
