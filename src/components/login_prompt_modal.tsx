import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

interface LoginPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginPromptModal({ isOpen, onClose }: LoginPromptModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-none shadow-2xl rounded-3xl p-8 flex flex-col items-center text-center">

                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
                    <Lock className="w-8 h-8 text-blue-500" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-relaxed">
                    يرجى تسجيل الدخول للاستفادة من كل مزايا التطبيق وعدد مقارنات غير محدود
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    التسجيل مجاني الآن وسريع
                </p>

                <div className="w-full space-y-4">
                    <Link
                        to="/login"
                        className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30"
                    >
                        تسجيل الدخول
                    </Link>

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        ليس لديك حساب؟{" "}
                        <Link to="/register" className="text-blue-500 font-bold hover:underline">
                            إنشاء حساب جديد
                        </Link>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
}
