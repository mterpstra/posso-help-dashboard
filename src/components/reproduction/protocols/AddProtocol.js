import DataCollectionAdd from '../../DataCollectionAdd.js';
//import AreaDropdown from './AreaDropdown.js';
//import TagNumberInput from './TagNumberInput.js';
//import SexDropdown from './SexDropdown.js';
//import BreedDropdown from './BreedDropdown.js';
//import DateInput from './DateInput.js';
//import DeathCauseDropdown from './DeathCauseDropdown.js';

const AddProtocolForm = (props) => {
  return (
    <>
      <input name="name"        placeholder="Name"/>
      <input name="description" placeholder="Description"/>
      <input name="notes"       placeholder="Notes"/>
    </>
  );
}

const getBodyFromForm = (formData) => {
  const name        = formData.get("name");
  const description = formData.get("description");
  const notes       = formData.get("notes");
  return JSON.stringify({name, description, notes});
}

export const AddProtocol = (props) => {
  return (
    <DataCollectionAdd
      collection="reproduction.protocols"
      getBodyFromForm={getBodyFromForm}
      formElements={AddProtocolForm}
      onSuccess={props.onSuccess}
      duplicateMsg="Duplicate Protocol Found"
    />
  );
}

export default AddProtocol;
