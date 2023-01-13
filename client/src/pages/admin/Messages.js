import { useEffect, useState } from "react";
import NewMessage from "../../components/admin/messages/NewMessage";
import PastMessage from "../../components/admin/messages/PastMessage";

function Messages() {
  const [messages, setMessages] = useState({ newMessage: [], pastMessage: [] });
  const [toggleRerender, setToggleRerender] = useState(false);

  function handleToggleRerender() {
    setToggleRerender((prevToggleRerender) => !prevToggleRerender);
  }

  useEffect(() => {
    fetch("/message")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((obj) => {
          obj.updatedAt = new Date(obj.updatedAt).toDateString();
          obj.createdAt = new Date(obj.createdAt).toDateString();
        });
        setMessages({ newMessage: data.filter((obj) => !obj.reply).reverse(), pastMessage: data.filter((obj) => obj.reply).reverse() });
      });
  }, [toggleRerender]);

  return (
    <main className="p-5 bg-gray-100 overflow-auto">
      <h1 className="text-xl font-semibold">Messages</h1>
      <section className="p-2 text-md bg-white mt-2 border-2 border-green-600 rounded">
        <h1 className="text-slate-800 font-bold col-span-full">New Message</h1>
        {messages.newMessage.length !== 0 ? messages.newMessage.map((newMessageObj) => <NewMessage key={newMessageObj._id} newMessage={newMessageObj} setToggleRerender={setToggleRerender} />) : <p>No new messages.</p>}
      </section>
      <section className="p-2 text-md bg-white mt-2 border-2 border-cyan-600 rounded">
        <h1 className="text-slate-800 font-bold col-span-full">Past Message</h1>
        {messages.pastMessage.map((pastMessageObj) => (
          <PastMessage key={pastMessageObj._id} pastMessage={pastMessageObj} handleToggleRerender={handleToggleRerender} />
        ))}
      </section>
    </main>
  );
}

export default Messages;
