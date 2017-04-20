import React from 'react';
import Note from './Note';
import Editable from './Editable';

// >>>> EXPORT: an unordered list of Editable Notes
export default ({ notes, onNoteClick=()=>{}, onDelete=()=>{}, onEdit=()=>{} }) => (
  <ul className="notes">{
    notes.map((note) =>
      <li key={note.id}>
        <Note
          className="note"
          onClick={onNoteClick.bind(null, note.id)}
          id={note.id}
          onMove={({sourceId, targetId}) => console.log('moving from', sourceId, ' to', targetId)}>
          <Editable
            className="editable"
            editing={note.editing}
            value={note.task}
            onEdit={onEdit.bind(null, note.id)} />
          <button
            className="delete"
            onClick={onDelete.bind(null, note.id)}>X</button>
        </Note>
      </li>)
  }</ul>
)
