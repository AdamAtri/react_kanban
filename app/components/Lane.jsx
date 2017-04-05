import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';
import Notes from './Notes';

const Lane = ({lane, notes, NoteActions, ...props}) => {
  // Function: addNote
  //  Connects to NoteActions and calls `create`
  const addNote = (e) => {
    e.stopPropagation();
    NoteActions.create({
      id: uuid.v4(),
      task: 'New task'
    });
  };
  // Function: deleteNote
  //  Deletes the note using NoteActions
  const deleteNote = (id, e) => {
    e.stopPropagation();
    NoteActions.delete(id);
  };

  // Function: editNote
  //  Updates the note
  const editNote = (id, task) => {
    NoteActions.update({id, task, editing: false});
  };

  // Functon: _enableEditing
  //  Creates a map function to enable editing on the specified id
  const enableEditing = (id) => {
    NoteActions.update({id, editing: true});
  };

  return(
    <div {...props}>
      <div className="lane-header">
        <div className="lane-add-note">
          <button onClick={addNote}>+</button>
        </div>
        <div className="lane-name">{lane.name}</div>
      </div>
      <Notes
        notes={notes}
        onNoteClick={enableEditing}
        onEdit={editNote}
        onDelete={deleteNote} />
    </div>
  );
};

export default connect(
  ({notes}) => ({notes}),
  { NoteActions }
)(Lane)
