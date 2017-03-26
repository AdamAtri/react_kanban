import uuid from 'uuid';

export default class NoteStore {
  constructor() {
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
}
