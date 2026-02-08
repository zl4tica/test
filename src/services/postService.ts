import { apiClient } from "@/lib/apiConfig";
import { type Post } from "@/lib/api_types";

export const postService = {
    getLatestPosts: async (): Promise<Post[]> => {
        try {
            const response = await apiClient.get<Post[]>("/posts");
            // Wrapper handling
            // @ts-ignore
            if (response.data && Array.isArray(response.data)) {
                // @ts-ignore
                return response.data;
            }
            if (Array.isArray(response)) {
                return response;
            }
            return [];
        } catch (error) {
            console.error("Error fetching posts:", error);
            return [];
        }
    },

    getPostById: async (id: number): Promise<Post | null> => {
        try {
            const response = await apiClient.get<Post>(`/posts/${id}`);
            // @ts-ignore
            if (response.data) return response.data;
            return response;
        } catch (error) {
            console.error(`Error fetching post ${id}:`, error);
            return null;
        }
    }
};
