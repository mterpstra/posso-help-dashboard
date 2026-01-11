import DataCollectionAdd from './DataCollectionAdd.js';
import AreaDropdown from './AreaDropdown.js';
import TagNumberInput from './TagNumberInput.js';
import SexDropdown from './SexDropdown.js';
import BreedDropdown from './BreedDropdown.js';
import DateInput from './DateInput.js';
import DeathCauseDropdown from './DeathCauseDropdown.js';

const AddBirthForm = (props) => {
  return (
    <>
      <TagNumberInput edit={true}/>
      <BreedDropdown/>
      <SexDropdown/>
      <AreaDropdown/>
      <DeathCauseDropdown/>
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
  return JSON.stringify({tag, breed, sex, area, cause, date});
}

export const AddBirth = (props) => {
  return (
    <DataCollectionAdd
      collection="births"
      getBodyFromForm={getBodyFromForm}
      formElements={AddBirthForm}
      onSuccess={props.onSuccess}
      duplicateMsg="Birth with that tag already exists."
    />
  );
}

export default AddBirth;
