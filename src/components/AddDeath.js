import DataCollectionAdd from './DataCollectionAdd.js';
import AreaDropdown from './AreaDropdown.js';
import TagNumberInput from './TagNumberInput.js';
import SexDropdown from './SexDropdown.js';
import BreedDropdown from './BreedDropdown.js';
import DeathCauseDropdown from './DeathCauseDropdown.js';
import DateInput from './DateInput';
const AddDeathForm = (props) => {
  return (
    <>
      <TagNumberInput/>
      <DeathCauseDropdown/>
      <BreedDropdown/>
      <SexDropdown/>
      <AreaDropdown/>
      <DateInput/>
    </>
  );
}

const getBodyFromForm = (formData) => {
  const tag   = Number(formData.get("tag"));
  const breed = formData.get("breed");
  const sex   = formData.get("sex");
  const area  = formData.get("area");
  const date  = formData.get("date");
  const cause = formData.get("cause");
  return JSON.stringify({tag, breed, sex, area, date, cause})
}

export const AddDeath = (props) => {
  return (
    <DataCollectionAdd
      collection="deaths"
      getBodyFromForm={getBodyFromForm}
      formElements={AddDeathForm}
      onSuccess={props.onSuccess}
      duplicateMsg="Death with that tag already exists."
    />
  );
}

export default AddDeath;
