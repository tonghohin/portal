import GymCalendarDay from "./GymCalendarDay";

function GymCalendar(props) {
  return (
    <article className="text-center border">
      <h1 className="font-semibold border-b border-gray-400 py-2">{props.date}</h1>
      {props.day.timeslot.map((timeslotObj) => (
        <GymCalendarDay key={timeslotObj._id} dayId={props.day._id} time={timeslotObj.time} slotOne={timeslotObj.slotOne} slotTwo={timeslotObj.slotTwo} slotThree={timeslotObj.slotThree} handleContextmenu={props.handleContextmenu} />
      ))}
    </article>
  );
}

export default GymCalendar;
