import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "@/components/ui/theme-provider";
import { SEO } from "@/components/layout/seo";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { authService } from "@/services/auth_services";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/layout/logo";

export default function Login() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Resolve system theme if needed
  const resolvedTheme = theme === "system"
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      const payload = response.data;

      let token: string;
      if ("token" in payload && typeof payload.token === "object") {
        token = payload.token.token;
      } else {
        // @ts-ignore
        token = payload.token;
      }

      localStorage.setItem("auth_token", token);

      if ("client" in payload) {
        localStorage.setItem("user_data", JSON.stringify(payload.client));
      }

      toast.success("تم تسجيل الدخول", {
        description: response.message || "أهلاً بك مجدداً في ALMAA",
        duration: 3000
      });
      setTimeout(() => navigate("/compare"), 1500);
    } catch (error: any) {
      toast.error("فشل تسجيل الدخول", {
        description: "كتبت البريد الإلكتروني أو كلمة المرور بشكل خاطئ"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-4">
      <SEO
        title="تسجيل الدخول | ALMAA"
        description="قم بتسجيل الدخول إلى حسابك في ALMAA للوصول إلى مقارنات كاملة وميزات حصرية."
        keywords="تسجيل دخول, ALMAA, حساب مستخدم"
      />
      <Card className="w-full max-w-md border-none shadow-2xl dark:bg-slate-900">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold text-center">تسجيل الدخول</CardTitle>
          <CardDescription className="text-center">
            أدخل بريدك الإلكتروني لتسجيل الدخول إلى حسابك
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">

          <form onSubmit={handleEmailLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              تسجيل الدخول
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200 dark:border-gray-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-2 text-muted-foreground">
                أو
              </span>
            </div>
          </div>

          <div className="flex justify-center w-full" key={resolvedTheme}>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                if (credentialResponse.credential) {
                  setLoading(true);
                  try {
                    const response = await authService.googleLogin(credentialResponse.credential);
                    const payload = response.data;
                    let actualToken: string;
                    let clientData: any = null;

                    if ("client" in payload) {
                      actualToken = payload.token.token;
                      clientData = payload.client;
                    } else {
                      actualToken = payload.token;
                    }

                    localStorage.setItem("auth_token", actualToken);
                    if (clientData) {
                      localStorage.setItem("user_data", JSON.stringify(clientData));
                    }
                    toast.success("تم تسجيل الدخول", {
                      description: response.message || "تم تسجيل الدخول بواسطة جوجل بنجاح",
                      duration: 3000
                    });
                    setTimeout(() => navigate("/compare"), 1500);
                  } catch (error: any) {
                    console.error("Google Login Backend Error", error);
                    toast.error("فشل تسجيل الدخول", {
                      description: error.response?.data?.message || "فشل تسجيل الدخول بواسطة جوجل"
                    });
                  } finally {
                    setLoading(false);
                  }
                }
              }}
              onError={() => {
                toast.error("فشل تسجيل الدخول", {
                  description: "حدث خطأ أثناء الاتصال بحساب جوجل"
                });
                setLoading(false);
              }}
              useOneTap
              shape="pill"
              width="280"
              theme={resolvedTheme === "dark" ? "filled_black" : "outline"}
              text="signin_with"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center">
          <div className="text-sm text-muted-foreground">
            ليس لديك حساب؟{" "}
            <Link to="/register" className="text-blue-600 hover:underline font-semibold">
              إنشاء حساب جديد
            </Link>
          </div>
          <Link to="/" className="text-sm text-gray-500 hover:underline">
            العودة للرئيسية
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
