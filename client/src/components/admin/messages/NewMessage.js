import { useState } from "react";

function NewMessage(props) {
  const [formData, setFormData] = useState({ reply: "" });
  const [isFormShown, setIsFormShown] = useState(false);

  function handleClick() {
    setIsFormShown(true);
  }

  function handleChange(e) {
    setFormData({ reply: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/message/${e.target.parentElement.parentElement.dataset.id}`, { method: "PUT", body: JSON.stringify(formData), headers: { "Content-Type": "application/json" } }).then(() => {
      props.setToggleRerender((prevToggleRerender) => !prevToggleRerender);
    });
    setFormData({ reply: "" });
  }

  return (
    <div data-id={props.newMessage._id} className="grid grid-cols-2 gap-1 mt-2">
      <article className="bg-slate-100 rounded p-2 flex flex-col">
        <h1 className="font-bold col-span-full flex justify-between items-center">
          {props.newMessage.name} from unit {props.newMessage.unit}
          <time className="font-normal text-xs">{props.newMessage.createdAt}</time>
        </h1>
        <h2 className="font-semibold">{props.newMessage.subject}</h2>
        <p className="text-gray-600 whitespace-pre-wrap">{props.newMessage.message}</p>
      </article>
      <article className="bg-slate-100 rounded p-2 grid">
        {isFormShown ? (
          <form className="flex flex-col h-72 p-2 text-md bg-white mt-2 border-2 border-green-700 rounded" onSubmit={handleSubmit}>
            <textarea className="resize-none bg-gray-100 m-1 ml-0 border-2 w-full h-full" name="reply" placeholder="Reply" value={formData.reply} onChange={handleChange} required={true} autoComplete="false" />
            <button className="self-start block bg-green-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-cyan-700 transition">Send</button>
          </form>
        ) : (
          <button className="bg-green-600 text-white py-0.5 px-3 rounded place-self-center hover:bg-green-700 transition" onClick={handleClick}>
            Reply
          </button>
        )}
      </article>
    </div>
  );
}

export default NewMessage;
