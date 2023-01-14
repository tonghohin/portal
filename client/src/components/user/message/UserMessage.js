import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UserMessages(props) {
  const userReducer = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`/message/${userReducer.unit}`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((obj) => {
          obj.updatedAt = new Date(obj.updatedAt).toDateString();
          obj.createdAt = new Date(obj.createdAt).toDateString();
        });
        setMessages(data.reverse());
      });
  }, [props.toggleRerender, userReducer.unit]);

  return (
    <section className="p-2 text-md bg-white mt-2 border-2 border-cyan-600 rounded">
      <h1 className="text-slate-800 font-bold col-span-full">Past Messages</h1>
      {messages.length !== 0 ? (
        messages.map((messageObj) => {
          return (
            <div key={messageObj._id} className="grid grid-cols-2 gap-1 mt-2">
              <article className="bg-slate-300 rounded p-2 grid grid-cols-2">
                <h1 className="font-bold">{messageObj.subject}</h1>
                <time className="text-xs text-right leading-5">{messageObj.createdAt}</time>
                <p className="text-gray-600 whitespace-pre-wrap">{messageObj.message}</p>
              </article>
              <article className="bg-slate-100 rounded p-2">
                {messageObj.reply ? (
                  <>
                    <time className="text-xs text-right block">Replied on {messageObj.updatedAt}</time>
                    <p className="text-gray-600 whitespace-pre-wrap">{messageObj.reply}</p>
                  </>
                ) : (
                  <p className="font-semibold text-cyan-700">Sorry, we'll get back to you asap!</p>
                )}
              </article>
            </div>
          );
        })
      ) : (
        <p>No past messages.</p>
      )}
    </section>
  );
}

export default UserMessages;
