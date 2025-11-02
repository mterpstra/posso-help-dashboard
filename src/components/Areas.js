import DataCollection from './DataCollection';
import { useTranslation } from 'react-i18next';
export const Areas = (props) => {
  const { t } = useTranslation();
  const collection = 'areas'
  const columns = [
    {name: t("area"),       selector: row => row.name},
    {name: t("nicknames"),  selector: row => row.matches},
    {name: t("created_by"), selector: row => row.created_by},
  ];
  return (
    <DataCollection 
      title={t("areas_title")} 
      collection={collection} 
      columns={columns}/>
  );
}
export default Areas;
