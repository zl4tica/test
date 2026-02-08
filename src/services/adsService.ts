import { apiClient } from "@/lib/apiConfig";
import { type Advertisement } from "@/lib/api_types";

export const adsService = {
    getAds: async (): Promise<Advertisement[]> => {
        try {
            const response = await apiClient.get<Advertisement[]>("/ads");
            // Handle potential wrapped response data structure if API returns { data: [...] }
            if (Array.isArray(response)) {
                return response;
            }
            // @ts-ignore
            if (response.data && Array.isArray(response.data)) {
                // @ts-ignore
                return response.data;
            }
            return [];
        } catch (error) {
            console.error("Error fetching ads:", error);
            return [];
        }
    },

    trackClick: async (id: number): Promise<void> => {
        try {
            await apiClient.post("/ads/click", { id });
        } catch (error) {
            console.error("Error tracking ad click:", error);
        }
    },
};
