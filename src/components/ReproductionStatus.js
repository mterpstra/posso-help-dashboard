import Days from './Days.js';
import { daysSince } from './Utils.js';
export const ReproductionStatus = (props) => {
  const current_day = daysSince(props.animal.start_date);  
  const DayStatus = (props) => {
    let status = "Unknown";
    let classes = "day";
    if (props.animal_status.completed) {
      classes += " completed";
      status = "Completed";
    } else if (current_day === props.protocol_day.end_day) {
      classes += " due-today";
      status = "Due Today";
    } else if (current_day > props.protocol_day.end_day) {
      classes += " missed";
      status = "Missed";
    } else {
      classes += " pending";
      status = "Pending";
    }

    return (
      <div className={classes}>
        <div className="details">
          <div className="day-status">{status}</div>
          <Days 
            start={props.protocol_day.start_day}
            end={props.protocol_day.end_day}
          />
          <div className="event">{props.protocol_day.event}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="status">
      {
        props.protocol.timeline_days.map((day, index) => {
          if (props.animal.protocol === undefined) { return }
          if (props.animal.protocol === null) { return }
          if (props.animal.protocol.timeline_days === undefined) { return }
          if (props.animal.protocol.timeline_days === null) { return }
          if (props.animal.protocol.timeline_days[index] === undefined) { return }
          if (props.animal.protocol.timeline_days[index] === null) { return }
          return (
            <>
              <DayStatus
                protocol_day={day}
                animal_status={props.animal.protocol.timeline_days[index]}
              />
            </>
          );
        })
      }
    </div>
  );
}
export default ReproductionStatus;
