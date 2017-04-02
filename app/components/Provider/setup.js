import storage from '../../libs/storage';
import persist from '../../libs/persist';
import NoteStore from '../../stores/NoteStore';
import LaneStore from '../../stores/LanesStore';

// Exports a function that will connect the 'NoteStore' data store to `Alt`
//  and persist 'alt' data to localStorage as 'app'.
export default alt => {
  alt.addStore('NoteStore', NoteStore);
  alt.addStore('LaneStore', LaneStore);
  persist(alt, storage(localStorage), 'app');
}
