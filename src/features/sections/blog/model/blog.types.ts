import type { BlogPost } from '@/entities/blog/BlogPost';

export type BlogState = {
  posts: BlogPost[];
  loading: boolean;
  selectedPost: BlogPost | null;
};

export type BlogActions = {
  selectPost: (post: BlogPost | null) => void;
};
