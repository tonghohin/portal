function UserGymCalendarDay(props) {
  return (
    <div>
      <h1 className="bg-slate-200 font-semibold" id={props.dayId}>
        {props.time}
      </h1>
      <p className={switchClass(props.slotOne, props.userAuthentication.unit)} onContextMenu={props.slotOne === "Available" || props.slotOne === props.userAuthentication.unit ? props.handleContextmenu : undefined} data-slot="slotOne">
        {switchContent(props.slotOne, props.userAuthentication.unit)}
      </p>
      <p id="slotTwo" className={switchClass(props.slotTwo, props.userAuthentication.unit, true)} onContextMenu={props.slotTwo === "Available" || props.slotTwo === props.userAuthentication.unit ? props.handleContextmenu : undefined} data-slot="slotTwo">
        {switchContent(props.slotTwo, props.userAuthentication.unit)}
      </p>
      <p id="slotThree" className={switchClass(props.slotThree, props.userAuthentication.unit)} onContextMenu={props.slotThree === "Available" || props.slotThree === props.userAuthentication.unit ? props.handleContextmenu : undefined} data-slot="slotThree">
        {switchContent(props.slotThree, props.userAuthentication.unit)}
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
