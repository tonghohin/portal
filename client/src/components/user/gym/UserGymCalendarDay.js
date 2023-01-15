function UserGymCalendarDay(props) {
  return (
    <div>
      <h1 className="bg-slate-200 font-semibold" id={props.dayId}>
        {props.time}
      </h1>
      <p className={switchClass(props.slotOne)} onContextMenu={props.slotOne === "Closed" || props.slotOne === "Unavailable" ? undefined : props.handleContextmenu} data-slot="slotOne">
        {props.slotOne}
      </p>
      <p id="slotTwo" className={switchClass(props.slotTwo, true)} onContextMenu={props.slotOne === "Closed" || props.slotOne === "Unavailable" ? undefined : props.handleContextmenu} data-slot="slotTwo">
        {props.slotTwo}
      </p>
      <p id="slotThree" className={switchClass(props.slotThree)} onContextMenu={props.slotOne === "Closed" || props.slotOne === "Unavailable" ? undefined : props.handleContextmenu} data-slot="slotThree">
        {props.slotThree}
      </p>
    </div>
  );
}

function switchClass(text, isMiddle = false) {
  switch (text) {
    case "Closed":
    case "Unavailable":
      return "bg-gray-400";
    case "Available":
      return isMiddle ? "cursor-pointer bg-slate-100 hover:bg-slate-300" : "cursor-pointer hover:bg-slate-300";
    default:
      return isMiddle ? "font-bold underline cursor-pointer bg-slate-100 hover:bg-slate-300" : "font-bold underline cursor-pointer hover:bg-slate-300";
  }
}

export default UserGymCalendarDay;
