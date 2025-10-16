import DataCollection from './DataCollection';
import { useTranslation } from 'react-i18next';
export const Rainfall = (props) => {
  const { t } = useTranslation();
  const collection = "rain";
  const columns = [
    {name: t("amount"), selector: row => `${row.amount}mm`, sortable:true},
    {name: t("date"),   selector: row => row.date,  sortable:true},
    {name: t("area"),   selector: row => row.area,  sortable:true},
    {name: t("who"),    selector: row => row.name,  sortable:true},
    {name: t("from"),   selector: row => row.phone, sortable:true},
  ];
  return (
    <DataCollection 
      title={t("rainfall_title")} 
      collection={collection} 
      columns={columns}/>
  );
}
export default Rainfall;
