import { useState } from "react";
import UserMessage from "../../components/user/message/UserMessage";
import { useSelector } from "react-redux";

function UserMessages() {
  const userReducer = useSelector((store) => store.user);
  const [formData, setFormData] = useState({ name: "", unit: userReducer.unit, subject: "", message: "" });
  const [message, setMessage] = useState("");
  const [toggleRerender, setToggleRerender] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/message", { method: "POST", body: JSON.stringify(formData), headers: { "Content-Type": "application/json" } })
      .then((res) => res.text())
      .then((data) => {
        setMessage(data);
        setToggleRerender((prevToggleRerender) => !prevToggleRerender);
      });
    setFormData({ name: "", unit: userReducer.unit, subject: "", message: "" });
  }

  return (
    <main className="p-5 bg-gray-100 overflow-auto">
      <h1 className="text-xl font-semibold">Message</h1>
      <form className="flex flex-col h-72 p-2 text-md bg-white mt-2 border-2 border-cyan-600 rounded" onSubmit={handleSubmit}>
        <input className="bg-gray-100 m-1 ml-0 border-2 w-full" type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} required={true} autoComplete="false"></input>
        <input className="bg-gray-100 m-1 ml-0 border-2 w-full" type="text" name="subject" placeholder="Subject" onChange={handleChange} value={formData.subject} required={true} autoComplete="false"></input>
        <textarea className="resize-none bg-gray-100 m-1 ml-0 border-2 w-full h-full" name="message" placeholder="Message" value={formData.message} onChange={handleChange} required={true} autoComplete="false" />
        <p className="text-cyan-600">{message}</p>
        <button className="self-start block bg-cyan-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-cyan-700 transition">Send</button>
      </form>
      <UserMessage toggleRerender={toggleRerender}/>
    </main>
  );
}

export default UserMessages;
