import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Fetch } from './Utils.js';
export const AreaDropdown = (props) => {
  const { t } = useTranslation();
  const [areas, setAreaData] = useState([]);
  useEffect(() => {
    if (props.areas != null) {
      setAreaData(props.areas);
      return;
    }
    Fetch("api/data/areas", "get", null, 
      (data) => {
        setAreaData(data);
      },
      () => {console.log("error loading areas")}
    );
  }, [props.areas]);


  const Option = (props) => {
    if (props.selected === props.value) {
      return <option value={props.value}
                     selected="selected">{props.name}</option>
    }
    return <option value={props.value}>{props.name}</option>
  }

  return (
    <select name="area" onChange={props.onChange} 
            style={props.style} value={props.selected || ""}>
      {props.showAll &&
       <option value="">{t("all_areas")}</option>
      }
      {props.showUnknown &&
        <option value="unknown">{t("unknown")}</option>
      }
      {areas.map((area) => (
        <Option key={area.name} 
          value={area.name} 
          name={area.name}
          selected={props.selected}
        />
      ))}
    </select>
  );
}
export default AreaDropdown;
