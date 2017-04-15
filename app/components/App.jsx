import React from 'react';
import uuid from 'uuid';
import AutoFocusTextInput from './AutoFocusTextInput';
import connect from '../libs/connect';
import Lanes from './Lanes';
import LaneActions from '../actions/LaneActions';


const App = ({LaneActions, lanes}) => {
  const addLane = () => {
    LaneActions.create({
      id: uuid.v4(),
      name: 'New Lane'
    });
  };

  return (
    <div>
      <button className='add-lane' onClick={addLane}>+</button>
      <Lanes lanes={lanes} />
    </div>
  );
};


// Use the Flux Connect to connect to the LaneStore data.
//  Contents of the LaneStore will passed in props to the instance of App
//  as `lanes`. `LaneActions` provides basic CRUD operations on `lanes`.
export default connect(({lanes}) => ({
  lanes
}), {
  LaneActions
})(App)
