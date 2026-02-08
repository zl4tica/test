import { useEffect, useState } from "react";
import { reviewService } from "@/services/reviewService";
import { type Review } from "@/lib/api_types";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

import { Link } from "react-router-dom";

// Helper to render stars
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
        />
      ))}
    </div>
  );
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewService.getLatestReviews();
        // Limit to 3 reviews
        setReviews(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center dark:text-white">ماذا يقول عملاؤنا</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="w-4 h-4 rounded-full" />
                  ))}
                </div>
              </div>
              <div className="space-y-2 mt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center dark:text-white">
        ماذا يقول عملاؤنا
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <Link
            key={review.id}
            to={`/water/${review.water.water_id}`}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-4 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center font-bold text-blue-600 dark:text-blue-300 overflow-hidden group-hover:scale-110 transition-transform">
                  {review.client.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold dark:text-gray-200">{review.client}</div>
                  <div className="text-xs text-gray-500">{review.date.short}</div>
                </div>
              </div>
              <StarRating rating={review.rating} />
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">
              "{review.content}"
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
