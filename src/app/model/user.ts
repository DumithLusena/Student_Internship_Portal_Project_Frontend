export enum UserRole {
  ADMIN = 'ADMIN',
  COMPANY = 'COMPANY',
  STUDENT = 'STUDENT'
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  companyName?: string;
  course?: string;
  institution?: string;
  phone?: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}