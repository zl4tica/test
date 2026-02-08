import { apiClient } from "@/lib/apiConfig";
import { type Review } from "@/lib/api_types";

export interface ReviewsResponse {
    message: string;
    data: Review[];
}

export const reviewService = {
    getLatestReviews: async (): Promise<Review[]> => {
        try {
            // The user provided example response has { message: "...", data: [...] }
            const response = await apiClient.get<ReviewsResponse>("/reviews");
            if (response.data && Array.isArray(response.data)) {
                return response.data;
            }
            // Fallback if API changes
            if (Array.isArray(response)) {
                return response;
            }
            return [];
        } catch (error) {
            console.error("Error fetching reviews:", error);
            return [];
        }
    },

    getReviewsByBrand: async (brandId: number): Promise<Review[]> => {
        try {
            const response = await apiClient.get<ReviewsResponse>(`/reviews/${brandId}`);
            if (response.data && Array.isArray(response.data)) {
                return response.data;
            }
            if (Array.isArray(response)) {
                return response;
            }
            return [];
        } catch (error) {
            console.error(`Error fetching reviews for brand ${brandId}:`, error);
            return [];
        }
    },

    getReviewsByWaterId: async (waterId: number): Promise<Review[]> => {
        return reviewService.getReviewsByBrand(waterId);
    },

    addReview: async (waterId: number, rating: number, content: string): Promise<any> => {
        // This is a placeholder for when the backend is ready
        return await apiClient.post("/reviews", {
            water_id: waterId,
            rating,
            content
        });
    }
};
