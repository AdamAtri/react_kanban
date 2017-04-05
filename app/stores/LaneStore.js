import LaneActions from '../actions/LaneActions';

export default class LaneStore {
  constructor() {
    // bind this to the <LaneActions> action-creator
    this.bindActions(LaneActions);
    // initialize an array for <Lanes>
    this.lanes = [ ];
  }

  // Function: create
  create(lane) {
    // initialize a notes array - establishes a 1:many relationship with Notes.
    lane.notes = lane.notes || [ ];
    this.setState({
      lanes: this.lanes.concat(lane)
    });
  }

  // Function: delete
  delete(id) {
    this.setState({
      lanes: this.lanes.filter((lane) => { lane.id !== id })
    });
  }

}
