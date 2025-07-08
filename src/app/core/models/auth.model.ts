export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  token: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
} 