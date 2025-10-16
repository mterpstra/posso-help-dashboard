import DataCollection from './DataCollection';
import { useTranslation } from 'react-i18next';
export const Areas = (props) => {
  const { t } = useTranslation();
  const collection = 'areas'
  const columns = [
    {name: t("area"),      selector: row => row.name},
    {name: t("nicknames"), selector: row => row.matches},
  ];
  return (
    <DataCollection 
      title={t("areas_title")} 
      collection={collection} 
      columns={columns}/>
  );
}
export default Areas;
