import React from 'react';
import Note from './Note';
import Editable from './Editable';

// >>>> EXPORT: an unordered list of Editable Notes
export default ({ notes, onNoteClick=()=>{}, onDelete=()=>{}, onEdit=()=>{} }) => (
  <ul>{
    notes.map((note) =>
      <li key={note.id}>
        <Note onClick={onNoteClick.bind(null, note.id)}>
          <Editable
            editing={note.editing}
            value={note.task}
            onEdit={onEdit.bind(null, note.id)} />
          <button onClick={onDelete.bind(null, note.id)}>X</button>
        </Note>
      </li>)
  }</ul>
)
