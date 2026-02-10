import { UserRole } from "./UserRole"

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  lastLogin?: string;
  isActive: boolean;
}

