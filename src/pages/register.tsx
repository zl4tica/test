import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { authService } from "@/services/auth_services";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/layout/logo";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      toast.error("خطأ في التحقق", {
        description: "كلمتا المرور غير متطابقتين"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await authService.register({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: passwordConfirmation
      });

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

      toast.success("تم إنشاء الحساب", {
        description: response.message || "أهلاً بك في ALMAA! تم إنشاء حسابك بنجاح",
        duration: 3000
      });
      setTimeout(() => navigate("/compare"), 1500);
    } catch (error: any) {
      toast.error("فشل إنشاء الحساب", {
        description: error.response?.data?.message || "حدث خطأ أثناء محاولة إنشاء الحساب"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-4">
      <Card className="w-full max-w-md border-none shadow-2xl dark:bg-slate-900">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold text-center">إنشاء حساب جديد</CardTitle>
          <CardDescription className="text-center">
            أنشئ حسابك للاستفادة من كافة خدماتنا
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">

          <form onSubmit={handleEmailRegister} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first_name">الاسم الأول</Label>
                <Input
                  id="first_name"
                  placeholder="الاسم"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last_name">اللقب</Label>
                <Input
                  id="last_name"
                  placeholder="اللقب"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
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
            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">تأكيد كلمة المرور</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              تسجيل حساب جديد
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

          {/* Google Login Component */}
          <div className="flex justify-center w-full">
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
                      description: "تم تسجيل الدخول بواسطة جوجل بنجاح"
                    });
                    navigate("/profile");
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
              width="100%"
              text="signup_with"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 text-center">
          <div className="text-sm text-muted-foreground">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-semibold">
              تسجيل الدخول
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
