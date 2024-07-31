import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { TokenContext, TokenContextType } from "@/context/TokenContext";

const ProtectedRoute = () => {
  const { token } = useContext(TokenContext) as TokenContextType;

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render child components (the protected routes)
  return <Outlet />;
};

export default ProtectedRoute;
