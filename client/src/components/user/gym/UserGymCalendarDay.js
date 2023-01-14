import { useSelector } from "react-redux";

function UserGymCalendarDay(props) {
  const userReducer = useSelector((store) => store.user);

  return (
    <div>
      <h1 className="bg-slate-200 font-semibold" id={props.dayId}>
        {props.time}
      </h1>
      <p className={switchClass(props.slotOne, userReducer.unit)} onContextMenu={props.slotOne === "Available" || props.slotOne === userReducer.unit ? props.handleContextmenu : undefined} data-slot="slotOne">
        {switchContent(props.slotOne, userReducer.unit)}
      </p>
      <p id="slotTwo" className={switchClass(props.slotTwo, userReducer.unit, true)} onContextMenu={props.slotTwo === "Available" || props.slotTwo === userReducer.unit ? props.handleContextmenu : undefined} data-slot="slotTwo">
        {switchContent(props.slotTwo, userReducer.unit)}
      </p>
      <p id="slotThree" className={switchClass(props.slotThree, userReducer.unit)} onContextMenu={props.slotThree === "Available" || props.slotThree === userReducer.unit ? props.handleContextmenu : undefined} data-slot="slotThree">
        {switchContent(props.slotThree, userReducer.unit)}
      </p>
    </div>
  );
}

function switchClass(text, unit, isMiddle = false) {
  switch (text) {
    case "Closed":
      return "bg-gray-400";
    case "Available":
      return isMiddle ? "cursor-pointer bg-slate-100 hover:bg-slate-300" : "cursor-pointer hover:bg-slate-300";
    case unit:
      return isMiddle ? "font-bold underline cursor-pointer bg-slate-100 hover:bg-slate-300" : "font-bold underline cursor-pointer hover:bg-slate-300";
    default:
      return "bg-gray-400";
  }
}

function switchContent(text, unit) {
  switch (text) {
    case "Closed":
    case "Available":
    case unit:
      return text;
    default:
      return "Not available";
  }
}

export default UserGymCalendarDay;
