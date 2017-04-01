import React from 'react';
import AltContainer from 'alt-container';
import chromeDebug from 'alt-utils/lib/chromeDebug';
import alt from '../../libs/alt';
import setup from './setup';

// Connect the NoteStore to Alt
setup(alt);

// Set up Chrome Debugging (* requires setting up ReactDevTools on Chrome)
chromeDebug(alt);

React.Perf = require('react-addons-perf');

export default ({children}) =>
  <AltContainer flux={alt}>
    {children}
  </AltContainer>
