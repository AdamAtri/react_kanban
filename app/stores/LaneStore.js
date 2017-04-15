import LaneActions from '../actions/LaneActions';

export default class LaneStore {
  constructor() {
    this.bindActions(LaneActions);
    this.lanes = [ ];
  }

  create(lane) {
    // create an empty array for <Notes> if one wasn't supplied
    //  with <lane>
    lane.note = lane.notes || [ ];
    this.setState({
      lanes: this.lanes.concat(lane)
    });
  }

  delete(laneId) {
    this.setState({
      lanes: this.lanes.filter((x) => x.id != laneId)
    });
  }
}
