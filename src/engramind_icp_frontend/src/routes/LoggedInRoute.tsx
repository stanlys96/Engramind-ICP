import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const LoggedInRoute = () => {
  const principal = Cookies.get("principal");
  return principal ? <Navigate to="/showcase" replace /> : <Outlet />;
};
