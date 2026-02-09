import { NavLink } from "react-router-dom";


export default function HeaderMobile() {
  const navLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "قارن الآن", href: "/compare" },
    { label: "حول المنصة", href: "/about" },
    { label: "المدونة", href: "/blog" },
  ];

  return (
    <header className="md:hidden">
      <div>
        <nav
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50
        border border-blue-400 bg-background/90 backdrop-blur-md
        rounded-full px-6 py-3
        flex justify-between items-center
        w-11/12 max-w-sm
        shadow-2xl dark:shadow-white/15"
        >
          {navLinks.map((link) => (
            <NavLink
              to={link.href}
              end={link.href === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs px-3 py-1.5
     ${isActive ? "text-blue-500" : "text-gray-500"}`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="transition-all duration-300 group-hover:[text-shadow:0_0_6px_rgba(59,130,246,0.6)] font-medium">
                    {link.label}
                  </span>

                  <span
                    className={`mt-1 h-1 w-1 rounded-full bg-blue-500 transition-all
        ${isActive ? "opacity-100" : "opacity-0"}`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
