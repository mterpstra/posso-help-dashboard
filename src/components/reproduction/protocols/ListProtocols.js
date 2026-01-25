import DataCollection from '../../DataCollection';
import { useTranslation } from 'react-i18next';
import './ReproductionProtocols.css';
export const List = (props) => {
  const { t } = useTranslation();
  const collection = "reproduction.protocols";
  const columns = [
    { name: t("name"),         selector: row => row.name},
    { name: t("description"),  selector: row => row.description},
    { name: t("notes"),        selector: row => row.notes},
  ];
  return (
    <div className="ReproductionProtocols">
      <DataCollection 
        //title={t("reproduction-protocols")}
        collection={collection} 
        columns={columns}/>
    </div>
  );
}
export default List;
