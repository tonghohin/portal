import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Redirect unauthenticated users to login page when they try to visit the main portal
function UserProtectedRoute(props) {
  const userReducer = useSelector((store) => store.user);

  return userReducer.isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default UserProtectedRoute;
