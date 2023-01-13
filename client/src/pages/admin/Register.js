import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isNewAccountRegistered, setIsNewAccountRegistered] = useState(false);
  const [isUsernameExist, setIsUsernameExist] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/admin/register", { method: "POST", body: JSON.stringify(formData), headers: { "Content-Type": "application/json" } })
      .then((res) => res.json())
      .then((data) => {
        if (data.isNewAccountRegistered) {
          setIsNewAccountRegistered(data);
        } else if (data.isUsernameExist) {
          setIsUsernameExist(data);
        }
      });
    setFormData({ username: "", password: "" });
  }

  if (isNewAccountRegistered) {
    return (
      <main className="col-span-full bg-slate-100">
        <h1 className="bg-gray-700 text-gray-100 text-2xl font-bold text-center py-4">Granbury Place</h1>
        <section className="text-center mt-40 bg-slate-300 rounded w-72 h-72 m-auto flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          <h3 className="font-semibold">New admin account has been registered!</h3>
          <Link to="/admin/login" className="underline text-gray-600 hover:text-black">
            Login Now!
          </Link>
        </section>
      </main>
    );
  } else {
    return (
      <main className="col-span-full bg-slate-100">
        <h1 className="bg-gray-700 text-gray-100 text-2xl font-bold text-center py-4">Granbury Place</h1>
        <form className="text-center mt-40 bg-slate-300 rounded w-72 h-72 m-auto flex flex-col items-center justify-around" onSubmit={handleSubmit}>
          <h3 className="text-xl font-semibold">Admin Register</h3>
          <input type="text" name="username" className="rounded bg-slate-100 p-2" placeholder="Username" value={formData.username} onChange={handleChange} autoComplete="false" required={true}></input>
          <input type="text" name="password" className="rounded bg-slate-100 p-2" placeholder="Password" value={formData.password} onChange={handleChange} autoComplete="false" required={true}></input>
          {isUsernameExist && <p className="text-red-600">The username has already been taken.</p>}
          <button className="bg-slate-500 text-white rounded p-1 w-20 hover:bg-slate-600">Register</button>
          <Link to="/admin/login" className="underline text-gray-600 hover:text-black">
            Go to Login Page
          </Link>
        </form>
      </main>
    );
  }
}

export default Register;
