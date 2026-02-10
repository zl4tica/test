import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postService } from "@/services/postService";
import { type Post } from "@/lib/api_types";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User, Share2, Facebook, Twitter, Link as LinkIcon, ArrowRight } from "lucide-react";
import { STORAGE_URL } from "@/lib/apiConfig";
import { SEO } from "@/components/layout/seo";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Post() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await postService.getPostById(Number(id));
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post", error);
        toast.error("حدث خطأ أثناء تحميل المقال");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = async (platform: string) => {
    const url = window.location.href;
    const title = post?.title || "مقال من إلما";

    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        return;
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleShare('copy');
        }
        return;
      }
    }

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'native':
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success("تم نسخ الرابط بنجاح");
        break;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl" dir="rtl">
        <Skeleton className="h-[400px] w-full rounded-3xl mb-8" />
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-10 w-3/4 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center" dir="rtl">
        <h2 className="text-2xl font-bold mb-4">المقال غير موجود</h2>
        <Button onClick={() => navigate("/blog")} variant="outline">العودة للمدونة</Button>
      </div>
    );
  }

  return (
    <article className="bg-white dark:bg-slate-950 min-h-screen pb-20" dir="rtl">
      <SEO
        title={`${post.title} | مدونة ALMAA`}
        description={post.content.substring(0, 160)}
        keywords="مدونة مياه, نصائح صحية, ALMAA, مياه شرب"
      />
      {/* Hero Image Section */}
      <div className="container mx-auto px-4 pt-8 max-w-5xl">
        <div className="relative h-[300px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800">
          <img
            src={post.image ? `${STORAGE_URL}${post.image}` : "/placeholder-post.jpg"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Meta & Share Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 bg-gray-50/50 dark:bg-slate-900/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4 text-right">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">
              <User className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-lg">System Administrator</h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1 justify-end">
                {post.date.short} <Calendar className="w-3 h-3" />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-medium ml-2">مشاركة:</span>
            <button
              onClick={() => handleShare('facebook')}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
              title="مشاركة على فيسبوك"
            >
              <Facebook className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
              title="مشاركة على تويتر"
            >
              <Twitter className="w-5 h-5 fill-current" />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transfer-all"
              title="نسخ الرابط"
            >
              <LinkIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleShare('native')}
              className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              title="مشاركة"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="text-right">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-10 leading-tight">
            {post.title}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-[1.8] space-y-6">
            {post.content.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <Button
            onClick={() => navigate("/blog")}
            variant="ghost"
            className="text-blue-500 hover:text-blue-600 font-bold gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> العودة للمدونة
          </Button>
        </div>
      </div>
    </article>
  );
}
