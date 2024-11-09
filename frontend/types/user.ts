// types/user.ts

// Enum for user roles
export type UserRole = 'customer' | 'admin';

// Interface for the User type
export interface User {
  id: string; // This corresponds to the MongoDB _id
  name: string;
  email: string;
}

// Interface for the registration input (without the id and timestamps)
export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  role?: UserRole; // Optional, default will be 'customer' in the backend
}

// Interface for the login input
export interface LoginUserInput {
  email: string;
  password: string;
}

// Interface for the login response, which may include a token
export interface LoginResponse {
  token: string;
}
