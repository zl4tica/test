import { Shield, Target, Users, Globe, BookOpen, MessageSquare, Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/layout/logo";
import { toast } from "sonner";
import { useState } from "react";

export default function About() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simply show a success toast as requested
    toast.success("تم إرسال الرسالة", {
      description: "شكراً لتواصلك معنا! سنقوم بالرد على رسالتك في أقرب وقت."
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-blue-600">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl">
              <Logo variant="white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            عن منصة إلما (ALMAA)
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            بوابتك الشفافة والموثوقة لمقارنة مياه الشرب واستكشاف عالم الصحة والترطيب في الجزائر.
          </p>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,113.84,115.11,120,131.48,120c82.39,0,143.25-13.17,189.91-32.93Z" className="fill-white dark:fill-slate-950"></path>
          </svg>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-right order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                <Target className="w-4 h-4" />
                <span>مهمتنا ورؤيتنا</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                نسعى لتمكين المستهلك الجزائري من اتخاذ قرارات صحية مستنيرة
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                في إلما، نؤمن أن الماء هو أساس الحياة، وأن الشفافية هي حق لكل مستهلك. مهمتنا هي توفير منصة موحدة تجمع كافة المعلومات المتعلقة بالعلامات التجارية لمنتجي مياه الشرب في الجزائر، وتقديمها بأسلوب بسيط، علمي، وسهل المقارنة.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">رؤيتنا</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                    أن نصبح المرجع الأول والملهم في قطاع مياه الشرب والصحة والرفاهية في الجزائر والمنطقة.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-gray-800 shadow-sm">
                  <h3 className="text-xl font-bold text-blue-600 mb-2">قيمنا</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm italic">
                    الشفافية، المصداقية، الدقة المعلوماتية، والتركيز المطلق على مصلحة المستهلك.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative order-1 md:order-2">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=1000&auto=format&fit=crop"
                  alt="Healthy water"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 hidden lg:block">
                <p className="text-4xl font-bold text-blue-600">100%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">شفافية المعلومات</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm">
              <Users className="w-4 h-4" />
              <span>لماذا تستخدم إلما؟</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              خدماتنا مصممة خصيصاً لاحتياجاتك
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              نحن نوفر لك الأدوات اللازمة لفهم ما تشربه وكيف تؤثر تركيبة المياه على صحتك.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
            {/* Feature 1 */}
            <div className="group bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">أكبر قاعدة بيانات</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                نجمع معلومات مفصلة عن أغلب العلامات التجارية للمياه المعبأة في الجزائر، ونقوم بتحديثها بانتظام لضمان دقتها.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">مقارنة ذكية</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                أداة مقارنة متطورة تسمح لك باختيار عدة علامات تجارية والمقارنة بين خصائصها الكيميائية والفيزيائية جنباً إلى جنب.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">آراء المجتمع</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                اقرأ آراء وتجارب المستخدمين الآخرين وساهم بتقييمك لتساعد المجتمع في اختيار الأفضل له.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center text-white">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold">من أين تأتي بياناتنا؟</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">المصادر الرسمية</h4>
                    <p className="text-blue-100 text-sm">
                      تؤخذ البيانات مباشرة من الملصقات المطبوعة على الزجاجات، ومن المنشورات الرسمية للمنتجين والهيئات الرقابية.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">الدقة والمراجعة</h4>
                    <p className="text-blue-100 text-sm">
                      نقوم بمراجعة البيانات بشكل دوري وتحديثها لمواكبة أي تغييرات في تركيبة المياه أو دخول علامات تجارية جديدة للسوق.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-8 text-right">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">تواصل معنا</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  هل لديك اقتراح؟ أو علامة تجارية لم تجدها؟ أو استفسار بخصوص البيانات؟ نحن نسعد بسماع صوتك.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 justify-end">
                    <span className="text-gray-700 dark:text-gray-300">contact@rivuxo.dz</span>
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">
                      <Mail className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 justify-end">
                    <span className="text-gray-700 dark:text-gray-300">044073205</span>
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">
                      <Phone className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 justify-end">
                    <span className="text-gray-700 dark:text-gray-300 text-left">Cite 200 lots sidi menif Bt 56/3, Zéralda 16063</span>
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
                <form onSubmit={handleSubmit} className="space-y-4 text-right">
                  <div className="space-y-2">
                    <label className="text-sm font-medium pr-1">الاسم بالكامل</label>
                    <input
                      type="text"
                      placeholder="أدخل اسمك"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium pr-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium pr-1">الرسالة</label>
                    <textarea
                      rows={4}
                      placeholder="كيف يمكننا مساعدتك؟"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all active:scale-95">
                    إرسال الرسالة
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
