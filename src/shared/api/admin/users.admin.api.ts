import { supabase } from "@/lib/supabase";
import { User, UserRole } from "@/entities/user";

export const UsersAdminApi = {
  // Get all users
  getUsers: async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("createdAt", { ascending: false });
    
    if (error) throw error;
    return data as User[];
  },

  // Get user by ID
  getUser: async (id: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) throw error;
    return data as User;
  },

  // Update user role
  updateUserRole: async (id: string, role: UserRole) => {
    const { data, error } = await supabase
      .from("users")
      .update({ role })
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data as User;
  },

  // Delete user
  deleteUser: async (id: string) => {
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  }
};