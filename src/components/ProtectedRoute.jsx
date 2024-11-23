import { Navigate } from "react-router-dom";

// src/components/ProtectedRoute.jsx
const ProtectedRoute = ({ children, user, loading }) => {
    if (loading) {
      return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    }
    
    if (!user) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;