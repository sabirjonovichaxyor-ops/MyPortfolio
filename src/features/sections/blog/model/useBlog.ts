import { useEffect, useState } from 'react';
import { getBlogPosts } from '@/shared/api/blogApi';
import { trackPageView } from '@/shared/api/analyticsApi';
import type { BlogPost } from '@/entities/blog/BlogPost';
import type { BlogState, BlogActions } from './blog.types';

export const useBlog = (): BlogState & BlogActions & {
  formatDate: (date: string) => string;
  readingTime: (content: string) => number;
} => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    trackPageView('blog');
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getBlogPosts();
      setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const readingTime = (content: string) => {
    const wordsPerMinute = 200;
    return Math.ceil(content.split(' ').length / wordsPerMinute);
  };

  return {
    posts,
    loading,
    selectedPost,
    selectPost: setSelectedPost,
    formatDate,
    readingTime
  };
};
