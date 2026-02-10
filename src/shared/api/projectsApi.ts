import { supabase } from '@/lib/supabase'
import { Project } from '@/entities/project/model/Project'

export const getPublishedProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('order')

  if (error) throw error
  return data as Project[]
}
