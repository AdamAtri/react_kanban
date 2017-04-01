import NoteStore from '../../stores/NoteStore';

// Exports a function that will connect the 'NoteStore' data store to `Alt`
export default alt => {
  alt.addStore('NoteStore', NoteStore);
}
