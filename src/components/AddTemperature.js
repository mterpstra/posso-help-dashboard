import AreaDropdown from './AreaDropdown.js';
import DataCollectionAdd from './DataCollectionAdd.js';

const AddTemperatureForm = (props) => {
  return (
    <>
      <h3>Add Temperature</h3>
      <input type="number" name="temperature" 
             placeholder="Temperature (celcius)" required/>
      <AreaDropdown/>
      <input type="date" name="date" required/>
    </>
  );
}

const getBodyFromForm = (formData) => {
  const temperature = Number(formData.get("temperature"));
  const area  = formData.get("area");
  const date  = formData.get("date");
  return JSON.stringify({temperature, area, date})
}

export const AddTemperature = (props) => {
  return (
    <DataCollectionAdd
      collection="temperature"
      getBodyFromForm={getBodyFromForm}
      formElements={AddTemperatureForm}
      onSuccess={props.onSuccess}
    />
  );
}

export default AddTemperature;
