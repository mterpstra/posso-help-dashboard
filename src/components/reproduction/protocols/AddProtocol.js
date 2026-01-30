import DataCollectionAdd from '../../DataCollectionAdd.js';
import './AddProtocol.css';


const Treatment = (props) => {
  return (
    <div className="treatment">
      <h5>Treatment {props.treatment}</h5>
      <input name={`timeline_days[${props.day}].treatments[${props.treatment}].medication`} placeholder="Medication"/>
      <input name={`timeline_days[${props.day}].treatments[${props.treatment}].device`}     placeholder="Device"/>
      <input name={`timeline_days[${props.day}].treatments[${props.treatment}].proceedure`} placeholder="Proceedure"/>
      <input name={`timeline_days[${props.day}].treatments[${props.treatment}].notes`}      placeholder="Notes"/>
    </div>
  );
}

const Timeline = (props) => {
  const arr = Array.from({ length: 5});
  return (
    <div className="timeline">
      <h5>Day {props.day}</h5>
      <input name={`timeline_days[${props.day}].start_day`} placeholder="Start Day"/>
      <input name={`timeline_days[${props.day}].end_day`}   placeholder="End Day"/>
      <input name={`timeline_days[${props.day}].event`}     placeholder="Event"/>
      {arr.map((item, index) => (
        <Treatment key={index} treatment={index}/>
      ))}
    </div>
  );
}

const AddProtocolForm = (props) => {
  const arr = Array.from({ length: 5});
  let days = 0;
  return (
    <>
      <input name="name"        placeholder="Name"/>
      <input name="description" placeholder="Description"/>
      <input name="notes"       placeholder="Notes"/>
      <button onClick={() => {

      }}>Add Day</button>
      
      {/*
      {arr.map((item, index) => (
        <Timeline key={index} day={index}/>
      ))}
      */}
    </>
  );
}

const getBodyFromForm = (formData) => {
  let treatment = /timeline_days\[(\d+)\]\.treatments\[(\d+)\]\.(\w+)/;
  for (const [key, value] of formData) {
    if (value === "") {
      continue;
    }
    console.log("value", value);
    const tokens = key.match(treatment);
    if (tokens && tokens.length === 4) {
      console.log("treatment", tokens[1], tokens[2], tokens[3], value);
    }
  }
  return JSON.stringify({});
}

export const AddProtocol = (props) => {
  return (
    <div className="AddProtocol">
      <DataCollectionAdd
        collection="reproduction.protocols"
        getBodyFromForm={getBodyFromForm}
        formElements={AddProtocolForm}
        onSuccess={props.onSuccess}
        duplicateMsg="Duplicate Protocol Found"
      />
    </div>
  );
}

export default AddProtocol;
