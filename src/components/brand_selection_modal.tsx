import { useState, useEffect } from "react";

import { waterService } from "@/services/waterService";
import { type WaterBrand } from "@/lib/api_types";
import { Search, X } from "lucide-react";
import { STORAGE_URL } from "@/lib/apiConfig";
import Pagination from "./pagination";
import { Skeleton } from "@/components/ui/skeleton";

interface BrandSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (brand: WaterBrand) => void;
    excludeBrandId?: number;
}

export default function BrandSelectionModal({ isOpen, onClose, onSelect, excludeBrandId }: BrandSelectionModalProps) {
    const [brands, setBrands] = useState<WaterBrand[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const perPage = 8;

    useEffect(() => {
        if (isOpen) {
            fetchBrands(currentPage);
        }
    }, [isOpen, currentPage]);

    const fetchBrands = async (page: number) => {
        setLoading(true);
        const response = await waterService.getAllBrands(page, perPage);
        setBrands(response.data);
        setLastPage(response.pagination.last_page);
        setLoading(false);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredBrands = brands.filter(
        (brand) =>
            brand.id !== excludeBrandId &&
            brand.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl relative overflow-hidden">

                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-slate-900 z-10">
                    <h2 className="text-xl font-bold dark:text-white">اختر قارورة</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 bg-gray-50 dark:bg-slate-950/50">
                    <div className="relative">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="ابحث عن قارورة..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pr-10 pl-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white"
                        />
                    </div>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="flex flex-col items-center p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-800">
                                    <div className="h-32 mb-3 relative flex items-center justify-center w-full">
                                        <Skeleton className="w-16 h-28 rounded-lg" />
                                    </div>
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {filteredBrands.map((brand) => (
                                <button
                                    key={brand.id}
                                    onClick={() => onSelect(brand)}
                                    className="flex flex-col items-center p-4 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all group bg-white dark:bg-slate-800"
                                >
                                    <div className="h-32 mb-3 relative flex items-center justify-center w-full">
                                        <img
                                            src={`${STORAGE_URL}/${brand.image}`}
                                            alt={brand.brand_name}
                                            className="max-h-full max-w-full object-contain drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">{brand.brand_name}</span>
                                </button>
                            ))}

                            {filteredBrands.length === 0 && (
                                <div className="col-span-full py-12 text-center text-gray-400">
                                    لا توجد نتائج
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {!loading && !searchTerm && (
                    <div className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900">
                        <Pagination
                            currentPage={currentPage}
                            lastPage={lastPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
