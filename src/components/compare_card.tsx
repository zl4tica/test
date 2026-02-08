
import { useEffect, useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { STORAGE_URL } from "@/lib/apiConfig";
import { waterService } from "@/services/waterService";
import { type WaterBrand } from "@/lib/api_types";

export default function CompareCard() {
  const [brands, setBrands] = useState<WaterBrand[]>([]);
  const [displayBrands, setDisplayBrands] = useState<[WaterBrand | null, WaterBrand | null]>([null, null]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await waterService.getAllBrands(1, 100); // Get first 100 brands
        setBrands(response.data);
      } catch (err) {
        console.error("Failed to fetch brands for comparison", err);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (brands.length === 0) return;

    const randomize = () => {
      if (brands.length < 2) {
        // If less than 2 brands, just show what we have or repeating
        const b1 = brands[0] || null;
        const b2 = brands.length > 1 ? brands[1] : b1;
        setDisplayBrands([b1, b2]);
        return;
      }

      const idx1 = Math.floor(Math.random() * brands.length);
      let idx2 = Math.floor(Math.random() * brands.length);

      // Ensure distinct brands if possible
      while (idx2 === idx1) {
        idx2 = Math.floor(Math.random() * brands.length);
      }

      setDisplayBrands([brands[idx1], brands[idx2]]);
    };

    // Initial random
    randomize();

    const interval = setInterval(randomize, 2500);
    return () => clearInterval(interval);
  }, [brands]);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-blue-50 dark:bg-slate-900 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border dark:border-slate-800">
        <div className="text-center md:text-right md:w-1/2 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            قارن بين المنتجات
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            هل أنت محتار بين علامتين تجاريتين؟ استخدم أداة المقارنة الخاصة بنا لمعرفة الفرق في المعادن، الأسعار، والمكونات وجنبًا إلى جنب.
          </p>
          <Link to="/compare">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors mt-4 font-medium">
              بدء المقارنة
            </button>
          </Link>
        </div>

        <div className="md:w-1/2 flex items-center justify-center relative">
          {/* Visual representation of comparison */}
          <div className="flex items-center gap-4 md:gap-8">
            {/* Bottle 1 Placeholder */}
            <div className="relative rotate-[-10deg] transform translate-y-4 transition-all duration-500">
              <div className="w-32 h-64 md:w-48 md:h-80 flex items-center justify-center p-2">
                {displayBrands[0] ? (
                  <img
                    src={`${STORAGE_URL}/${displayBrands[0].image}`}
                    alt={displayBrands[0].brand_name}
                    className="w-full h-full object-contain animate-in fade-in zoom-in duration-500"
                    key={displayBrands[0].id} // Key change triggers animation
                  />
                ) : (
                  <div className="text-gray-200 dark:text-slate-600 font-bold text-4xl">?</div>
                )}
              </div >
            </div >

            {/* Arrows */}
            < div className="flex flex-col gap-2 text-blue-500 dark:text-blue-400" >
              <ArrowRight className="w-8 h-8" />
              <ArrowLeft className="w-8 h-8" />
            </div >

            {/* Bottle 2 Placeholder */}
            < div className="relative rotate-[10deg] transform translate-y-4 transition-all duration-500" >
              <div className="w-32 h-64 md:w-48 md:h-80 flex items-center justify-center p-2">
                {displayBrands[1] ? (
                  <img
                    src={`${STORAGE_URL}/${displayBrands[1].image}`}
                    alt={displayBrands[1].brand_name}
                    className="w-full h-full object-contain animate-in fade-in zoom-in duration-500"
                    key={displayBrands[1].id} // Key change triggers animation
                  />
                ) : (
                  <div className="text-gray-200 dark:text-slate-600 font-bold text-4xl">?</div>
                )}
              </div>
            </div >
          </div >
        </div >
      </div >
    </section >
  )
}
