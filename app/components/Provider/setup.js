import storage from '../../libs/storage';
import persist from '../../libs/persist';
import NoteStore from '../../stores/NoteStore';
import LaneStore from '../../stores/LaneStore';


// Exports a function that will connect the 'NoteStore' and 'LaneStore'
//  data store to `Alt` and persist 'alt' data to localStorage as 'app'.
export default alt => {
  alt.addStore('NoteStore', NoteStore);
  alt.addStore('LaneStore', LaneStore);
  // persists <alt> data to localStorage as 'app'
  persist(alt, storage(localStorage), 'app1');
}
