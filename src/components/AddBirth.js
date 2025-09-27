import AreaDropdown from './AreaDropdown.js';
import DataCollectionAdd from './DataCollectionAdd.js';

const AddBirthForm = (props) => {
  return (
    <>
      <h3>Add Birth</h3>
      <input type="number" name="tag" 
             placeholder="Tag Number" required/>
      <select name="breed">
        <option value="angus">Angus</option>
        <option value="nelore">Nelore</option>
        <option value="brangus">Brangus</option>
        <option value="sta_zelia">Sta Zelia</option>
        <option value="cruzado">Cruzado</option>
      </select>
      <select name="sex">
        <option value="m">Male</option>
        <option value="f">Female</option>
      </select>
      <AreaDropdown/>
      <input type="date" name="date" required/>
    </>
  );
}

const getBodyFromForm = (formData) => {
  const tag   = Number(formData.get("tag"));
  const breed = formData.get("breed");
  const sex   = formData.get("sex");
  const area  = formData.get("area");
  const date  = formData.get("date");
  return JSON.stringify({tag, breed, sex, area, date});
}

export const AddBirth = (props) => {
  return (
    <DataCollectionAdd
      collection="births"
      getBodyFromForm={getBodyFromForm}
      formElements={AddBirthForm}
      onSuccess={props.onSuccess}
    />
  );
}

export default AddBirth;
