import DataCollection from './DataCollection.js';
import { useTranslation } from 'react-i18next';
export const ListTemperatures = (props) => {
  const { t } = useTranslation();
  const collection = 'temperatures';
  const columns = [
    {name: t("temperature"), selector: row => `${row.temperature} celcius`, sortable:true},
    {name: t("date"),        selector: row => row.date,       sortable:true},
    {name: t("who"),         selector: row => row.created_by, sortable:true},
    {name: t("from"),        selector: row => row.phone,      sortable:true},
  ];
  return (
    <DataCollection 
      collection={collection} 
      columns={columns}/>
  );
}
export default ListTemperatures;
