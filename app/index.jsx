import React from 'react';
import ReactDOM from 'react-dom';

//import Notes from './components/Notes';
import App from './components/App';

if(process.env.NODE_ENV !== 'production') {
  React.Perf = require('react-addons-perf');
}

ReactDOM.render(
  //<div>Hello world</div>,
  // <Notes />,
  <App />,
  document.getElementById('app')
);
