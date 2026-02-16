import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "blue" | "white";
  className?: string;
}

export default function Logo({ variant = "blue", className }: LogoProps) {
  const isWhite = variant === "white";

  return (
    <NavLink to="/" className={cn("flex items-center gap-2", className)}>
      <div className="flex h-10 w-10 items-center justify-center">
        <img
          src="/logo.png"
          alt="ALMAA Logo"
          className={cn(
            "h-8 w-8 object-contain transition-opacity duration-300",
            isWhite ? "brightness-0 invert" : ""
          )}
        />
      </div>
      <span className={cn(
        "text-xs font-bold uppercase tracking-wider transition-colors duration-300",
        isWhite ? "text-white" : "text-blue-400"
      )}>
        ALMAA
      </span>
    </NavLink>
  );
}
