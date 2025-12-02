export interface AuthenticatedUser {
  id: number;
  username: string;
  email: string;
  image?: string;
  token: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthenticatedUser;
  message: string;
}
