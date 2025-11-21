export interface User {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  role: 'customer' | 'admin';
  full_name?: string;
  phone?: string;
  address?: string;
  avatar_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
  isActive?: boolean;
  isDeleted?: boolean;
}