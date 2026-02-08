import { Link } from "react-router-dom";
import { Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-600 dark:bg-blue-950 text-white pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center md:text-right">

          {/* Logo & Description (Right Column in RTL) */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-wider">ALMAA</h2>
            <p className="text-blue-100 leading-relaxed text-sm max-w-xs mx-auto md:mx-0">
              طريقة بسيطة وشفافة لمقارنة المياه المعبأة. تؤخذ البيانات مباشرة من ملصقات المنتجات والمصادر الرسمية
            </p>
            <div className="flex gap-4 justify-center md:justify-start pt-2">
              <a href="#" className="hover:text-blue-200 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              {/* TikTok Icon replacement since Lucide might not have it, using generic or just keeping existing social logic but styled */}
              {/* Assuming user wants what's in image, let's stick to standard available icons for now or import specific if needed. 
                     Image showed FB and maybe TikTok/LinkedIn. I'll use what I have. */}
              <a href="#" className="hover:text-blue-200 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Pages (Center Column) */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">الصفحات</h3>
            <ul className="space-y-3 text-blue-100 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">الرئيسية</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">مدونة</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">مقارنة</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">معلومات</Link></li>
            </ul>
          </div>

          {/* Connect (Left Column) */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-6">تواصل معنا</h3>

            <div className="space-y-2 text-blue-100 text-sm">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span>البريد الإلكتروني: contact@rivuxo.dz</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span>الهاتف: 044073205</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span>العنوان: Cite 200 lots sidi menif Bt 56/3, Zéralda 16063</span>
              </div>
            </div>

            <div className="pt-4 space-y-2 text-blue-100 text-sm">
              <div><Link to="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link></div>
              <div><Link to="/terms" className="hover:text-white transition-colors">شروط الخدمة</Link></div>
            </div>
          </div>

        </div>

        <div className="border-t border-blue-500/30 pt-8 text-center">
          <p className="text-blue-200 text-sm">
            Rivuxo All rights reserved 2026 ©
          </p>
        </div>
      </div>
    </footer>
  );
}
