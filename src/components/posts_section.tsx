
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
    <section className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-slate-900/50 rounded-3xl my-12">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl md:text-3xl font-bold dark:text-white">
          نصائح ومقالات
        </h2>
        <Link to="/blog" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
          عرض الجميع <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} to={`/ blog / ${post.id} `} className="group">
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 h-full flex flex-col">
              {post.image && (
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={`${STORAGE_URL}${post.image} `}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs text-blue-500 mb-2 font-medium">
                  {new Date(post.created_at).toLocaleDateString("ar-EG")}
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                  {post.content}
                </p>
                <div className="text-blue-600 font-medium text-sm mt-auto inline-flex items-center gap-1">
                  اقرأ المزيد <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
