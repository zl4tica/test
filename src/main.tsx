import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DirectionProvider } from "@/components/ui/direction";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <DirectionProvider dir="rtl">
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </DirectionProvider>,
);
