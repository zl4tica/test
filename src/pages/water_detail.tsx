import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { waterService } from "@/services/waterService";
import { reviewService } from "@/services/reviewService";
import { type WaterBrand, type Review } from "@/lib/api_types";
import { STORAGE_URL } from "@/lib/apiConfig";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Star, Send } from "lucide-react";
import AdsCard from "@/components/ads_card";
import { adsService } from "@/services/adsService";
import { toast } from "sonner";
import LoginPromptModal from "@/components/login_prompt_modal";

export default function WaterDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [brand, setBrand] = useState<WaterBrand | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [ads, setAds] = useState<any[]>([]);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const [brandData, reviewsData, adsData] = await Promise.all([
                    waterService.getBrandById(Number(id)),
                    reviewService.getReviewsByWaterId(Number(id)),
                    adsService.getAds()
                ]);
                setBrand(brandData);
                setReviews(reviewsData);
                setAds(adsData);
            } catch (error) {
                console.error("Error fetching water detail data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        window.scrollTo(0, 0);
    }, [id]);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check authentication
        const isAuthenticated = localStorage.getItem("auth_token") !== null;
        if (!isAuthenticated) {
            setShowLoginPrompt(true);
            return;
        }

        if (rating === 0) {
            toast.error("يرجى اختيار تقييم");
            return;
        }
        if (!comment.trim()) {
            toast.error("يرجى كتابة تعليق");
            return;
        }

        setSubmitting(true);
        try {
            await reviewService.addReview(Number(id), rating, comment);
            toast.success("تم إضافة تقييمك بنجاح");
            setComment("");
            setRating(0);
            // Refresh reviews
            const reviewsData = await reviewService.getReviewsByWaterId(Number(id));
            setReviews(reviewsData);
        } catch (error) {
            toast.error("حدث خطأ أثناء إضافة التقييم");
        } finally {
            setSubmitting(false);
        }
    };

    const handleCompare = () => {
        navigate(`/compare?brandA=${id}`);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Skeleton className="h-64 w-full rounded-3xl mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Skeleton className="h-96 rounded-3xl" />
                    <Skeleton className="h-96 rounded-3xl" />
                </div>
            </div>
        );
    }

    if (!brand) return <div className="text-center py-20">العلامة التجارية غير موجودة</div>;

    return (
        <div className="bg-gray-50 dark:bg-slate-950 min-h-screen pb-20">
            {/* Top Ad */}
            {ads.length > 0 && (
                <div className="pt-8">
                    <AdsCard ad={ads[0]} />
                </div>
            )}

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">
                    حول العلامة التجارية
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Left Column: Info */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-6 dark:text-white text-right font-noto">
                                {brand.brand_name}
                            </h2>
                            <div className="flex flex-col gap-1 items-end mb-6">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-4 text-right">
                                <p className="text-gray-600 dark:text-gray-400">
                                    <span className="font-bold text-gray-800 dark:text-gray-200 ml-2">اسم العلامة التجارية :</span>
                                    {brand.brand_name}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    <span className="font-bold text-gray-800 dark:text-gray-200 ml-2">نوع المياه :</span>
                                    {brand.type?.name || "معدنية طبيعية"}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    <span className="font-bold text-gray-800 dark:text-gray-200 ml-2">فوارة :</span>
                                    {brand.sparkling ? "نعم" : "لا"}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    <span className="font-bold text-gray-800 dark:text-gray-200 ml-2">الحجم المتاح :</span>
                                    {brand.sizes?.map(s => s.size).join(', ') || "0.33L PET, 0.5L PET, 1.5L PET, 5L PET, 18L PET"}
                                </p>
                            </div>

                            <Button
                                onClick={handleCompare}
                                className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white rounded-xl h-12 text-lg"
                            >
                                قارن
                            </Button>
                        </div>

                        {/* Dynamic Ad instead of placeholder */}
                        {ads.length > 0 && (
                            <div className="mt-6">
                                <AdsCard ad={ads[3] || ads[0]} />
                            </div>
                        )}
                    </div>

                    {/* Right Column: Image */}
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center min-h-[400px]">
                        <img
                            src={`${STORAGE_URL}/${brand.image}`}
                            alt={brand.brand_name}
                            className="max-h-96 w-auto object-contain drop-shadow-xl"
                        />
                    </div>
                </div>

                {/* Composition Table */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-12">
                    <table className="w-full text-right">
                        <thead className="bg-gray-50 dark:bg-gray-900/50">
                            <tr>
                                <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-200">التركيب</th>
                                <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-200">ملجم/لتر</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {[
                                { label: "الكلوريد", value: brand.chemistry?.chlorure, default: 81 },
                                { label: "النترات", value: brand.chemistry?.nitrates, default: 15 },
                                { label: "النيتريت", value: brand.chemistry?.nitrites, default: 0 },
                                { label: "البقايا عند 180°", value: brand.chemistry?.residues, default: 478 },
                                { label: "PH", value: brand.chemistry?.ph, default: 7.5 },
                                { label: "الكالسيوم", value: brand.chemistry?.calcium, default: 68 },
                                { label: "المغنيسيوم", value: brand.chemistry?.magnesium, default: 50 },
                                { label: "البوتاسيوم", value: brand.chemistry?.potassium, default: 2 },
                                { label: "الصوديوم", value: brand.chemistry?.sodium, default: 58 },
                                { label: "البيكربونات", value: brand.chemistry?.bicarbonate, default: 376 },
                                { label: "الكبريتات", value: brand.chemistry?.sulphate, default: 65 }
                            ].map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.label}</td>
                                    <td className="px-6 py-4 text-gray-800 dark:text-white font-medium">{item.value ?? item.default}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Middle Ad */}
                {ads.length > 1 && (
                    <div className="mb-12">
                        <AdsCard ad={ads[1]} />
                    </div>
                )}

                {/* Reviews Section */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-8 flex-row-reverse">
                        <h2 className="text-2xl font-bold dark:text-white">التقييمات</h2>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="rounded-full bg-blue-500 text-white border-none px-4">الكل (1)</Button>
                            {[5, 4, 3, 2, 1].map(num => (
                                <Button key={num} variant="outline" size="sm" className="rounded-full gap-1 dark:text-white">
                                    <span>({num === 5 ? 0 : num === 4 ? 1 : 0})</span> {num} <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {reviews.length > 0 ? reviews.map(review => (
                            <div key={review.id} className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-right">
                                <div className="flex items-start justify-between flex-row-reverse">
                                    <div className="flex gap-4 items-center flex-row-reverse">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                                            {review.client.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h4 className="font-bold dark:text-white">{review.client}</h4>
                                            <div className="flex gap-1 justify-end mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-gray-400 text-sm">{review.date.short}</span>
                                </div>
                                <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {review.content}
                                </p>
                            </div>
                        )) : (
                            <p className="text-center text-gray-500 py-12">لا توجد تقييمات بعد</p>
                        )}
                    </div>
                </div>

                {/* Add Review Form */}
                <div className="bg-blue-50 dark:bg-blue-950/20 p-8 rounded-3xl border border-blue-100 dark:border-blue-900/50">
                    <h3 className="text-xl font-bold mb-6 text-right dark:text-white">أضف تقييمك</h3>
                    <div className="flex items-center justify-end gap-2 mb-6">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">التقييم:</span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(num => (
                                <button
                                    key={num}
                                    onClick={() => setRating(num)}
                                    className="hover:scale-110 transition-transform"
                                >
                                    <Star className={`w-8 h-8 ${num <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleReviewSubmit}>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="شارك تقييمك مع الآخرين..."
                            className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 text-right min-h-[150px] border border-blue-100 dark:border-blue-900/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-white"
                        />
                        <div className="mt-6 flex justify-start">
                            <Button
                                type="submit"
                                disabled={submitting}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-8 h-12 rounded-xl flex items-center gap-2"
                            >
                                إرسال <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Bottom Ad */}
                {ads.length > 2 && (
                    <div className="mt-12">
                        <AdsCard ad={ads[2]} />
                    </div>
                )}
            </div>

            <LoginPromptModal
                isOpen={showLoginPrompt}
                onClose={() => setShowLoginPrompt(false)}
            />
        </div>
    );
}
