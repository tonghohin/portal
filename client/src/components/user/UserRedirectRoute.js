import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Redirect authenticated users to main portal when they try to visit login/riegister page
function UserRedirectRoute(props) {
  const userReducer = useSelector((store) => store.user);

  return userReducer.isAuthenticated ? <Navigate to="/" replace /> : props.children;
}

export default UserRedirectRoute;
