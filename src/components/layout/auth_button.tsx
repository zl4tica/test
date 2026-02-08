import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import { authService } from "@/services/auth_services";
import { toast } from "sonner";

export default function AuthButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    if (token) {
      setIsAuthenticated(true);
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setUserName(`${user.first_name || ""} ${user.last_name || ""}`.trim() || "المستخدم");
        } catch {
          setUserName("المستخدم");
        }
      } else {
        setUserName("المستخدم");
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      setIsAuthenticated(false);
      toast.success("تم تسجيل الخروج بنجاح");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Clear local storage anyway
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      setIsAuthenticated(false);
      navigate("/");
    }
  };

  if (!isAuthenticated) {
    return (
      <NavLink to="/login">
        <Button
          variant="ghost"
          className="rounded-full px-6 bg-blue-500 text-white shadow-2xl hover:translate-y-px hover:bg-blue-700 hover:text-white hover:shadow-2xl"
        >
          تسجيل الدخول
        </Button>
      </NavLink>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full px-6 bg-blue-500 text-white shadow-2xl hover:translate-y-px hover:bg-blue-700 hover:text-white hover:shadow-2xl"
        >
          <User className="ml-2 h-4 w-4" />
          {userName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-slate-900 border-gray-200 dark:border-gray-800">
        <DropdownMenuLabel>حسابي</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
          <User className="ml-2 h-4 w-4" />
          الملف الشخصي
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="ml-2 h-4 w-4" />
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
