import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Redirect unauthenticated users to login page when they try to visit the main portal
function ProtectedRoute(props) {
  const adminReducer = useSelector((store) => store.admin);

  return adminReducer.isAuthenticated && adminReducer.isAdmin ? props.children : <Navigate to="/admin/login" replace />;
}

export default ProtectedRoute;
