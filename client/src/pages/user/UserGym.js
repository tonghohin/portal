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
            <UserGymCalendar key={day._id} date={day.date} day={day} setContextmenuInfo={setContextmenuInfo} />
          ))}
        </section>
      </main>
      {contextmenuInfo.isShown && <Contextmenu contextmenuInfo={contextmenuInfo} setToggleRerender={setToggleRerender} />}
    </>
  );
}

function Contextmenu(props) {
  const userReducer = useSelector((store) => store.user);
  const userGymReucer = useSelector((store) => store.userGym);

  function handleClick(e) {
    fetch(`/gym/${userGymReucer.id}/${userGymReucer.text}/${userGymReucer.slot}`, { method: "PUT", body: JSON.stringify({ action: e.currentTarget.textContent, unit: userReducer.unit }), headers: { "Content-Type": "application/json" } }).then(() => {
      props.setToggleRerender((prevToggleRerender) => !prevToggleRerender);
    });
  }
  return (
    <button className="bg-white border border-slate-500 px-1 rounded fixed hover:bg-slate-300" style={{ left: userGymReucer.coor.x, top: userGymReucer.coor.y }} onClick={handleClick}>
      {props.contextmenuInfo.textIsAvailable ? "Register" : "De-register"}
      {props.contextmenuInfo.textIsAvailable ? <CheckIcon className="h-5 w-5 inline ml-2 mb-1 text-green-600" /> : <ArrowUturnRightIcon className="h-5 w-5 inline ml-2 mb-1 text-red-600" />}
    </button>
  );
}

export default UserGym;
