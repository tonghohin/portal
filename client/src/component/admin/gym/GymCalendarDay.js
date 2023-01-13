function GymCalendarDay(props) {
  return (
    <div>
      <h1 className="bg-slate-200 font-semibold cursor-pointer hover:bg-slate-300" id={props.dayId} onContextMenu={props.handleContextmenu}>
        {props.time}
      </h1>
      <p className={switchClass(props.slotOne)}>{props.slotOne}</p>
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
