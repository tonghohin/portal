import { Navigate } from "react-router-dom";

// Redirect authenticated users to main portal when they try to visit login/riegister page
function UserRedirectRoute(props) {
  return props.userAuthentication.isAuthenticated ? <Navigate to="/" replace /> : props.children;
}

export default UserRedirectRoute;
