import AreaDropdown from './AreaDropdown.js';
import DataCollectionAdd from './DataCollectionAdd.js';

const AddRainForm = (props) => {
  return (
    <>
      <input type="number" name="amount" 
             placeholder="Rainfall in mm" required/>
      <AreaDropdown/>
      <input type="date" name="date" required/>
    </>
  );
}

const getBodyFromForm = (formData) => {
  const amount = Number(formData.get("amount"));
  const area  = formData.get("area");
  const date  = formData.get("date");
  return JSON.stringify({amount, area, date});
}

export const AddRain = (props) => {
  return (
    <DataCollectionAdd
      collection="rain"
      getBodyFromForm={getBodyFromForm}
      formElements={AddRainForm}
      onSuccess={props.onSuccess}
    />
  );
}

export default AddRain;
