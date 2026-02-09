import { apiClient } from "@/lib/apiConfig";
import { type Post } from "@/lib/api_types";

interface PaginationMeta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

interface PaginatedPostsResponse {
    message: string;
    data: Post[];
    pagination: PaginationMeta;
}

export const postService = {
    getPaginatedPosts: async (page: number = 1, perPage: number = 6): Promise<PaginatedPostsResponse> => {
        try {
            const response = await apiClient.get<PaginatedPostsResponse>("/posts", {
                page,
                perPage
            });
            return response;
        } catch (error) {
            console.error("Error fetching posts:", error);
            return {
                message: "",
                data: [],
                pagination: {
                    total: 0,
                    per_page: perPage,
                    current_page: page,
                    last_page: 1
                }
            };
        }
    },

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
