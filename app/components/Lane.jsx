import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';

const Lane = ({lane, notes, NoteActions, ...props}) => {
  // Function: addNote
  //  Connects to NoteActions and calls `create`
  const addNote = (e) => {
    e.stopPropagation();
    const noteId = uuid.v4();
    NoteActions.create({
      id: noteId,
      task: 'New task'
    });
  };
  // Function: deleteNote
  //  Connects to NoteActions to call `delete`
  const deleteNote = (noteId, e) => {
    e.stopPropagation();
    this.props.NoteActions.delete(noteId);
  };

  const editNote = (id, task) => {
    NoteActions.update({id, task, editing: false});
  };

  // Functon: _enableEditing
  //  Creates a map function to enable editing on the specified id
  const enableEditing = (id) => {
    NoteActions.update({id, editing: true});
  };

  return (
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

// injects the NoteStore as 'notes' into Lanes
export default connect(
  ({notes}) => ({notes}),
  { NoteActions }
)(Lane)
