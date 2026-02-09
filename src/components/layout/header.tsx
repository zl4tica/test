import { NavLink } from "react-router-dom";
import AuthButton from "./auth_button";
import Logo from "./logo";
import { ModeToggle } from "./mode_toggle";

export default function Header() {
  const navLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "قارن الآن", href: "/compare" },
    { label: "حول المنصة", href: "/about" },
    { label: "المدونة", href: "/blog" },
  ];

  return (
    <header className="w-full px-4 py-4 hidden md:block" dir="rtl">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between rounded-full border-2 border-blue-400 bg-background px-6 py-4 shadow-xl dark:shadow-white/15">
          {/* Logo */}
          <Logo />
          {/* Navigation Links */}
          <ul className="items-center gap-12 flex">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.href}
                  className="font-medium transition-all duration-300 relative group hover:text-blue-400 text-blue-500 drop-active"
                >
                  <span className="transition-all duration-300 group-hover:[text-shadow:0_0_6px_rgba(59,130,246,0.6)]">
                    {link.label}
                  </span>
                  <span className="underline-span absolute -bottom-1 right-0 h-0.5 bg-blue-400 w-0 group-hover:w-full transition-all duration-300" />
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 md:gap-4">
            <ModeToggle />
            <AuthButton />
          </div>
        </nav>
      </div>
    </header>
  );
}

Header;
