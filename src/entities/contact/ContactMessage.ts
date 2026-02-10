import { MessageStatus } from "./MessageStatus";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
  readAt?: string;
  updatedAt?: string;
  respondedAt?: string;
}

