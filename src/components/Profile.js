import DataCollection from './DataCollection';
import SuccessMessage from './SuccessMessage';
import React, { useState, useEffect } from 'react';

export const Profile = (props) => {
  const [profile, setProfile] = useState([]);
  const [success, setSuccess] = useState("");
  const [language, setLanguage] = useState("");
  const handleLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const submit = (formData) => {
    const token = localStorage.getItem('zapmanejo_token');
    const lang = formData.get("lang");
    const _id  = profile._id;
    const body = JSON.stringify({_id, lang});
    console.log("body", body);
    const url = `/api/data/users`;
    fetch(url, {
      method: 'PUT',
      headers: {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"application/json"
      },
      body: body,
    })
    .then(response => {
      if (response.status === 200) {
        setSuccess("Change Successful, please log out and log in again.");
      }
      if (response.status === 401) {
        localStorage.removeItem('zapmanejo_token');
        localStorage.removeItem('zapmanejo_user');
        window.location.reload();
      }
    })
    .then(data => {
      console.log("ERROR", data);
    })
    .catch(error => {
      console.error('Error updating form data:', error);
    });
  }

  useEffect(() => {
    const token = localStorage.getItem('zapmanejo_token');
    const url = `/api/data/users`;
    const fetchData = () => {
      fetch(url, {
        method: 'GET',
        headers: {
          "Authorization":`Bearer ${token}`,
          "Content-Type":"application/json"
        }
      })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('zapmanejo_token');
            localStorage.removeItem('zapmanejo_user');
            window.location.reload();
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProfile(data[0]);
        setLanguage(data[0].lang);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <form className="DataCollectionAdd" action={submit}>
          <h3>Change your preferred language</h3>
          <select name="lang" value={language} onChange={handleLanguage}>
            <option value="en-US">English</option>
            <option value="pt-BR">Portuguese</option>
          </select>
          <button type="submit">Update</button>
          <SuccessMessage message={success}/>
        </form>
      </div>
    </div>
  );
}
export default Profile;
