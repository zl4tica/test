import { type WaterBrand } from "@/lib/api_types";


interface ComparisonResultsProps {
    brandA: WaterBrand;
    brandB: WaterBrand;
    comparisonData?: any; // If the API returns specific comparison logic/diff, otherwise we just compare locally
}

export default function ComparisonResults({ brandA, brandB }: ComparisonResultsProps) {

    // Helper to format values
    const formatValue = (val: number | undefined) => val ? val.toFixed(1) : "-";

    const properties = [
        { key: "ph", label: "PH 0", unit: "" },
        { key: "calcium", label: "الكالسيوم", unit: "مجم/لتر" },
        { key: "magnesium", label: "المغنيسيوم", unit: "مجم/لتر" },
        { key: "potassium", label: "البوتاسيوم", unit: "مجم/لتر" },
        { key: "sodium", label: "الصوديوم", unit: "مجم/لتر" },
        { key: "bicarbonate", label: "البيكربونات", unit: "مجم/لتر" },
        { key: "sulphate", label: "الكبريتات", unit: "مجم/لتر" },
        { key: "chlorure", label: "الكلورور", unit: "مجم/لتر" },
        { key: "nitrates", label: "النترات", unit: "مجم/لتر" },
        { key: "nitrites", label: "النيتريت", unit: "مجم/لتر" },
        { key: "residues", label: "البقايا عند 180°", unit: "مجم/لتر" },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            {/* Header Images - Removed per request */}
            {/* <div className="grid grid-cols-2 border-b border-gray-100 dark:border-gray-800">
                <div className="p-8 flex flex-col items-center border-l dark:border-gray-800">
                     ...
                </div>
                <div className="p-8 flex flex-col items-center">
                    ...
                </div>
            </div> */}

            {/* Table Header */}
            <div className="grid grid-cols-3 bg-gray-50 dark:bg-slate-950 py-3 px-4 font-medium text-gray-500 dark:text-gray-400 text-sm">
                <div className="text-center">{brandA.brand_name}</div>
                <div className="text-center">التركيب</div>
                <div className="text-center">{brandB.brand_name}</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {properties.map((prop) => {
                    // @ts-ignore
                    const valA = brandA.chemistry?.[prop.key];
                    // @ts-ignore
                    const valB = brandB.chemistry?.[prop.key];

                    return (
                        <div key={prop.key} className="grid grid-cols-3 py-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="text-center font-semibold text-gray-800 dark:text-gray-200">
                                {formatValue(valA)}
                            </div>
                            <div className="text-center text-gray-500 dark:text-gray-400 text-sm flex flex-col items-center justify-center">
                                <span>{prop.label}</span>
                                {/* <span className="text-xs opacity-50">{prop.unit}</span> */}
                            </div>
                            <div className="text-center font-semibold text-gray-800 dark:text-gray-200">
                                {formatValue(valB)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
