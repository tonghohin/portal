import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
// ------------------------------ Admin ------------------------------
import NavBar from "./components/admin/NavBar";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import Home from "./pages/admin/Home";
import Residents from "./pages/admin/Residents";
import Gym from "./pages/admin/Gym";
import Announcements from "./pages/admin/Announcements";
import Messages from "./pages/admin/Messages";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import RedirectRoute from "./components/admin/RedirectRoute";
// ------------------------------ User ------------------------------
import UserNavBar from "./components/user/UserNavBar";
import UserLogin from "./pages/user/UserLogin";
import UserGym from "./pages/user/UserGym";
import UserHome from "./pages/user/UserHome";
import UserMessages from "./pages/user/UserMessages";
import UserPassword from "./pages/user/UserPassword";
import UserProtectedRoute from "./components/user/UserProtectedRoute";
import UserRedirectRoute from "./components/user/UserRedirectRoute";
// ------------------------------ Redux Toolkit ------------------------------
import { useDispatch } from "react-redux";
import { fetchAuthentication } from "./features/adminSlice";
import { fetchUserAuthentication } from "./features/userSlice";

function App() {
  const dispatch = useDispatch();
  // ------------------------------ Admin ------------------------------
  useEffect(() => {
    dispatch(fetchAuthentication());
  }, [dispatch]);

  // ------------------------------ User ------------------------------
  useEffect(() => {
    dispatch(fetchUserAuthentication());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* ------------------------------ Admin ------------------------------ */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route
            index
            element={
              <>
                <NavBar page={1} />
                <Home />
              </>
            }
          />
          <Route
            path="manage-residents"
            element={
              <>
                <NavBar page={2} />
                <Residents />
              </>
            }
          />
          <Route
            path="manage-gym"
            element={
              <>
                <NavBar page={3} />
                <Gym />
              </>
            }
          />
          <Route
            path="manage-announcement"
            element={
              <>
                <NavBar page={4} />
                <Announcements />
              </>
            }
          />
          <Route
            path="manage-messages"
            element={
              <>
                <NavBar page={5} />
                <Messages />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <NavBar page={1} />
                <Home />
              </>
            }
          />
        </Route>
        <Route path="/admin" element={<RedirectRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* ------------------------------ User ------------------------------ */}
        <Route path="/" element={<UserProtectedRoute />}>
          <Route
            index
            element={
              <>
                <UserNavBar page={1} />
                <UserHome />
              </>
            }
          />
          <Route
            path="gym"
            element={
              <>
                <UserNavBar page={2} />
                <UserGym />
              </>
            }
          />
          <Route
            path="message"
            element={
              <>
                <UserNavBar page={3} />
                <UserMessages />
              </>
            }
          />
          <Route
            path="password"
            element={
              <>
                <UserNavBar page={4} />
                <UserPassword />
              </>
            }
          />
          <Route
            path="*"
            element={
              <>
                <UserNavBar page={1} />
                <UserHome />
              </>
            }
          />
        </Route>
        <Route path="/" element={<UserRedirectRoute />}>
          <Route path="login" element={<UserLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
