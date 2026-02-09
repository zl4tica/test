import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { STORAGE_URL } from "@/lib/apiConfig";
import { postService } from "@/services/postService";
import { type Post } from "@/lib/api_types";
import { Skeleton } from "@/components/ui/skeleton";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getLatestPosts();
        // Limit to 3 posts
        setPosts(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center dark:text-white">جديد المدونة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
              <Skeleton className="h-48 w-full" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-2/3 mb-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-slate-900/50 rounded-3xl my-12" dir="rtl">
      <div className="flex justify-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold dark:text-white">
          نصائح ومقالات
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="group">
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 h-full flex flex-col">
              {post.image && (
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={`${STORAGE_URL}${post.image}`}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1 text-right">
                <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3 items-center">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-blue-500" />
                    <span>{post.date.short}</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                  {post.content.replace(/<[^>]*>/g, '')}
                </p>
                <div className="text-blue-600 font-medium text-sm mt-auto inline-flex items-center gap-1 justify-end">
                  اقرأ المزيد <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          to="/blog"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95"
        >
          عرض الجميع <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
