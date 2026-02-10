import { PostStatus } from "./PostStatus";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  authorId: string;
  status: PostStatus;
  tags: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  views: number;
}

