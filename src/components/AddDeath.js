import AreaDropdown from './AreaDropdown.js';
import DataCollectionAdd from './DataCollectionAdd.js';
import TagNumberInput from './TagNumberInput.js';
import DeathCauseDropdown from './DeathCauseDropdown.js';
import SexDropdown from './SexDropdown.js';
import DateInput from './DateInput';
const AddDeathForm = (props) => {
  return (
    <>
      <h3>Add Death</h3>
      <TagNumberInput/>
      <DeathCauseDropdown/>
      <SexDropdown/>
      <AreaDropdown/>
      <DateInput/>
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
