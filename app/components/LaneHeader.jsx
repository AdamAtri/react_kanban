import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';
import LaneActions from '../actions/LaneActions';
import Editable from './Editable';

export default connect(() => ({}), {NoteActions, LaneActions})(
  ({lane, LaneActions, NoteActions, ...props}) => {
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
    // Function: enableEditing
    //  Activates the <Editable> element
    const enableEditing = () => {
      LaneActions.update({
        id: lane.id,
        editing: true
      });
    };
    // Function: editTitle
    //  Change the title of the lane
    const editTitle = title => {
      LaneActions.update({
        id: lane.id,
        name: title,
        editing: false
      });
    }

    return (
      <div className="lane-header" onClick={enableEditing}>
        <div className="lane-add-note">
          <button onClick={addNote}>+</button>
        </div>
        <Editable
          className="lane-name"
          editing={lane.editing}
          value={lane.name}
          onEdit={editTitle} />
      </div>
    );
  }
)
