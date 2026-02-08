import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Header from "./header";
import HeaderMobile from "./header_mobile";
import Footer from "./footer";

export default function Layout() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50/50 dark:bg-slate-950 font-sans text-right">
      <Header />
      <HeaderMobile />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" richColors closeButton expand={true} />
    </div>
  );
}
