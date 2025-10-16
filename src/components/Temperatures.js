import DataCollection from './DataCollection.js';
import { useTranslation } from 'react-i18next';
export const Temperatures = (props) => {
  const { t } = useTranslation();
  const collection = 'temperature';
  const columns = [
    {name: t("temperature"), selector: row => `${row.temperature} celcius`, sortable:true},
    {name: t("date"),        selector: row => row.date,  sortable:true},
    {name: t("who"),         selector: row => row.name,  sortable:true},
    {name: t("from"),        selector: row => row.phone, sortable:true},
  ];
  return (
    <DataCollection 
      title={t("temperature_title")} 
      collection={collection} 
      columns={columns}/>
  );
}
export default Temperatures;
