import React, { useState, useEffect } from 'react';
import ListPhoneNumbers from './ListPhoneNumbers.js';
import AddPhoneNumber from './AddPhoneNumber.js';
import './Teams.css';
export const Teams = (props) => {
  const [profile, setProfile] = useState({});
  const [update, setUpdate] = useState(false);
  const onAddPhoneNumberSuccess = () => {
    setUpdate(!update);
  }
  const token = localStorage.getItem('zapmanejo_token');
  const url = '/api/user';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          }});
        if (!response.ok) {
          // @todo:  Probably need to check the "success" flag.
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProfile(result);
      } catch (err) {
        console.log("error", err);
      } 
    };
    fetchData();
  }, [update]);

  return (
    <div className="Teams">
      <ListPhoneNumbers 
        phone_numbers={profile.phone_numbers}/>
      <AddPhoneNumber 
        onSuccess={onAddPhoneNumberSuccess}/>
    </div>
  );
}
export default Teams;
