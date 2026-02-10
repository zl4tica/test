import { useEffect, useState } from "react";
import WaterSection from "@/components/water_section";
import CompareCard from "@/components/compare_card";
import AdsCard from "@/components/ads_card";
import Reviews from "@/components/reviews_section";
import Posts from "@/components/posts_section";
import { SEO } from "@/components/layout/seo";
import { adsService } from "@/services/adsService";
import { type Advertisement } from "@/lib/api_types";

export default function Home() {
  const [ads, setAds] = useState<Advertisement[]>([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const data = await adsService.getAds();
        setAds(data);
      } catch (error) {
        console.error("Failed to fetch ads", error);
      }
    };
    fetchAds();
  }, []);

  return (
    <div className="pb-12">
      <SEO
        title="ALMAA | دليل مياه الشرب والماركات العالمية"
        description="استكشف وقارن بين أفضل أنواع مياه الشرب المعبأة. دليل شامل للماركات العالمية والمحلية مع تفاصيل المكونات والتحليلات."
        keywords="مياه شرب, مقارنة مياه, تحليل مياه, ماركات مياه, ALMAA, مياه معبأة"
      />
      {/* 1. First Ad */}
      {ads.length > 0 && <AdsCard ad={ads[0]} />}

      {/* 2. Compare Card */}
      <CompareCard />

      {/* 3. Second Ad */}
      {ads.length > 1 && <AdsCard ad={ads[1]} />}

      {/* 4. Water Brand List */}
      <WaterSection />

      {/* 5. Third Ad */}
      {ads.length > 2 && <AdsCard ad={ads[2]} />}

      {/* 6. Reviews */}
      <Reviews />

      {/* 7. Fourth Ad */}
      {ads.length > 3 && <AdsCard ad={ads[3]} />}

      {/* 8. Posts */}
      <Posts />

      {/* 9. Fifth Ad (before Footer) */}
      {ads.length > 4 && <AdsCard ad={ads[4]} />}
    </div>
  );
}
