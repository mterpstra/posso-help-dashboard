import React, { useState } from 'react';
import DataCollection from './DataCollection';
import BreedDropdown from './BreedDropdown';
import SexDropdown from './SexDropdown';
import AreaDropdown from './AreaDropdown';
import PureBreedDropdown from './PureBreedDropdown';
import TagNumberInput from './TagNumberInput';
import Patch from "./Patch.js";
import { useTranslation } from 'react-i18next';

export const ListBirths = () => {
  const [refreshKey, setRefreshKey] = useState(0)
  const editSuccess = () => {
    setRefreshKey(refreshKey => refreshKey + 1)
  }

  const onChange = (e, field, id) => {

    let value = e.target.value;
    if (value === "true") {
      value = true;
    }
    if (value === "false") {
      value = false;
    }

    if (field === "tag") {
      value = parseInt(value, 10);
    }

    Patch("births", id, field, value,
      () => {
        setRefreshKey(refreshKey => refreshKey + 1)
      }
    )
  }
   
  const { t } = useTranslation();
  const collection = 'births';
  const columns = [
    {
      name: t("tag"),
      sortable: true,
      selector: row => row.tag,
      cell: row => <TagNumberInput
        value={row.tag}
        onBlur={(e) => {
          onChange(e, "tag", row._id);
        }}
      />
    },

    {
      name: t("breed"),
      sortable: true,
      selector: row => row.breed,
      cell: row => <BreedDropdown
        selected={row.breed}
        onChange={(e) => {onChange(e, "breed", row._id)}}
      />,
    },

    {
      name: t("sex"),   
      sortable: true,
      selector: row => row.sex,
      cell: row => <SexDropdown
        selected={row.sex}
        onChange={(e) => {onChange(e, "sex", row._id)}}
      />

    },

    {
      name: t("pure"),  
      sortable: true,
      selector: row => (row.pure_bread) ? "true" : "false",
      cell: row => <PureBreedDropdown
        selected={row.pure_bread}
        onChange={(e) => {onChange(e, "pure_bread", row._id)}}
      />
    },

    {
      name: t("area"),  
      sortable: true,
      selector: row => row.area,
      cell: row => <AreaDropdown
        selected={row.area}
        onChange={(e) => {onChange(e, "area", row._id)}}
      />
    },

    {name: t("date"),  selector: row => row.date.substring(0,10), sortable: true},
    {name: t("who"),   selector: row => row.created_by, sortable: true},
    {name: t("from"),  selector: row => row.phone, sortable: true},
  ];
  return (
    <>
      <DataCollection 
        // Forces refresh of child component (DataCollection)
        key={refreshKey}
        collection={collection} 
        columns={columns}/>
    </>
  );
}
export default ListBirths;
