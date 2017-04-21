import React from 'react';
import connect from '../libs/connect';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import LaneHeader from './LaneHeader';
// Import Drag-n-Drop packs
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const Lane = ({ connectDropTarget, lane, notes,
                LaneActions, NoteActions, ...props }) => {

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

  // wrap lane in the DropTarget context
  return connectDropTarget(
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

// Spec: noteTarget (DropTarget)
//  NoteTarget is a JS object that descibes how the
//  lane will respond to having a draggable dropped onto it.
//  *all functions here are optional (can support `hover`, `drop`, and `canDrop`)
//  see: https://react-dnd.github.io/react-dnd/docs-drop-target.html
const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    // If the target lane doesn't have notes,
    //  attach the note to it.
    //  `attachToLane` performs cleanup by default
    //  and it guarantees a note can belong only
    //  a single lane at a time
    if (! targetProps.lane.notes.length ) {
      LaneActions.attachToLane({
        laneId: targetProps.lane.id,
        noteId: sourceId
      });
    }
  }
};

// injects the NoteStore as 'notes' into Lanes
//  and wraps the component in DropTarget context.
export default compose(
  DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  connect(
    ({notes}) => ({notes}),
    { NoteActions, LaneActions }
  )
)(Lane)
