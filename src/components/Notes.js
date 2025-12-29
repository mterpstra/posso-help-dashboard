import React, { useState } from 'react';
import "./Notes.css";
import Patch from "./Patch.js";
const Note = (props) => {
  return (
    <div className="Note">
      <div>
        <span className="CreatedOn">{props.item.created_on}</span>
        <span className="CreatedBy">{props.item.created_by}</span>
      </div>
      <div className="NoteText">{props.item.note}</div>
    </div>
  );
}

const Notes = (props) => {
  const [notes, setNotes] = useState(props.notes);

  const handleNewNote = (e) => {
    const user = JSON.parse(localStorage.getItem('zapmanejo_user'));
    let name = user.email;
    if (user.username !== "") {
      name = user.username;
    }
    if (user.name !== "") {
      name = user.name;
    }
    const currentDate = new Date();
    const date = currentDate.toISOString().split('T')[0]
    const field = `notes.${notes.length}`;
    const new_note = {
      "created_by": name,
      "created_on": date,
      "note":e.target.value
    }
    Patch("reproduction.active", props.id, field, new_note,
      () => {
        e.target.value = "";
        setNotes([...notes, new_note]);
      });
  }

  const notesList = notes.map((item, index) => (
    <Note key={index} id={index} item={item}/>
  ));

  return (
    <div className="NoteList">
      {notes != undefined &&
       notes != null      && 
       notes.length != 0  &&
        notesList
      }
      <input placeholder="Add New Note" name="add-note" onBlur={handleNewNote}/>
      <button>Add</button>
    </div>
  );
}

export default Notes;
