import DataCollection from './DataCollection';
import DataCellInput from './DataCellInput';
import DataCellDropdown from './DataCellDropdown';
import { useTranslation } from 'react-i18next';

export const ListBirths = () => {

  const sexOptions = [
    {name:"Male",   value: "m"},
    {name:"Female", value: "f"},
  ];

  const breedOptions = [
    {name:"Angus",     value:"angus"},
    {name:"Nalore",    value:"nalore"},
    {name:"Brangus",   value:"brangus"},
    {name:"Sta Zelia", value:"sta_zelia"},
    {name:"Cruzado",   value:"cruzado"},
  ];
   
  const { t } = useTranslation();
  const collection = 'births';
  const columns = [
    {
      name: t("tag"),
      sortable: true,
      cell: row => <DataCellInput
        collection="births"
        field="tag"
        id={row._id}
        initialValue={row.tag}
      />
    },

    {
      name: t("breed"),
      sortable: true,
      cell: row => <DataCellDropdown
        collection="births"
        options={breedOptions}
        field="breed"
        id={row._id}
        initialValue={row.breed}
      />
    },

    {
      name: t("sex"),   
      sortable: true,
      cell: row => <DataCellDropdown
        collection="births"
        options={sexOptions}
        field="sex"
        id={row._id}
        initialValue={row.sex}
      />
    },


    {
      name: t("pure"),  
      selector: (row) => (row.pure_breed) ? "true" : "false", 
      sortable: true
    },




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
