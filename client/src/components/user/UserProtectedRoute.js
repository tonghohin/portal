import { Navigate } from "react-router-dom";

// Redirect unauthenticated users to login page when they try to visit the main portal
function UserProtectedRoute(props) {
  return props.userAuthentication.isAuthenticated ? props.children : <Navigate to="/login" replace />;
}

export default UserProtectedRoute;
