import React from 'react';
import uuid from 'uuid';
import AutoFocusTextInput from './AutoFocusTextInput';
import connect from '../libs/connect';
import Lanes from './Lanes';
import LaneActions from '../actions/LaneActions';
// Import React Drag-n-Drop functionality
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


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
//  Wrap the entire app in React DnD Context
export default compose(
  DragDropContext(HTML5Backend),
  connect(({lanes}) => ({ lanes }),
    { LaneActions }))(App)
