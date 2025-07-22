import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const principal = Cookies.get("principal");
  return principal ? <Outlet /> : <Navigate to="/" replace />;
};
