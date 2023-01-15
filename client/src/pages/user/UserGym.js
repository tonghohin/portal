import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import UserGymCalendar from "../../components/user/gym/UserGymCalendar";
import { useSelector } from "react-redux";

function UserGym() {
  const userReducer = useSelector((store) => store.user);
  const [gymSchedule, setGymSchedule] = useState([]);
  const [toggleRerender, setToggleRerender] = useState(false);
  const [contextmenuInfo, setContextmenuInfo] = useState({ isShown: false, textIsAvailable: true });
  const [clickedTimeslot, setClickedTimslot] = useState({ coor: { x: 0, y: 0 }, id: "", text: "", slot: "" });

  function handleContextmenu(e) {
    e.preventDefault();
    e.target.textContent === "Available" ? setContextmenuInfo({ isShown: true, textIsAvailable: true }) : setContextmenuInfo({ isShown: true, textIsAvailable: false });
    setClickedTimslot({ coor: { x: e.clientX, y: e.clientY }, id: e.target.parentElement.firstChild.id, text: e.target.parentElement.firstChild.textContent, slot: e.target.dataset.slot });
  }

  useEffect(() => {
    window.addEventListener("click", () => {
      setContextmenuInfo({ isShown: false, textIsClosed: true });
    });
  }, []);

  useEffect(() => {
    fetch(`/gymcalendar/${userReducer.unit}`)
      .then((res) => res.json())
      .then((data) => {
        data.map((obj) => (obj.date = new Date(obj.date).toDateString()));
        setGymSchedule(data);
      });
  }, [toggleRerender, userReducer.unit]);

  return (
    <>
      <main className="p-5 bg-gray-100 overflow-auto">
        <h1 className="text-xl font-semibold">Gymroom Schedule</h1>
        <section className="grid grid-cols-5 bg-white rounded border-2">
          {gymSchedule.map((day) => (
            <UserGymCalendar key={day._id} date={day.date} day={day} handleContextmenu={handleContextmenu} />
          ))}
        </section>
      </main>
      {contextmenuInfo.isShown && <Contextmenu contextmenuInfo={contextmenuInfo} clickedTimeslot={clickedTimeslot} setToggleRerender={setToggleRerender} />}
    </>
  );
}

function Contextmenu(props) {
  const userReducer = useSelector((store) => store.user);

  function handleClick(e) {
    fetch(`/gym/${props.clickedTimeslot.id}/${props.clickedTimeslot.text}/${props.clickedTimeslot.slot}`, { method: "PUT", body: JSON.stringify({ action: e.currentTarget.textContent, unit: userReducer.unit }), headers: { "Content-Type": "application/json" } }).then(() => {
      props.setToggleRerender((prevToggleRerender) => !prevToggleRerender);
    });
  }
  return (
    <button className="bg-white border border-slate-500 px-1 rounded fixed hover:bg-slate-300" style={{ left: props.clickedTimeslot.coor.x, top: props.clickedTimeslot.coor.y }} onClick={handleClick}>
      {props.contextmenuInfo.textIsAvailable ? "Register" : "De-register"}
      {props.contextmenuInfo.textIsAvailable ? <CheckIcon className="h-5 w-5 inline ml-2 mb-1 text-green-600" /> : <ArrowUturnRightIcon className="h-5 w-5 inline ml-2 mb-1 text-red-600" />}
    </button>
  );
}

export default UserGym;
