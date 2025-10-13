import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { hasTokens } = useAuth();
  if (!hasTokens) return <Navigate to={"/login"} replace />;
  return children;
}
