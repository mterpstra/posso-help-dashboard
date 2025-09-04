import React, { useState, useEffect } from 'react';
import './ListPhoneNumbers.css';
export const ListPhoneNumbers = (props) => {

  if (props == null) return;
  if (props.phone_numbers == null) return;
  if (props.phone_numbers.length == 0) return;
  return (
    <div className="ListPhoneNumbers">
      <h3>Linked Phone Numbers</h3>
      {/* @todo: Need to delete numbers */}
      {props.phone_numbers.map((phone, index) => (
        <div key={index}>{phone}</div>
      ))}
    </div>
  );
}
export default ListPhoneNumbers;
