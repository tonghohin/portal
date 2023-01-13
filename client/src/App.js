import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
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

function App() {
  // ------------------------------ Admin ------------------------------
  const [authentication, setAuthentication] = useState({});
  const [toggleRerender, setToggleRerender] = useState(false);

  useEffect(() => {
    fetch("/admin/authenticate", { headers: { "x-access-token": localStorage.getItem("token") } })
      .then((res) => res.json())
      .then((data) => {
        setAuthentication(data);
      });
  }, [toggleRerender]);

  // ------------------------------ User ------------------------------
  const [userAuthentication, setUserAuthentication] = useState({});

  useEffect(() => {
    fetch("/authenticate", { headers: { "x-access-token": localStorage.getItem("token") } })
      .then((res) => res.json())
      .then((data) => {
        setUserAuthentication(data);
      });
  }, [toggleRerender]);

  return (
    <BrowserRouter>
      <Routes>
        {/* ------------------------------ Admin ------------------------------ */}
        <Route path="/admin">
          <Route
            index
            element={
              <ProtectedRoute authentication={authentication}>
                <NavBar page={1} setToggleRerender={setToggleRerender} authentication={authentication} />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-residents"
            element={
              <ProtectedRoute authentication={authentication}>
                <NavBar page={2} setToggleRerender={setToggleRerender} authentication={authentication} />
                <Residents />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-gym"
            element={
              <ProtectedRoute authentication={authentication}>
                <NavBar page={3} setToggleRerender={setToggleRerender} authentication={authentication} />
                <Gym />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-announcement"
            element={
              <ProtectedRoute authentication={authentication}>
                <NavBar page={4} setToggleRerender={setToggleRerender} authentication={authentication} />
                <Announcements />
              </ProtectedRoute>
            }
          />
          <Route
            path="manage-messages"
            element={
              <ProtectedRoute authentication={authentication}>
                <NavBar page={5} setToggleRerender={setToggleRerender} authentication={authentication} />
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <RedirectRoute authentication={authentication}>
                <Login setToggleRerender={setToggleRerender} />
              </RedirectRoute>
            }
          />
          <Route
            path="register"
            element={
              <RedirectRoute authentication={authentication}>
                <Register />
              </RedirectRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute authentication={authentication}>
                <NavBar page={1} setToggleRerender={setToggleRerender} authentication={authentication} />
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* ------------------------------ User ------------------------------ */}
        <Route path="/">
          <Route
            index
            element={
              <UserProtectedRoute userAuthentication={userAuthentication}>
                <UserNavBar page={1} setToggleRerender={setToggleRerender} userAuthentication={userAuthentication} />
                <UserHome />
              </UserProtectedRoute>
            }
          />
          <Route
            path="gym"
            element={
              <UserProtectedRoute userAuthentication={userAuthentication}>
                <UserNavBar page={2} setToggleRerender={setToggleRerender} userAuthentication={userAuthentication} />
                <UserGym userAuthentication={userAuthentication} />
              </UserProtectedRoute>
            }
          />
          <Route
            path="message"
            element={
              <UserProtectedRoute userAuthentication={userAuthentication}>
                <UserNavBar page={3} setToggleRerender={setToggleRerender} userAuthentication={userAuthentication} />
                <UserMessages userAuthentication={userAuthentication} />
              </UserProtectedRoute>
            }
          />
          <Route
            path="password"
            element={
              <UserProtectedRoute userAuthentication={userAuthentication}>
                <UserNavBar page={4} setToggleRerender={setToggleRerender} userAuthentication={userAuthentication} />
                <UserPassword userAuthentication={userAuthentication} />
              </UserProtectedRoute>
            }
          />
          <Route
            path="login"
            element={
              <UserRedirectRoute userAuthentication={userAuthentication}>
                <UserLogin setToggleRerender={setToggleRerender} />
              </UserRedirectRoute>
            }
          />
          <Route
            path="*"
            element={
              <UserProtectedRoute userAuthentication={userAuthentication}>
                <UserNavBar page={1} setToggleRerender={setToggleRerender} userAuthentication={userAuthentication} />
                <UserHome />
              </UserProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
