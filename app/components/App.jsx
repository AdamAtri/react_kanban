import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';
import connect from '../libs/connect';
import AutoFocusTextInput from './AutoFocusTextInput';

class App extends React.Component {

  render() {
    // as seen at the bottom of this file, the NoteStore
    //  is injected into <props> through `connect` 
    const { notes } = this.props;
    return (
      <div>
        <AutoFocusTextInput
          onCreate={ this.addNote }/>
        <Notes
          notes={notes}
          onNoteClick={ this.enableEditing }
          onDelete={ this.deleteNote }
          onEdit={ this.editNote } />
      </div>
    );
  }

  addLane = () => {
    this.props.laneActions.create({name: 'New Lane'});
  }

  addNote = (task) => {
    if (! task || task.length == 0) return;
    this.setState({
      notes: this.state.notes.concat([
        { id:uuid.v4(), task:task, editing:false }
      ])
    });
  }

  deleteNote = (id, e) => {
    e.stopPropagation();
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  }

  editNote = (id, task) => {
    console.log('edit:' + id);
    let fn = (note) => {
      note.editing = false;
      note.task = note.id === id ? task : note.task;
      return(note);
    };
    this._updateNotes(id, fn);
  }

  // Functon: _enableEditing
  //  Creates a map function to enable editing on the specified id
  //  and calls <_updateNotes>
  enableEditing = (id) => {
    console.log('enableEditing');
    let fn = (note) => {
      note.editing = note.id === id;
      return (note);
    };
    this._updateNotes(id, fn);
  }

  // Function: _updateNotes
  //  Updates state on notes.
  //  Takes an `id` (optional) and a `func` that will
  //  map onto the current <notes> array producing a new one.
  _updateNotes = (id, func) => {
    this.setState({
      notes: this.state.notes.map(func)
    });
  }
}

// Use the Flux Connect to connect to the NotesStore data.
//  Contents of the NotesStore will passed in props to the instance of App
//  as `notes`
export default connect(({notes}) => ({
  notes
}))(App)
