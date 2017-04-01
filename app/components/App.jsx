import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';
import AutoFocusTextInput from './AutoFocusTextInput';
import connect from '../libs/connect';
import NoteActions from '../actions/NoteActions';

class App extends React.Component {

  render() {
    // as seen at the bottom of this file, the NoteStore
    //  is injected into <props> through `connect`
    const { notes } = this.props;
    return (
      <div>
        <button
          className="add-note"
          onClick={ this.addNote }>
          +
        </button>
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

  // Function: addNote
  //  Connects to NoteActions and calls `create`
  addNote = () => {
    this.props.NoteActions.create({
      id: uuid.v4(),
      task: 'New task'
    });
  }
  // Function: deleteNote
  //  Connects to NoteActions to call `delete`
  deleteNote = (id, e) => {
    e.stopPropagation();
    this.props.NoteActions.delete(id);
  }

  editNote = (id, task) => {
    this.props.NoteActions.update({id, task, editing: false});
  }

  // Functon: _enableEditing
  //  Creates a map function to enable editing on the specified id
  //  and calls <_updateNotes>
  enableEditing = (id) => {
    this.props.NoteActions.update({id, editing: true});
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
//  as `notes`. `NoteActions` provides basic CRUD operations on `notes`.
//  NoteActions will be available as `this.props.NoteActions`
export default connect(({notes}) => ({
  notes
}), {
  NoteActions
})(App)
