import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/layout/seo";
import { waterService } from "@/services/waterService";
import { type WaterBrand } from "@/lib/api_types";
import { STORAGE_URL } from "@/lib/apiConfig";
import { ArrowLeft, ArrowUp, ArrowDown, Search, Droplets } from "lucide-react";

const properties: Record<string, string> = {
    ph: "PH 0",
    calcium: "الكالسيوم",
    magnesium: "المغنيسيوم",
    potassium: "البوتاسيوم",
    sodium: "الصوديوم",
    bicarbonate: "البيكربونات",
    sulphate: "الكبريتات",
    chlorure: "الكلورور",
    nitrates: "النترات",
    nitrites: "النيتريت",
    residues: "البقايا عند 180°",
};

export default function Ranking() {
    const { component } = useParams<{ component: string }>();
    const navigate = useNavigate();
    const [brands, setBrands] = useState<WaterBrand[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [searchQuery, setSearchQuery] = useState("");

    const componentLabel = component ? properties[component] : "";

    useEffect(() => {
        const fetchAllBrands = async () => {
            setLoading(true);
            // Fetch a large number of brands to act as "all" for frontend ranking
            const response = await waterService.getAllBrands(1, 100);
            setBrands(response.data);
            setLoading(false);
        };

        fetchAllBrands();
    }, []);

    const sortedBrands = [...brands]
        .filter((b) => {
            const matchesSearch = b.brand_name.toLowerCase().includes(searchQuery.toLowerCase());
            // @ts-ignore
            const hasValue = b.chemistry?.[component] !== undefined;
            return matchesSearch && hasValue;
        })
        .sort((a, b) => {
            // @ts-ignore
            const valA = a.chemistry?.[component] || 0;
            // @ts-ignore
            const valB = b.chemistry?.[component] || 0;
            return sortOrder === "desc" ? valB - valA : valA - valB;
        });

    const toggleSort = () => {
        setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    };

    if (!componentLabel) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold dark:text-white">العنصر غير موجود</h1>
                <button onClick={() => navigate(-1)} className="mt-4 text-blue-600">العودة</button>
            </div>
        );
    }

    return (
        <div className="pb-12 bg-gray-50 dark:bg-slate-950 min-h-screen" dir="rtl">
            <SEO
                title={`ترتيب المياه حسب ${componentLabel} | ALMAA`}
                description={`شاهد ترتيب ماركات المياه بناءً على نسبة ${componentLabel}. اكتشف المياه المناسبة لاحتياجاتك الصحية.`}
                keywords={`ترتيب مياه, ${componentLabel}, تحليل مياه, ALMAA`}
            />
            <div className="bg-blue-600 dark:bg-blue-950 py-12 px-4 shadow-lg mb-8">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>العودة للمقارنة</span>
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2 text-right">
                            <h1 className="text-3xl md:text-4xl font-bold text-white">ترتيب المنتجات حسب {componentLabel}</h1>
                            <p className="text-blue-100 italic">اكتشف المياه الأنسب لاحتياجاتك الصحية</p>
                        </div>

                        <div className="flex gap-4">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="بحث عن علامة تجارية..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pr-10 pl-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/30 outline-none transition-all"
                                />
                            </div>
                            <button
                                onClick={toggleSort}
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-blue-600 font-bold shadow-lg hover:bg-blue-50 transition-all active:scale-95"
                            >
                                {sortOrder === "desc" ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
                                <span>{sortOrder === "desc" ? "تنازلي" : "تصاعدي"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    {loading ? (
                        <div className="p-20 text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                            <p className="mt-4 text-gray-500 dark:text-gray-400">جاري تحميل البيانات...</p>
                        </div>
                    ) : sortedBrands.length > 0 ? (
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            <div className="grid grid-cols-4 md:grid-cols-6 items-center px-6 py-4 bg-gray-50 dark:bg-slate-950 text-sm font-bold text-gray-500 dark:text-gray-400 text-right">
                                <div className="col-span-1 text-center md:text-right">#</div>
                                <div className="col-span-2 md:col-span-3">العلامة التجارية</div>
                                <div className="col-span-1 md:col-span-2 text-left md:text-center prose-sm">{componentLabel} (مجم/لتر)</div>
                            </div>
                            {sortedBrands.map((brand, index) => (
                                <div
                                    key={brand.id}
                                    onClick={() => navigate(`/water/${brand.id}`)}
                                    className="grid grid-cols-4 md:grid-cols-6 items-center px-6 py-6 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 cursor-pointer transition-colors group"
                                >
                                    <div className="col-span-1 text-center md:text-right font-mono text-gray-400 dark:text-gray-500 text-lg">
                                        {index + 1}
                                    </div>
                                    <div className="col-span-2 md:col-span-3 flex items-center gap-4 text-right">
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl border border-gray-100 dark:border-gray-800 p-1 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                                            <img
                                                src={`${STORAGE_URL}/${brand.image}`}
                                                alt={brand.brand_name}
                                                className="max-h-full object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{brand.brand_name}</h3>
                                            <p className="text-sm text-gray-500">{brand.source?.place}</p>
                                        </div>
                                    </div>
                                    <div className="col-span-1 md:col-span-2 text-left md:text-center">
                                        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-xl">
                                            <Droplets className="w-4 h-4 text-blue-500" />
                                            <span className="text-xl font-black text-blue-600 dark:text-blue-400">
                                                {/* @ts-ignore */}
                                                {brand.chemistry?.[component]?.toFixed(2) || "0.00"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-20 text-center space-y-4">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-gray-400">
                                <Search className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">لا توجد نتائج مطابقة</h3>
                            <p className="text-gray-500 dark:text-gray-400">حاول البحث باستخدام مصطلح آخر</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
