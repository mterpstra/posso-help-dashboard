import AreaDropdown from './AreaDropdown.js';
import DataCollectionAdd from './DataCollectionAdd.js';

const AddDeathForm = (props) => {
  return (
    <>
      <h3>Add Death</h3>
      <input type="number" name="tag" 
             placeholder="Tag Number" required/>
      <select name="sex">
        <option value="m">Male</option>
        <option value="f">Female</option>
      </select>
      <select name="cause">
        <option value="aborto">Aborto</option>
        <option value="morreu">Morreu</option>
        <option value="morto">Morto</option>
        <option value="nasceu-morto">Nasceu Morto</option>
        <option value="natimorto">Natimorto</option>
        <option value="Natimortos">Natimortos</option>
        <option value="other">Other</option>
      </select>
      <AreaDropdown/>
      <input type="date" name="date" required/>
    </>
  );
}

const getBodyFromForm = (formData) => {
  const tag   = Number(formData.get("tag"));
  const sex   = formData.get("sex");
  const cause = formData.get("cause");
  const area  = formData.get("area");
  const date  = formData.get("date");
  return JSON.stringify({tag, sex, cause, area, date})
}

export const AddDeath = (props) => {
  return (
    <DataCollectionAdd
      collection="deaths"
      getBodyFromForm={getBodyFromForm}
      formElements={AddDeathForm}
      onSuccess={props.onSuccess}
    />
  );
}

export default AddDeath;
