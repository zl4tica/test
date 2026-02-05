import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DirectionProvider } from "@/components/ui/direction";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <DirectionProvider dir="rtl">
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </DirectionProvider>,
);
