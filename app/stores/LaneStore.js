import LaneActions from '../actions/LaneActions';

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
}
