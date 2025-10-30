import DataCollection from './DataCollection';
import { useTranslation } from 'react-i18next';
export const Teams = (props) => {
  const { t } = useTranslation();
  const collection = "teams";
  const columns = [
    { name: t("name"),         selector: row => row.name},
    { name: t("phone_number"), selector: row => row.phone_number},
    { name: t("language"),     selector: row => row.lang},
  ];
  return (
    <DataCollection 
      title={t("team_title")} 
      collection={collection} 
      columns={columns}/>
  );
}
export default Teams;
