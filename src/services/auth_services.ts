import { apiClient } from "@/lib/apiConfig";
import {
  AuthResponseSchema,
  LoginSchema,
  RegisterSchema,
  type AuthResponse,
  type LoginCredentials,
  type RegisterCredentials,
} from "@/lib/types";

// REGISTER
export const register = async (credentials: RegisterCredentials) => {
  const parsedCredentials = RegisterSchema.parse(credentials);
  const response = await apiClient.post<AuthResponse>(
    "/register",
    parsedCredentials,
  );
  const parsedResponse = AuthResponseSchema.parse(response.data);
  if ("client" in parsedResponse.data && parsedResponse.data.token) {
    localStorage.setItem("auth_token", parsedResponse.data.token.token);
  }
  return response;
};

// LOGIN
export const login = async (credentials: LoginCredentials) => {
  const parsedCredentials = LoginSchema.parse(credentials);
  const response = await apiClient.post<AuthResponse>(
    "/login",
    parsedCredentials,
  );
  const parsedResponse = AuthResponseSchema.parse(response.data);
  if (!("client" in parsedResponse.data) && parsedResponse.data.token) {
    localStorage.setItem("auth_token", parsedResponse.data.token);
  }
  return response;
};

// LOGOUT
export const logout = async () => {
  const response = await apiClient.post<AuthResponse>("/logout");
  if (response.message === "تم تسجيل الخروج بنجاح") {
    localStorage.removeItem("auth_token");
    return response;
  }
  return response.message;
};
