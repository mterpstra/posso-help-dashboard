import { useTranslation } from 'react-i18next';
import DataCollectionAdd from './DataCollectionAdd.js';
import AreaDropdown from './AreaDropdown.js';
import TagNumberInput from './TagNumberInput.js';
import SexDropdown from './SexDropdown.js';
import BreedDropdown from './BreedDropdown.js';
import DateInput from './DateInput.js';

const AddBirthForm = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <TagNumberInput/>
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
  return JSON.stringify({tag, breed, sex, area, date});
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
