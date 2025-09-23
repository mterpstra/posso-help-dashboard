import AreaDropdown from './AreaDropdown.js';
import DataCollectionAdd from './DataCollectionAdd.js';

const AddTeamForm = (props) => {
  return (
    <>
      <h3>Add Team Member</h3>
      <input type="text" name="name" 
             placeholder="Name" required/>
      <input type="text" name="phone_number" 
             placeholder="Phone Number" required/>
    </>
  );
}

const getBodyFromForm = (formData) => {
  const name = formData.get("name");
  const phone_number = formData.get("phone_number");
  return JSON.stringify({ name, phone_number});
}

export const AddTeam = (props) => {
  return (
    <DataCollectionAdd
      collection="teams"
      getBodyFromForm={getBodyFromForm}
      formElements={AddTeamForm}
      onSuccess={props.onSuccess}
    />
  );
}

export default AddTeam;
