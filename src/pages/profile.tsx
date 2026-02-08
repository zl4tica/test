import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { profileService } from "@/services/profileService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/layout/logo";

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // Profile data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Password data
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const response = await profileService.getProfile();
        const userData = response.data;
        setFirstName(userData.first_name || "");
        setLastName(userData.last_name || "");
      } catch (error: any) {
        console.error("Failed to fetch profile:", error);
        toast.error("فشل تحميل بيانات الملف الشخصي");
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await profileService.updateProfile({
        first_name: firstName,
        last_name: lastName,
      });

      // Update localStorage with new data
      const userData = response.data;
      localStorage.setItem("user_data", JSON.stringify(userData));

      toast.success("تم تحديث الملف الشخصي بنجاح");
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error.response?.data?.message || "فشل تحديث الملف الشخصي");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("كلمة المرور الجديدة غير متطابقة");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return;
    }

    setLoading(true);

    try {
      await profileService.updatePassword({
        old_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });

      toast.success("تم تحديث كلمة المرور بنجاح");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Password update error:", error);
      toast.error(error.response?.data?.message || "فشل تحديث كلمة المرور");
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Personal Information Card */}
        <Card className="border-none shadow-2xl dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">الملف الشخصي</CardTitle>
            <CardDescription className="text-center">
              قم بتحديث معلوماتك الشخصية
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">الاسم الأول</Label>
                  <Input
                    id="first_name"
                    type="text"
                    placeholder="الاسم الأول"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">اللقب</Label>
                  <Input
                    id="last_name"
                    type="text"
                    placeholder="اللقب"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                type="submit"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                تحديث المعلومات
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password Change Card */}
        <Card className="border-none shadow-2xl dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-xl font-bold">تغيير كلمة المرور</CardTitle>
            <CardDescription>
              قم بتحديث كلمة المرور الخاصة بك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current_password">كلمة المرور الحالية</Label>
                <Input
                  id="current_password"
                  type="password"
                  placeholder="كلمة المرور الحالية"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="new_password">كلمة المرور الجديدة</Label>
                <Input
                  id="new_password"
                  type="password"
                  placeholder="كلمة المرور الجديدة (8 أحرف على الأقل)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm_password">تأكيد كلمة المرور الجديدة</Label>
                <Input
                  id="confirm_password"
                  type="password"
                  placeholder="تأكيد كلمة المرور الجديدة"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                type="submit"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                تحديث كلمة المرور
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700"
          >
            العودة للرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
}
