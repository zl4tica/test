import { Droplet } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink to="/" className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center">
        <Droplet className="h-6 w-6 fill-blue-400 text-blue-400" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
        ALMAA
      </span>
    </NavLink>
  );
}
