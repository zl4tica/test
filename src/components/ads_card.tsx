
import { useEffect, useState } from "react";
import { STORAGE_URL } from "@/lib/apiConfig";
import { adsService } from "@/services/adsService";
import { type Advertisement } from "@/lib/api_types";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdsCard({ ad: propAd }: { ad?: Advertisement }) {
  const [ad, setAd] = useState<Advertisement | null>(propAd || null);
  const [loading, setLoading] = useState(!propAd);
  // Removed error state as per instruction's implied change

  useEffect(() => {
    if (propAd) {
      setAd(propAd);
      setLoading(false);
      return;
    }

    const fetchAd = async () => {
      try {
        const ads = await adsService.getAds();
        if (ads.length > 0) {
          setAd(ads[0]);
        }
      } catch (error) {
        console.error("Failed to fetch ad", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [propAd]);

  const handleClick = async () => {
    if (ad) {
      // Removed try/catch as per instruction's implied change
      await adsService.trackClick(ad.id);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 mb-12">
        <Skeleton className="w-full h-48 md:h-64 rounded-3xl" />
      </div>
    );
  }

  if (!ad) {
    // Only show if we finished loading and found nothing
    if (propAd === undefined && !loading) return null;

    return (
      <div className="w-full h-[300px] bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center rounded-xl text-gray-400 dark:text-gray-500 hidden">
        {/* Hidden to avoid ugly empty boxes if no ad */}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <a
        href={ad.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="block rounded-xl overflow-hidden"
      >
        <div className="h-64 w-full flex items-center justify-center">
          <img
            src={`${STORAGE_URL}${ad.image} `}
            alt={ad.title}
            className="max-w-full max-h-full object-contain drop-shadow-sm"
          />
        </div>
      </a>
    </div>
  );
}
