import React, { useState, useEffect } from 'react';
import "./Births.css";

const Births = () => {
  const [births, setBirthData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('zapmanejo_token');
    const url = '/api/data/births/16166100305';
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setBirthData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    }

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const birthList = births.map((item, index) => (
    <Birth key={index} id={index} birth={item} />
  ));

  return (
    <table className="Births">
      <thead>
        <tr>
          <td>Tag</td>
          <td>Area</td>
          <td>Breed</td>
          <td>Date</td>
          <td>Pure</td>
          <td>Sex</td>
        </tr>
      </thead>
      <tbody>
        {birthList}
      </tbody>
    </table>
  );
}

const Birth = (props) => {
  return (
    <tr>
      <td>{props.birth.tag}</td>
      <td>{props.birth.area}</td>
      <td>{props.birth.breed}</td>
      <td>{props.birth.date}</td>
      <td>{(props.birth.pure_bread) ? "yes" : "no"}</td>
      <td>{props.birth.sex}</td>
    </tr>
  );
}

export default Births;
