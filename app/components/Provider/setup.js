import storage from '../../libs/storage';
import persist from '../../libs/persist';
import NoteStore from '../../stores/NoteStore';

// Exports a function that will connect the 'NoteStore' data store to `Alt`
//  and persist 'alt' data to localStorage as 'app'.
export default alt => {
  alt.addStore('NoteStore', NoteStore);
  persist(alt, storage(localStorage), 'app');
}
