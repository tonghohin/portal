import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

function Announcement(props) {
  const [contextmenuIsShown, setContextmenuIsShown] = useState(false);
  const [clickedAnnouncement, setClickedAnnouncement] = useState({ coor: { x: 0, y: 0 }, id: "", subject: "", announcement: "", isInEditMode: false });

  function handleContextmenu(e) {
    e.preventDefault();
    setContextmenuIsShown(true);
    setClickedAnnouncement({ coor: { x: e.clientX, y: e.clientY }, id: e.currentTarget.id, subject: e.currentTarget.children[0].textContent, announcement: e.currentTarget.children[2].textContent, isInEditMode: false });
  }

  useEffect(() => {
    window.addEventListener("click", () => {
      setContextmenuIsShown(false);
    });
  }, []);

  function handleChange(e) {
    setClickedAnnouncement({ ...clickedAnnouncement, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/announcement/${clickedAnnouncement.id}`, { method: "PUT", body: JSON.stringify({ subject: clickedAnnouncement.subject, announcement: clickedAnnouncement.announcement }), headers: { "Content-Type": "application/json" } })
      .then((res) => res.text())
      .then((data) => {
        props.setMessage(data);
        setClickedAnnouncement({ coor: { x: 0, y: 0 }, id: "", subject: "", announcement: "", isInEditMode: false });
        props.handleToggleRerender();
      });
  }

  return clickedAnnouncement.isInEditMode ? (
    <form className="flex flex-col h-72 p-2 text-md bg-white mt-2 border-2 border-cyan-600 rounded" onSubmit={handleSubmit}>
      <input className="bg-gray-100 m-1 ml-0 border-2 w-full" type="text" name="subject" placeholder="Subject" onChange={handleChange} value={clickedAnnouncement.subject} required={true} autoComplete="false"></input>
      <textarea className="resize-none bg-gray-100 m-1 ml-0 border-2 w-full h-full" name="announcement" placeholder="Announcement" value={clickedAnnouncement.announcement} onChange={handleChange} required={true} autoComplete="false" />
      <button className="self-start block bg-cyan-600 text-white py-0.5 px-3 rounded mt-2 hover:bg-cyan-700 transition">Edit</button>
    </form>
  ) : (
    <article id={props.announcement._id} className="bg-slate-100 rounded p-2 grid grid-cols-2 cursor-pointer hover:bg-slate-200" onContextMenu={handleContextmenu}>
      <h1 className="font-bold">{props.announcement.subject}</h1>
      <time className="text-xs text-right leading-5">{props.announcement.createdAt}</time>
      <p className="text-gray-600 whitespace-pre-wrap">{props.announcement.announcement}</p>
      {contextmenuIsShown && <Contextmenu setClickedAnnouncement={setClickedAnnouncement} clickedAnnouncement={clickedAnnouncement} />}
    </article>
  );
}

function Contextmenu(props) {
  function handleClick(e) {
    props.setClickedAnnouncement({ ...props.clickedAnnouncement, isInEditMode: true });
  }
  return (
    <button className="bg-white border border-slate-500 px-1 rounded fixed hover:bg-slate-300" style={{ left: props.clickedAnnouncement.coor.x, top: props.clickedAnnouncement.coor.y }} onClick={handleClick}>
      Edit
      <PencilSquareIcon className="h-5 w-5 inline ml-2 mb-1 text-green-600" />
    </button>
  );
}

export default Announcement;
