import { useTranslation } from 'react-i18next';
import DataCollectionAdd from './DataCollectionAdd.js';

const AddAreaForm = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <h3>{t("area_add")}</h3>
      <input type="text" name="name" 
        placeholder="Area" required/>
      <input type="text" name="matches" 
        placeholder="Nicknames" required/>
    </>
  );
}

const getBodyFromForm = (formData) => {
  const name = formData.get("name");
  const matches = `${name},${formData.get("matches")}`
  return JSON.stringify({ name, matches });
}

export const AddArea = (props) => {
  return (
    <DataCollectionAdd
      collection="areas"
      getBodyFromForm={getBodyFromForm}
      formElements={AddAreaForm}
      onSuccess={props.onSuccess}
    />
  );
}

export default AddArea;
