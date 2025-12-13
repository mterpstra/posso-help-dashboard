import DataCollectionAdd from './DataCollectionAdd.js';
import AreaDropdown from './AreaDropdown.js';
import TagNumberInput from './TagNumberInput.js';
import SexDropdown from './SexDropdown.js';
import BreedDropdown from './BreedDropdown.js';
import DateInput from './DateInput.js';

const AddReproductionNoteForm = (props) => {
  return (
    <>
      <div>
        AddReproductionNoteForm
      </div>
    </>
  );
}

const getBodyFromForm = (formData) => {
  const tag   = Number(formData.get("tag"));
  const date  = formData.get("date");
  const note  = formData.get("note");
  return JSON.stringify({tag, date, note});
}

export const AddReproductionNote = (props) => {
  return (
    <div>
      AddReproductionNote
    </div>
  );
}

export default AddReproductionNote;
