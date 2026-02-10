// features/admin/messages/model/useAdminMessages.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageStatus } from "../../../../entities/contact/MessageStatus";
import { ContactMessage } from "../../../../entities/contact/ContactMessage";
import { MessagesAdminApi } from "../../../../shared/api/admin/messages.admin.api";

export const useAdminMessages = () => {
  const queryClient = useQueryClient();

  const messagesQuery = useQuery({
    queryKey: ["admin", "messages"],
    queryFn: () => MessagesAdminApi.getMessages()
  });

  // Removed getMessageQuery and getMessageMutation as MessagesAdminApi.getMessage does not exist.

  const updateMessageMutation = useMutation({
    mutationFn: ({ id, message }: { id: string; message: Partial<ContactMessage> }) =>
      MessagesAdminApi.updateMessage(id, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "message"] });
    }
  });

  const deleteMessageMutation = useMutation({
    mutationFn: MessagesAdminApi.deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "message"] });
    }
  });

  const markAsReadMutation = useMutation({
    mutationFn: MessagesAdminApi.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
    }
  });

  const stats = {
    total: messagesQuery.data?.data?.length || 0,
    new: messagesQuery.data?.data?.filter(m => m.status === MessageStatus.NEW).length || 0,
    responded: messagesQuery.data?.data?.filter(m => m.status === MessageStatus.RESPONDED).length || 0
  };

  return {
    messages: messagesQuery.data?.data || [],
    total: messagesQuery.data?.total || 0,
    isLoading: messagesQuery.isLoading,
    stats,
    markAsRead: markAsReadMutation.mutateAsync
  };
};