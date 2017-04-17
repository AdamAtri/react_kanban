import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';

const Lane = ({lane, notes, LaneActions, NoteActions, ...props}) => {
  // Function: addNote
  //  Connects to NoteActions and calls `create`
  const addNote = (e) => {
    e.stopPropagation();
    const noteId = uuid.v4();
    NoteActions.create({
      id: noteId,
      task: 'New task'
    });
    LaneActions.attachToLane({
      laneId: lane.id,
      noteId: noteId
    });
  };
  // Function: deleteNote
  //  Connects to NoteActions to call `delete`
  const deleteNote = (noteId, e) => {
    e.stopPropagation();
    LaneActions.detachFromLane({
      laneId: lane.id,
      noteId: noteId
    });
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
        notes={selectNotesByIds(notes, lane.notes)}
        onNoteClick={enableEditing}
        onEdit={editNote}
        onDelete={deleteNote} />
    </div>
  );
};

function selectNotesByIds(allNotes, noteIds=[ ]) {
  return noteIds.reduce((notes, id) =>
    notes.concat(allNotes.filter(note => note.id === id)
  ), [ ]);
}

// injects the NoteStore as 'notes' into Lanes
export default connect(
  ({notes}) => ({notes}),
  { NoteActions, LaneActions }
)(Lane)
