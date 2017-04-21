import React from 'react';
import Note from './Note';
import Editable from './Editable';
import LaneActions from '../actions/LaneActions';

// >>>> EXPORT: an unordered list of Editable Notes
export default ({ notes, onNoteClick=()=>{}, onDelete=()=>{}, onEdit=()=>{} }) => (
  <ul className="notes">{
    // expand <note> in the map closure
    notes.map(({id, editing, task}) =>
      <li key={id}>
        <Note className="note" id={id}
          editing={editing}
          onClick={onNoteClick.bind(null, id)}
          onMove={LaneActions.move} >
          <Editable
            className="editable"
            editing={editing}
            value={task}
            onEdit={onEdit.bind(null, id)} />
          <button
            className="delete"
            onClick={onDelete.bind(null, id)}>X</button>
        </Note>
      </li>)
  }</ul>
)
