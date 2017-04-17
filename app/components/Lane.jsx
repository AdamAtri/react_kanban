import React from 'react';
import connect from '../libs/connect';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import LaneHeader from './LaneHeader';

const Lane = ({lane, notes, LaneActions, NoteActions, ...props}) => {

  // Function: deleteNote
  //  Connects to NoteActions to call `delete`
  const deleteNote = (noteId, e) => {
    e.stopPropagation();
    LaneActions.detachFromLane({
      laneId: lane.id,
      noteId: noteId
    });
    NoteActions.delete(noteId);
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
      <LaneHeader lane={ lane } />
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
