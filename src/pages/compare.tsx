import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { type WaterBrand, type Advertisement } from "@/lib/api_types";
import { SEO } from "@/components/layout/seo";
import { waterService } from "@/services/waterService";
import { adsService } from "@/services/adsService";
import BrandSelectionModal from "@/components/brand_selection_modal";
import ComparisonResults from "@/components/comparison_results";
import AdsCard from "@/components/ads_card";
import { Plus } from "lucide-react";
import { STORAGE_URL } from "@/lib/apiConfig";
import LoginPromptModal from "@/components/login_prompt_modal";

export default function Compare() {
  const [searchParams] = useSearchParams();
  const [brandA, setBrandA] = useState<WaterBrand | null>(null);
  const [brandB, setBrandB] = useState<WaterBrand | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState<"A" | "B" | null>(null);
  const [ads, setAds] = useState<Advertisement[]>([]);

  // State to track if comparison was "performed" via API to handle rate limits
  const [hasCompared, setHasCompared] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    // Fetch ads
    adsService.getAds().then(setAds);

    // Initial load from query params
    const initialFetch = async () => {
      const idA = searchParams.get("brandA");
      const idB = searchParams.get("brandB");

      if (idA) {
        const data = await waterService.getBrandById(Number(idA));
        if (data) setBrandA(data);
      }
      if (idB) {
        const data = await waterService.getBrandById(Number(idB));
        if (data) setBrandB(data);
      }
    };

    initialFetch();
  }, [searchParams]);

  const openSelection = (slot: "A" | "B") => {
    setActiveSlot(slot);
    setIsModalOpen(true);
  };

  const handleSelectBrand = (brand: WaterBrand) => {
    if (activeSlot === "A") {
      setBrandA(brand);
    } else {
      setBrandB(brand);
    }
    setIsModalOpen(false);
    setActiveSlot(null);
    setHasCompared(false); // Reset comparison state when brand changes
  };

  // Trigger comparison when both are selected
  useEffect(() => {
    const performComparison = async () => {
      if (brandA && brandB && !hasCompared) {
        try {
          // Check if user is authenticated
          const isAuthenticated = localStorage.getItem("auth_token") !== null;

          // Verify with API if user is allowed to compare
          const response = await waterService.compareBrands(brandA.id, brandB.id);

          // Only show login prompt if user is NOT authenticated AND response indicates rate limit
          // @ts-ignore
          if (!isAuthenticated && response?.message && response.message.includes("تسجيل الدخول")) {
            setShowLoginPrompt(true);
            setHasCompared(false);
          } else {
            // If authenticated or successful response, mark as compared
            setHasCompared(true);
            setShowLoginPrompt(false);
          }

        } catch (error: any) {
          console.error("Comparison check failed", error);
          const isAuthenticated = localStorage.getItem("auth_token") !== null;

          // Only show login prompt for unauthenticated users hitting rate limits
          if (!isAuthenticated) {
            if (error.message && error.message.includes("429")) {
              setShowLoginPrompt(true);
              setHasCompared(false);
            }
            // @ts-ignore
            if (error.response?.status === 429) {
              setShowLoginPrompt(true);
              setHasCompared(false);
            }
          } else {
            // For authenticated users, still mark as compared even if there's an error
            // (they might have other issues, but not rate limits)
            setHasCompared(true);
          }
        }
      }
    };

    performComparison();
  }, [brandA, brandB, hasCompared]);


  return (
    <div className="min-h-screen pb-20">
      <SEO
        title="مقارنة المياه | ALMAA"
        description="قارن بين أنواع مختلفة من مياه الشرب بناءً على المكونات الكيميائية والتقييمات. اتخذ قراراً مستنيراً لصحتك."
        keywords="مقارنة مياه, تحليل مياه, ALMAA, جودة المياه"
      />
      {/* Top Ad */}
      {ads.length > 0 && <AdsCard ad={ads[0]} />}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">قارن العلامات التجارية للمياه</h1>

        {/* Selection Area */}
        <div className="grid grid-cols-2 gap-4 md:gap-8 mb-12">

          {/* Card A */}
          <div className="relative">
            <div
              onClick={() => openSelection("A")}
              className="bg-white dark:bg-slate-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl h-64 md:h-80 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/10 transition-all group"
            >
              {brandA ? (
                <>
                  <div className="h-48 mb-4">
                    <img
                      src={`${STORAGE_URL}/${brandA.image}`}
                      alt={brandA.brand_name}
                      className="h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{brandA.brand_name}</h3>
                  <p className="text-sm text-gray-500 mt-2">انقر للتغيير</p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-10 h-10 text-gray-400" />
                  </div>
                  <span className="text-lg font-medium text-gray-500 dark:text-gray-400">اختر قارورة</span>
                  <div className="mt-2 text-sm text-gray-400">القارورة A</div>
                </>
              )}
            </div>
          </div>

          {/* Card B */}
          <div className="relative">
            <div
              onClick={() => openSelection("B")}
              className="bg-white dark:bg-slate-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl h-64 md:h-80 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/10 transition-all group"
            >
              {brandB ? (
                <>
                  <div className="h-48 mb-4">
                    <img
                      src={`${STORAGE_URL}/${brandB.image}`}
                      alt={brandB.brand_name}
                      className="h-full object-contain drop-shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{brandB.brand_name}</h3>
                  <p className="text-sm text-gray-500 mt-2">انقر للتغيير</p>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-10 h-10 text-gray-400" />
                  </div>
                  <span className="text-lg font-medium text-gray-500 dark:text-gray-400">اختر قارورة</span>
                  <div className="mt-2 text-sm text-gray-400">القارورة B</div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* Results */}
        {brandA && brandB && hasCompared && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-500">
            <ComparisonResults
              brandA={brandA}
              brandB={brandB}
              onRequireLogin={() => setShowLoginPrompt(true)}
            />
          </div>
        )}

      </div>

      {/* Bottom Ad */}
      {ads.length > 1 && <AdsCard ad={ads[1]} />}

      {/* Modal */}
      <BrandSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectBrand}
        excludeBrandId={activeSlot === "A" ? brandB?.id : brandA?.id}
      />

      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
      />
    </div>
  );
}
