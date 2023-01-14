import { useState } from "react";

import { useDispatch } from "react-redux";
import { fetchUserAuthentication } from "../../features/userSlice";

function UserLogin() {
  const [formData, setFormData] = useState({ unit: "", password: "" });
  const [isInvalidUnitOrPassword, setIsInvalidUnitOrPassword] = useState(false);
  const dispatch = useDispatch();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", { method: "POST", body: JSON.stringify(formData), headers: { "Content-Type": "application/json" } })
      .then((res) => res.json())
      .then((data) => {
        if (data.isInvalidUnitOrPassword) {
          setIsInvalidUnitOrPassword(data);
        } else {
          localStorage.setItem("token", data);
          dispatch(fetchUserAuthentication());
        }
      });
    setFormData({ unit: "", password: "" });
  }

  return (
    <main className="col-span-full bg-slate-100">
      <h1 className="bg-gray-700 text-gray-100 text-2xl font-bold text-center py-4">Granbury Place</h1>
      <form className="text-center mt-40 bg-slate-300 border-2 rounded border-gray-300 w-72 h-72 m-auto flex flex-col items-center justify-around" onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold">Welcome to Granbury Place</h3>
        <input type="text" name="unit" className="rounded bg-slate-100 p-2" placeholder="Unit No." value={formData.unit} onChange={handleChange} autoComplete="false" required={true}></input>
        <input type="password" name="password" className="rounded bg-slate-100 p-2" placeholder="Password" value={formData.password} onChange={handleChange} autoComplete="false" required={true}></input>
        {isInvalidUnitOrPassword && <p className="text-red-600">Invalid unit no./password</p>}
        <button className="bg-slate-500 text-white rounded p-1 w-20 hover:bg-slate-600">Login</button>
      </form>
    </main>
  );
}

export default UserLogin;
