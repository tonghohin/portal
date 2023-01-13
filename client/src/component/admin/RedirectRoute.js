import { Navigate } from "react-router-dom";

// Redirect authenticated users to main portal when they try to visit login/riegister page
function RedirectRoute(props) {
  return props.authentication.isAuthenticated && props.authentication.isAdmin ? <Navigate to="/admin" replace /> : props.children;
}

export default RedirectRoute;
