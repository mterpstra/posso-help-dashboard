import DataCollection from './DataCollection';
import { useTranslation } from 'react-i18next';
export const ListBirths = () => {
  const { t } = useTranslation();
  const collection = 'births';
  const columns = [
    {name: t("tag"),   selector: row => row.tag, sortable: true},
    {name: t("breed"), selector: row => row.breed, sortable: true},
    {name: t("sex"),   selector: row => row.sex,sortable: true},
    {name: t("pure"),  selector: (row) => (row.pure_breed) ? "true" : "false", sortable: true},
    {name: t("area"),  selector: row => row.area, sortable: true},
    {name: t("date"),  selector: row => row.date.substring(0,10), sortable: true},
    {name: t("who"),   selector: row => row.created_by, sortable: true},
    {name: t("from"),  selector: row => row.phone, sortable: true},
  ];
  return (
    <>
      <DataCollection 
        collection={collection} 
        columns={columns}/>
    </>
  );
}
export default ListBirths;
