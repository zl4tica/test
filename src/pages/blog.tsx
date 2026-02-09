import { useEffect, useState } from "react";
import { postService } from "@/services/postService";
import { type Post } from "@/lib/api_types";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Pagination from "@/components/pagination";
import { STORAGE_URL } from "@/lib/apiConfig";
import AdsCard from "@/components/ads_card";
import { adsService } from "@/services/adsService";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [currentPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postsResponse, adsData] = await Promise.all([
        postService.getPaginatedPosts(currentPage, perPage),
        adsService.getAds()
      ]);
      setPosts(postsResponse.data);
      setLastPage(postsResponse.pagination.last_page);
      setAds(adsData);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen pb-20" dir="rtl">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            المدونة التعليمية
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            اكتشف آخر المقالات والنصائح حول جودة المياه واختيار العلامات التجارية الأنسب لك ولعائلتك.
          </p>
        </div>

        {/* Top Ad */}
        {ads.length > 0 && (
          <div className="mb-12">
            <AdsCard ad={ads[0]} />
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
                <Skeleton className="h-64 w-full" />
                <div className="p-8 space-y-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-8 w-3/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                  <Skeleton className="h-10 w-32 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Blogs List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image ? `${STORAGE_URL}${post.image}` : "/placeholder-post.jpg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      مقالات
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col items-start text-right">
                    <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4 items-center">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>{post.date.short}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4 text-blue-500" />
                        <span>المشرف</span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-500 transition-colors leading-tight w-full">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 line-clamp-3 w-full">
                      {post.content.replace(/<[^>]*>/g, '')}
                    </p>
                    <div className="mt-auto pt-4 w-full flex justify-end">
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-blue-500 font-bold hover:gap-3 transition-all"
                      >
                        اقرأ المزيد <ArrowRight className="w-4 h-4 rotate-180" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination - Under Blogs List, only if more than 1 page */}
            {!loading && lastPage > 1 && (
              <div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 py-2">
                <Pagination
                  currentPage={currentPage}
                  lastPage={lastPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {/* Bottom Ad - Under Pagination */}
            {ads.length > 1 && (
              <div className="mt-12">
                <AdsCard ad={ads[1]} />
              </div>
            )}
          </>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">لا توجد مقالات حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
}
