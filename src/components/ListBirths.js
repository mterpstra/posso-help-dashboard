import React, { useState, useEffect } from 'react';
import DataCollection from './DataCollection';
import BreedDropdown from './BreedDropdown';
import SexDropdown from './SexDropdown';
import AreaDropdown from './AreaDropdown';
import DeathCauseDropdown from './DeathCauseDropdown';
import TagNumberInput from './TagNumberInput';
import DateInput from './DateInput.js';
import Patch from "./Patch.js";
import { useTranslation } from 'react-i18next';
import { daysSince, Fetch } from './Utils.js';

const DateToAgeCategory = (date) => {
  // Roughly 30 days per month.
  const months = Math.floor(daysSince(date)/30);
  if (months >= 0 && months <= 12) {
    return "0-12 months";
  }
  if (months >= 13 && months <= 24) {
    return "13-24 months";
  }
  if (months >= 25 && months <= 36) {
    return "25-36 months";
  }
  return "37+ months";
}

export const ListBirths = () => {
  const [refreshKey, setRefreshKey] = useState(0)
  const [areas, setAreas] = useState([])

  useEffect(() => {
    Fetch("api/data/areas", "get", null, 
      (data) => {
        setAreas(data);
        setRefreshKey(refreshKey => refreshKey + 1);
      },
      () => {console.log("error loading areas")}
    );
  }, []);

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
        console.log("success");
        setRefreshKey(refreshKey => refreshKey + 1);
      },
      () => { console.log("error")},
    );
  }
   
  const { t } = useTranslation();
  const collection = 'births';
  const columns = [
    {
      name: t("tag"),
      sortable: true,
      selector: row => row.tag,
      cell: row => <TagNumberInput
        edit={false}
        value={row.tag}
        onBlur={(e) => {onChange(e, "tag", row._id)}}
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
      name: t("age"),
      sortable: true,
      selector: row => DateToAgeCategory(row.date),
    },

{
      name: t("area"),  
      sortable: true,
      selector: row => row.area,
      cell: row => <AreaDropdown
        selected={row.area}
        areas={areas}
        onChange={(e) => {onChange(e, "area", row._id)}}
      />
    },

    {
      name: t("cause"),  
      sortable: true,
      selector: row => row.cause,
      cell: row => <DeathCauseDropdown
        selected={row.cause}
        onChange={(e) => {onChange(e, "cause", row._id)}}
      />
    },

    {
      name: t("birth_date"),  
      selector: row => row.date.substring(0,10), 
      sortable: true,
      cell: row => <DateInput
        date={row.date.substring(0,10)}
        onChange={(value) => {
          Patch("births", row._id, "date", value,
            () => {console.log("success")},
            () => {console.log("error")},
          );
        }}
      />
    },

    {
      name: t("who"),
      selector: row => row.created_by,
      sortable: true
    },

    {
      name: t("from"),
      selector: row => row.phone,
      sortable: true
    },
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
