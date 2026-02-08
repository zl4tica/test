import { apiClient } from "@/lib/apiConfig";
import { ProfileSchema, PasswordResetSchema, type ProfileCredentials, type PasswordResetCredentials } from "@/lib/types";

interface ProfileResponse {
    message: string;
    data: ProfileCredentials;
}

export const profileService = {
    // Get current user profile
    getProfile: async (): Promise<ProfileResponse> => {
        const response = await apiClient.post<ProfileResponse>("/profile");
        return response;
    },

    // Update profile (name, gender, birth_date, wilaya)
    updateProfile: async (data: Partial<ProfileCredentials>): Promise<ProfileResponse> => {
        const parsedData = ProfileSchema.partial().parse(data);
        const response = await apiClient.put<ProfileResponse>("/profile", parsedData);
        return response;
    },

    // Update password
    updatePassword: async (data: PasswordResetCredentials): Promise<ProfileResponse> => {
        const parsedData = PasswordResetSchema.parse(data);
        const response = await apiClient.put<ProfileResponse>("/profile", parsedData);
        return response;
    },
};
