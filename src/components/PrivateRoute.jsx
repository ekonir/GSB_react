import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token, loading } = useAuth(); 
 if (loading) {
    return <div>Chargement...</div>;
  }
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;