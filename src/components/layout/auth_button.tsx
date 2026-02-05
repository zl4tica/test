import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

export default function AuthButton() {
  return (
    <NavLink to="/login">
      <Button
        variant="ghost"
        className="
        rounded-full px-6 bg-blue-500  text-white shadow-2xl hover:translate-y-px hover:bg-blue-700 hover:text-white hover:shadow-2xl"
      >
        تسجيل الدخول
      </Button>
    </NavLink>
  );
}
