import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';
import connect from '../libs/connect';
import AutoFocusTextInput from './AutoFocusTextInput';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        {
          //id: '444',
          id: uuid.v4(),
          task: 'Learn some shit',
          editing: false
        }, {
          //id: '555',
          id: uuid.v4(),
          task: 'Do some shit',
          editing: false
        }
      ]
    };
  }

  render() {
    const { notes } = this.state;
    return (
      <div>
        {this.props.test}
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

  enableEditing = (id) => {
    console.log('enableEditing');
    let fn = (note) => {
      note.editing = note.id === id;
      return (note);
    };
    this._updateNotes(id, fn);
  }

  _updateNotes = (id, func) => {
    this.setState({
      notes: this.state.notes.map(func)
    });
  }
}

export default connect(() => ({
  test: 'test'
}))(App)
