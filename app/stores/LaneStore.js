import LaneActions from '../actions/LaneActions';
import _update from 'react-addons-update';

export default class LaneStore {
  constructor() {
    this.bindActions(LaneActions);
    this.lanes = [ ];
  }
  create(lane) {
    // create an empty array for <Notes> if one wasn't supplied
    //  with <lane>
    lane.notes = lane.notes || [ ];
    this.setState({
      lanes: this.lanes.concat(lane)
    });
  }
  update(updatedLane) {
    this.setState({
      lanes: this.lanes.map( lane => {
        if (lane.id === updatedLane.id)
          return Object.assign({}, lane, updatedLane);
        return lane;
      })
    });
  }
  delete(laneId) {
    this.setState({
      lanes: this.lanes.filter( lane => lane.id !== laneId )
    });
  }

  // Function: move
  //  Moves the reference for a note
  move({sourceId, targetId}) {
    const lanes = this.lanes;
    const sourceLane = lanes.filter(lane => lane.notes.includes(sourceId))[0];
    const targetLane = lanes.filter(lane => lane.notes.includes(targetId))[0];
    // if we haven't found both the source and the target lanes, abort.
    if (!(sourceLane && targetLane)) {
      console.error('Error: sourceLane and targetLane not defined.', sourceLane, targetLane);
      return;
    }
    // get the indicies of the prospective notes. 
    const sourceNoteIndex = sourceLane.notes.indexOf(sourceId);
    const targetNoteIndex = targetLane.notes.indexOf(targetId);
    if (sourceLane === targetLane) {
      // move at once to avoid complications
      sourceLane.notes = _update(sourceLane.notes, {
        $splice: [
          [sourceNoteIndex, 1],
          [targetNoteIndex, 0, sourceId]
        ]
      });
    }
    else {
      // get rid of the source
      sourceLane.notes.splice(sourceNoteIndex, 1);
      // and move it to target
      targetLane.notes.splice(targetNoteIndex, 0, sourceId);
    }
    this.setState({lanes});
  }

  // Function: attachToLane
  //  Inserts the provided noteId into the lane's <lane.notes> array
  attachToLane({laneId, noteId}) {
    this.setState({
      lanes: this.lanes.map((lane) => {
        // a rough check to see if the noteId already belongs to a lane,
        //  removing it if it does
        if (lane.notes && lane.notes.includes(noteId)) {
          lane.notes = lane.notes.filter((note) => note !== noteId);
        }
        // attach the note to the lane
        if (lane.id === laneId) {
          lane.notes = lane.notes.concat( [noteId] );
        }
        return (lane);
      })
    });
  }
  // Function: detachFromLane
  //  Removes the provided noteId into the lane's <lane.notes> array
  detachFromLane({laneId, noteId}) {
    this.setState({
      lanes: this.lanes.map((lane) => {
        if (lane.id === laneId) {
          lane.notes = lane.notes.filter( note => note !== noteId );
        }
        return (lane);
      })
    });
  }


}
