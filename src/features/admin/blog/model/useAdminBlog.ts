// features/admin/blog/model/useAdminBlog.ts
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogPost } from "../../../../entities/blog/BlogPost";
import { BlogAdminApi } from "../../../../shared/api/admin/blog.admin.api";

export const useAdminBlog = () => {
  const queryClient = useQueryClient();

  const blogQuery = useQuery({
    queryKey: ["admin", "blog"],
    queryFn: () => BlogAdminApi.getBlogPosts()
  });

  const createMutation = useMutation({
    mutationFn: BlogAdminApi.createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    },
    onError: (error: any) => {
      console.error('Create post error:', error);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<BlogPost> }) =>
      BlogAdminApi.updateBlogPost(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: BlogAdminApi.deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blog"] });
    }
  });

  return {
    posts: blogQuery.data?.data || [],
    total: blogQuery.data?.total || 0,
    isLoading: blogQuery.isLoading,
    error: blogQuery.error?.message || createMutation.error?.message || updateMutation.error?.message || deleteMutation.error?.message || null,
    createPost: createMutation.mutateAsync,
    updatePost: updateMutation.mutateAsync,
    deletePost: deleteMutation.mutateAsync
  };
};