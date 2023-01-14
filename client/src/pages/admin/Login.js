import { useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { fetchAuthentication } from "../../features/adminSlice";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isInvalidUsernameOrPassword, setIsInvalidUsernameOrPassword] = useState(false);
  const dispatch = useDispatch();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("/admin/login", { method: "POST", body: JSON.stringify(formData), headers: { "Content-Type": "application/json" } })
      .then((res) => res.json())
      .then((data) => {
        if (data.isInvalidUsernameOrPassword) {
          setIsInvalidUsernameOrPassword(data);
        } else {
          localStorage.setItem("token", data);
          dispatch(fetchAuthentication());
        }
      });
    setFormData({ username: "", password: "" });
  }

  return (
    <main className="col-span-full bg-slate-100">
      <h1 className="bg-gray-700 text-gray-100 text-2xl font-bold text-center py-4">Granbury Place</h1>
      <form className="text-center mt-40 bg-slate-300 border-2 rounded border-gray-300 w-72 h-72 m-auto flex flex-col items-center justify-around" onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold">Admin Login</h3>
        <input type="text" name="username" className="rounded bg-slate-100 p-2" placeholder="Username" value={formData.username} onChange={handleChange} autoComplete="false" required={true}></input>
        <input type="password" name="password" className="rounded bg-slate-100 p-2" placeholder="Password" value={formData.password} onChange={handleChange} autoComplete="false" required={true}></input>
        {isInvalidUsernameOrPassword && <p className="text-red-600">Invalid username/password</p>}
        <button className="bg-slate-500 text-white rounded p-1 w-20 hover:bg-slate-600">Login</button>
        <Link to="/admin/register" className="underline text-gray-600 hover:text-black">
          Go to Register Page
        </Link>
      </form>
    </main>
  );
}

export default Login;
