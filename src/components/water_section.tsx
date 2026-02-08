
import { useEffect, useState } from "react";
import { STORAGE_URL } from "@/lib/apiConfig";
import { waterService } from "@/services/waterService";
import { type WaterBrand } from "@/lib/api_types";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Pagination from "./pagination";

export default function WaterSection() {
  const [brands, setBrands] = useState<WaterBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const perPage = 8;

  useEffect(() => {
    fetchBrands(currentPage);
  }, [currentPage]);

  const fetchBrands = async (page: number) => {
    setLoading(true);
    try {
      const response = await waterService.getAllBrands(page, perPage);
      setBrands(response.data);
      setLastPage(response.pagination.last_page);
    } catch (error) {
      console.error("Failed to fetch water brands", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredBrands = brands.filter(brand =>
    (brand.brand_name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
        اعثر على <span className="text-blue-500">المياه المعبأة</span> التي تناسب احتياجاتك
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
        قارن بين الأحجام، المعادن، مستويات الصوديوم وأكثر. اكتشف علامات تجارية للمياه في جميع أنحاء البلاد
      </p>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="ابحث عن شركة مياه..."
            className="pr-10 text-right dark:bg-gray-800 dark:text-white dark:border-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl p-6 pb-12 shadow-sm border-2 border-gray-100 dark:border-gray-700 flex flex-col items-center justify-between h-[340px]">
              <div className="flex-1 flex items-center justify-center w-full">
                <Skeleton className="w-32 h-48 rounded-lg" />
              </div>
              <Skeleton className="h-6 w-24 mt-4" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {filteredBrands.map((brand) => (
              <Link key={brand.id} to={`/water/${brand.id}`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 pb-12 shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 dark:hover:border-blue-500 flex flex-col items-center justify-between h-[340px] relative overflow-hidden group-hover:dark:bg-slate-800">
                  <div className="absolute inset-0 border-2 border-gray-100 dark:border-gray-700 rounded-3xl pointer-events-none group-hover:border-transparent transition-colors"></div>
                  <div className="flex-1 flex items-center justify-center w-full z-10">
                    <div className="w-48 h-48 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity transform translate-y-[-10px]">
                      <img
                        src={`${STORAGE_URL}/${brand.image}`}
                        alt={brand.brand_name}
                        className="max-h-full max-w-full object-contain drop-shadow-sm"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.classList.add('bg-gray-100', 'rounded-full');
                          e.currentTarget.parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>';
                        }}
                      />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 z-10 mb-2">
                    {brand.brand_name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {!searchTerm && (
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {filteredBrands.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 mt-8">لا توجد نتائج</p>
          )}
        </>
      )}
    </section>
  );
}

