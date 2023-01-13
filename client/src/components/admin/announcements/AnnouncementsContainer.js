import { useState, useEffect } from "react";
import Announcement from "./Announcement";

function AnnouncementsContainer(props) {
  const [pastAnnouncements, setPastAnnouncements] = useState([]);
  const [isPastAnnouncementsShown, setIsPastAnnouncementsShown] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/announcement")
      .then((res) => res.json())
      .then((data) => {
        data.map((obj) => (obj.createdAt = new Date(obj.createdAt).toDateString()));
        setPastAnnouncements(data.reverse());
      });
  }, [props.toggleRerender]);

  function handleClick() {
    setIsPastAnnouncementsShown(true);
    props.handleToggleRerender();
  }

  return (
    <>
      <button className="block bg-cyan-700 text-white py-0.5 px-3 rounded mt-2 hover:bg-cyan-800 transition" onClick={handleClick}>
        See past announcements
      </button>
      {isPastAnnouncementsShown && (
        <section className="flex flex-col gap-1 p-2 text-md bg-white mt-2 border-2 border-cyan-600 rounded">
          <h1 className="text-slate-800 underline">Past Announcements</h1>
          <p className="text-cyan-600">{message}</p>
          {pastAnnouncements.map((announcement) => (
            <Announcement key={announcement._id} announcement={announcement} handleToggleRerender={props.handleToggleRerender} setMessage={setMessage} />
          ))}
        </section>
      )}
    </>
  );
}

export default AnnouncementsContainer;
