import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8 text-xl">Loading...</div>;

  if (!user) return <Navigate to="/admin-login" />;

  return children;
};

export default ProtectedRoute;
