import { supabase } from "@/lib/supabase";
import { ContactMessage, MessageStatus } from "@/entities/contact";

export const MessagesAdminApi = {
  // Messages CRUD
  getMessages: async (page = 1, limit = 20) => {
    const from = (page - 1) * limit;
    const { data, error, count } = await supabase
      .from("contact_messages")
      .select("*", { count: "exact" })
      .range(from, from + limit - 1)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return { data: data as ContactMessage[], total: count || 0 };
  },

  createMessage: async (message: Omit<ContactMessage, "id" | "created_at" | "updatedAt">) => {
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([{
        ...message,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data as ContactMessage;
  },

  updateMessage: async (id: string, message: Partial<ContactMessage>) => {
    const { data, error } = await supabase
      .from("contact_messages")
      .update({
        ...message,
        updatedAt: new Date()
      })
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data as ContactMessage;
  },

  deleteMessage: async (id: string) => {
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  },

    markAsRead: async (id: string) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ 
        status: MessageStatus.READ,
        readAt: new Date()
      })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  },
};