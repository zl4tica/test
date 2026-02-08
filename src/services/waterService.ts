import { apiClient } from "@/lib/apiConfig";
import { type WaterBrand } from "@/lib/api_types";

interface PaginationMeta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

interface PaginatedBrandsResponse {
    message: string;
    data: WaterBrand[];
    pagination: PaginationMeta;
}

export const waterService = {
    getAllBrands: async (page: number = 1, perPage: number = 8): Promise<PaginatedBrandsResponse> => {
        try {
            const response = await apiClient.get<PaginatedBrandsResponse>("/water_brand", {
                page,
                perPage
            });
            return response;
        } catch (error) {
            console.error("Error fetching water brands:", error);
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

    getBrandById: async (id: number): Promise<WaterBrand | null> => {
        try {
            const response = await apiClient.get<WaterBrand>(`/water_brand/${id}`);
            // @ts-ignore
            if (response.data) return response.data;
            return response;
        } catch (error) {
            console.error(`Error fetching water brand ${id}:`, error);
            return null;
        }
    },

    compareBrands: async (brandAId: number, brandBId: number): Promise<any> => {
        // Intentionally returning any for now until we define ComparisonResult type accurately
        // Middleware 'guest.compare.limit' might return 401/429 or a specific message
        // We will handle errors in the component/service consumer
        return await apiClient.get("/water_compare", {
            brand_a: brandAId, // Adjust params based on actual API expectations if needed
            brand_b: brandBId
        });
    }
};
