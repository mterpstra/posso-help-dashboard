import DataCollectionAdd from './DataCollectionAdd.js';
import TagNumberInput from './TagNumberInput.js';
import ProtocolDropdown from './ProtocolDropdown.js';
import ReproductionStatusDropdown from './ReproductionStatusDropdown.js';
import DateInput from './DateInput.js';

const AddReproductionForm = (props) => {
  return (
    <>
      <TagNumberInput/>
      <input name="nickname" placeholder="Nickname"/>
      <ProtocolDropdown/>
      <DateInput name="start_date" prompt="Start Date"/>
      <DateInput name="predicted_iatf" prompt="Predicted IATF Date" />
      <ReproductionStatusDropdown name="status"/>
      
    </>
  );
}

const getBodyFromForm = (formData) => {
  const tag = Number(formData.get("tag"));
  const nickname = formData.get("nickname");
  const protocol_name = formData.get("protocol_name");
  const start_date  = formData.get("start_date");
  const predicted_iatf = formData.get("predicted_iatf");
  const status = formData.get("status");
  return JSON.stringify({
    tag, nickname, protocol_name, 
    start_date, predicted_iatf, status,
  });
}

export const AddReproduction = (props) => {
  return (
    <DataCollectionAdd
      collection = "reproduction.active"
      getBodyFromForm={getBodyFromForm}
      formElements={AddReproductionForm}
      onSuccess={props.onSuccess}
      duplicateMsg="Reproduction with that tag already exists."
    />
  );
}

export default AddReproduction;
