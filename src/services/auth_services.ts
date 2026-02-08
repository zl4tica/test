import { apiClient } from "@/lib/apiConfig";
import {
  AuthResponseSchema,
  LoginSchema,
  RegisterSchema,
  type AuthResponse,
  type LoginCredentials,
  type RegisterCredentials,
} from "@/lib/types";

export const authService = {
  // REGISTER
  register: async (credentials: RegisterCredentials) => {
    const parsedCredentials = RegisterSchema.parse(credentials);
    const response = await apiClient.post<AuthResponse>(
      "/auth/register",
      parsedCredentials,
    );
    // The response data structure from backend is { message: "...", data: { client: ..., token: ... } }
    // We should parse it if needed, but for now just return response
    return response;
  },

  // LOGIN
  login: async (credentials: LoginCredentials) => {
    const parsedCredentials = LoginSchema.parse(credentials);
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      parsedCredentials,
    );
    return response;
  },

  // GOOGLE LOGIN
  googleLogin: async (idToken: string) => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/google-login",
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    return response;
  },

  // LOGOUT
  logout: async () => {
    const response = await apiClient.post<AuthResponse>("/auth/logout");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    return response;
  }
};
