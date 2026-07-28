import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../../services/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = getUserRole();
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // Or to a 'unauthorized' page
  }

  return children;
};

export default ProtectedRoute;
