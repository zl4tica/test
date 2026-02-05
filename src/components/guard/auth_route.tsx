import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const isAuthenticated = localStorage.getItem("auth_token") !== null;
  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }
  return <Outlet />;
}
