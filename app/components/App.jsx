import React from 'react';
import uuid from 'uuid';
import connect from '../libs/connect';
import Lanes from './Lanes';
import LaneActions from '../actions/LaneActions';


const App = ({LaneActions, lanes}) => {
  const addLane = () => {
    LaneActions.create({
      id: uuid.v4(),
      name: 'New lane'
    });
  };
  return(
    <div>
      <button className="add-lane" onClick={addLane}>+</button>
      <Lanes lanes={lanes} />
    </div>
  );
};


// Use the Flux Connect to connect to the LanesStore data.
//  Contents of the LanesStore will passed in props to the instance of App
//  as `lanes`. `LaneActions` provides basic CRUD operations on `notes`.
//  LaneActions will be available as `this.props.LaneActions`
export default connect(({lanes}) => ({
  lanes
}), {
  LaneActions
})(App)
