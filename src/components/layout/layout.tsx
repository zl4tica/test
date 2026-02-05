import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Header from "./header";
import HeaderMobile from "./header_mobile";

export default function Layout() {
  return (
    <>
      <Header/>
      <main className="min-h-screen w-screen">
        <Outlet />
      </main>
      <HeaderMobile/>
      <Toaster position="top-right" richColors closeButton expand={true} />
    </>
  );
}
