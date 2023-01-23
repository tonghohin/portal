import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import GymCalendar from "../../components/admin/gym/GymCalendar";
import { useSelector } from "react-redux";

function Gym() {
  const [gymSchedule, setGymSchedule] = useState([]);
  const [toggleRerender, setToggleRerender] = useState(false);
  const [contextmenuInfo, setContextmenuInfo] = useState({ isShown: false, textIsClosed: true });

  useEffect(() => {
    window.addEventListener("click", () => {
      setContextmenuInfo({ isShown: false, textIsClosed: true });
    });
  }, []);

  useEffect(() => {
    fetch("/admin/gym")
      .then((res) => res.json())
      .then((data) => {
        data.map((obj) => (obj.date = new Date(obj.date).toDateString()));
        setGymSchedule(data);
      });
  }, [toggleRerender]);

  return (
    <>
      <main className="p-5 bg-gray-100 overflow-auto">
        <h1 className="text-xl font-semibold">Gymroom Schedule</h1>
        <section className="grid grid-cols-5 bg-white rounded border-2">
          {gymSchedule.map((day) => (
            <GymCalendar key={day._id} date={day.date.slice(0, 10)} day={day} setContextmenuInfo={setContextmenuInfo} />
          ))}
        </section>
      </main>
      {contextmenuInfo.isShown && <Contextmenu contextmenuInfo={contextmenuInfo} setToggleRerender={setToggleRerender} />}
    </>
  );
}

function Contextmenu(props) {
  const gymReducer = useSelector((store) => store.gym);

  function handleClick(e) {
    fetch(`/admin/gym/${gymReducer.id}/${gymReducer.text}`, { method: "PUT", body: JSON.stringify({ action: e.currentTarget.textContent }), headers: { "Content-Type": "application/json" } }).then(() => {
      props.setToggleRerender((prevToggleRerender) => !prevToggleRerender);
    });
  }
  return (
    <button className="bg-white border border-slate-500 px-1 rounded fixed hover:bg-slate-300" style={{ left: gymReducer.coor.x, top: gymReducer.coor.y }} onClick={handleClick}>
      {props.contextmenuInfo.textIsClosed ? "Set to 'Closed'" : "Set to 'Available'"}
      {props.contextmenuInfo.textIsClosed ? <NoSymbolIcon className="h-5 w-5 inline ml-2 mb-1 text-red-600" /> : <CheckIcon className="h-5 w-5 inline ml-2 mb-1 text-green-600" />}
    </button>
  );
}

export default Gym;
