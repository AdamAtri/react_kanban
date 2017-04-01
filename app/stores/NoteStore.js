import uuid from 'uuid';
import NoteActions from '../actions/NoteActions';

export default class NoteStore {
  constructor() {
    // bind the NoteStore to the NoteActions module.
    //  NoteActions contains a list of actions to perform on 'notes'.
    //  This binds the action-creators to the methods below.
    this.bindActions(NoteActions);

    // A minimal data store for notes.
    this.notes = [
      {
        id: uuid.v4(),
        task: 'Learn some shit',
        editing: false
      }, {
        id: uuid.v4(),
        task: 'Do some shit',
        editing: false
      }
    ];
  }

  // Function: create
  create(note) {
    //console.log('create note', note);
    this.setState({
      notes: this.notes.concat(note)
    });
  }
  // Function: update
  update(updatedNote) {
    this.setState({
      notes: this.notes.map((note) => {
        if (note.id === updatedNote.id)
          return Object.assign({}, note, updatedNote);
        return note;
      })
    });
  }
  // Function: delete
  delete(id) {
    // console.log('delete note', id);
    this.setState({
      notes: this.notes.filter((note) => note.id !== id)
    });
  }
}
