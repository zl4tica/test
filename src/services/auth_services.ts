import { apiClient } from "@/lib/apiConfig";
import { type LoginCredentials, type RegisterCredentials, type AuthResponse } from "@/lib/types";

export const authService = {
    login: async (credentials: LoginCredentials) => {
        return apiClient.post<AuthResponse>("/auth/login", credentials);
    },

    register: async (data: RegisterCredentials) => {
        return apiClient.post<AuthResponse>("/auth/register", data);
    },

    googleLogin: async (credential: string) => {
        return apiClient.post<AuthResponse>("/auth/google-login", {}, {
            headers: {
                "Authorization": `Bearer ${credential}`
            }
        });
    },

    logout: async () => {
        return apiClient.post<{ message: string }>("/auth/logout");
    },
};
