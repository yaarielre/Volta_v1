export interface User {
  id: string;
  email: string;
  name: string;
  role: "PASSENGER" | "DRIVER" | "ADMIN";
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface ApiError {
  message: string;
  errors?: { field: string; message: string }[];
}
