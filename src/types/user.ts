export interface User {
  _id: string;
  username: string;
  email: string;
  password: string; // hashed password
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
  isDeleted: boolean;
}