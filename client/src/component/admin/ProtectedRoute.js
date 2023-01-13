import { Navigate } from "react-router-dom";

// Redirect unauthenticated users to login page when they try to visit the main portal
function ProtectedRoute(props) {
  return props.authentication.isAuthenticated && props.authentication.isAdmin ? props.children : <Navigate to="/admin/login" replace />;
}

export default ProtectedRoute;
