import './AnimalsProtocolStatus.css';
import Patch, { PatchV2 } from './Patch.js';

export const AnimalsProtocolStatus = (props) => {
  const PrepProtocolSection = (animal) => {
    const protocol = typeof animal.protocol;
    if (protocol === "object") {
      return
    }
    const body = {
      "_id":animal._id,
      "notes":[],
      "protocol": {
        "timeline_days":[
          {"treatments":[{"completed":false},{"completed":false}],"completed":false},
          {"treatments":[{"completed":false},{"completed":false}],"completed":false},
          {"treatments":[{"completed":false},{"completed":false}],"completed":false},
          {"treatments":[{"completed":false},{"completed":false}],"completed":false},
          {"treatments":[{"completed":false},{"completed":false}],"completed":false},
          {"treatments":[{"completed":false},{"completed":false}],"completed":false},
          {"treatments":[{"completed":false},{"completed":false}],"completed":false},
          {"treatments":[{"completed":false},{"completed":false}],"completed":false},
          {"treatments":[{"completed":false},{"completed":false}],"completed":false},
          {"treatments":[{"completed":false},{"completed":false}],"completed":false},
        ]
      }
    }
    PatchV2 ("reproduction.active", body);
  }

  const Days = (props) => {
    if (props.start === props.end) {
      return (
        <div className="Days">
          Day: {props.start}
        </div>
      );
    }
    return (
      <div className="Days">
        Days: {props.start} - {props.end}
      </div>
    );
  }

  const Checkbox = (props) => {
    const isChecked = (props.checked) ? "checked" : "";
    const onChange = (e) => {
      Patch ("reproduction.active", 
        props.id, 
        props.field,
        e.target.checked);
    }

    if (isChecked) {
      return (
        <div className="Checkbox">
          <input type="checkbox" 
            onChange={onChange} 
            checked
          /> 
          <span>Completed</span>
        </div>
      );
    }

    return (
      <div className="Checkbox">
        <input type="checkbox" 
          onChange={onChange} 
        /> 
        <span>Not Completed</span>
      </div>
    );
  }

  const isComplete = (animal, dayIndex, treatmentIndex) => {
    if (animal.protocol == undefined) {
      return false;
    }
    if (animal.protocol == null) {
      return false;
    }
    const completed = animal.protocol.timeline_days[dayIndex].completed;
    return animal.protocol.timeline_days[dayIndex].completed;
  }

  PrepProtocolSection(props.animal);
  return (
    <div className="AnimalsProtcolStatus">
      <div className="name">{props.protocol.name}</div>
      <div className="desc">{props.protocol.description}</div>
      {props.protocol.timeline_days.map((day, index) => (
        <div className="timeline">
          <div className="event">
            <Days 
              start={day.start_day}
              end={day.end_day}
            />
            <div className="event">{day.event}</div>
            <Checkbox
              id={props.animal._id}
              field={`protocol.timeline_days.${index}.completed`}
              checked={isComplete(props.animal, index)}
            />

            {props.protocol.timeline_days[index].treatments &&
            <div className="treatments-container">
              <div className="treatments-header">Treatments:</div>
              {props.protocol.timeline_days[index].treatments.map((treatment, treatmentIndex) => (
                <Treatment treatment={treatment}/>
              ))}
            </div>
            }

          </div>
        </div>
      ))}
    </div>
  );
}

export const Treatment = (props) => {
  return (
    <div className="Treatment">

      {props.treatment.medication &&
      <div className="medication">
        Medication: {props.treatment.medication}
      </div>
      }

      {props.treatment.device &&
      <div className="device">
        Device: {props.treatment.device}
      </div>
      }

      {props.treatment.procedure &&
      <div className="procedure">
        Device: {props.treatment.procedure}
      </div>
      }

      {props.treatment.notes &&
      <div className="notes">
        Notes: {props.treatment.notes}
      </div>
      }
    </div>
  );
}

export default AnimalsProtocolStatus;
