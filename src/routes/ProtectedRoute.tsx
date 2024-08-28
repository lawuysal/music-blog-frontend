import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TokenContext, TokenContextType } from "@/context/TokenContext";

const ProtectedRoute = () => {
  const { token } = useContext(TokenContext) as TokenContextType;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
