import { useDispatch } from "react-redux";
import { rightClicked } from "../../../features/gymSlice";
import { useRef } from "react";

function GymCalendarDay(props) {
  const dispatch = useDispatch();
  const P = useRef(null);

  function handleContextmenu(e) {
    e.preventDefault();
    P.current.textContent === "Closed" ? props.setContextmenuInfo({ isShown: true, textIsClosed: false }) : props.setContextmenuInfo({ isShown: true, textIsClosed: true });
    dispatch(rightClicked({ coor: { x: e.clientX, y: e.clientY }, id: e.target.id, text: e.target.textContent }));
  }

  return (
    <div>
      <h1 className="bg-slate-200 font-semibold cursor-pointer hover:bg-slate-300" id={props.dayId} onContextMenu={handleContextmenu}>
        {props.time}
      </h1>
      <p className={switchClass(props.slotOne)} ref={P}>
        {props.slotOne}
      </p>
      <p className={switchClass(props.slotTwo, true)}>{props.slotTwo}</p>
      <p className={switchClass(props.slotThree)}>{props.slotThree}</p>
    </div>
  );
}

function switchClass(text, isMiddle = false) {
  switch (text) {
    case "Closed":
      return "bg-gray-400";
    case "Available":
      return isMiddle ? "bg-slate-100" : undefined;
    default:
      return isMiddle ? "bg-slate-100 font-semibold underline" : "font-semibold underline";
  }
}

export default GymCalendarDay;
