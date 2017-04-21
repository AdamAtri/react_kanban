import assert from 'assert';
import NoteActions from '../app/actions/NoteActions';
import NoteStore from '../app/stores/NoteStore';
import alt from '../app/libs/alt';

alt.addStore('NoteStore', NoteStore);

describe('NoteStore', ()=>{

  beforeEach(()=>{ alt.flush(); });

  it('allows creating a note', ()=>{
    const task = 'test-task';
    NoteActions.create({task});
    const state = alt.stores.NoteStore.getState();
    assert.equal(state.notes.length, 1,
      "Failed to assert that the `notes` has any notes.");
    assert.equal(state.notes[0].task, task,
      "Failed to assert that the test note task == task");
  });

  it ('allows editing a note', ()=>{
    const task = 'test-task2';
    NoteActions.create({task});
    let state = alt.stores.NoteStore.getState();
    assert(state.notes.length >= 1,
      "Failed to assert that there are any notes.");
    let note = state.notes.filter(note => note.task === task)[0];
    assert.ok(note,
      "Failed to assert that the note is truthy.");
    const newTask = 'func that old task';
    note.task = newTask;
    NoteActions.update(note);
    state = alt.stores.NoteStore.getState();
    assert(state.notes[0].task == newTask,
      "Failed to assert that new task is newTask.");
  });

  it ('allows deleting a note', ()=>{
    NoteActions.create({id:12345, task:"delete-me"});
    let state = alt.stores.NoteStore.getState();
    let note = state.notes.filter(note => note.id === 12345)[0];
    assert.ok(note,
      "Failed to assert that the note is truthy.");
    NoteActions.delete(note.id);
    state = alt.stores.NoteStore.getState();
    assert(state.notes.filter(note => note.id === 12345).length === 0,
      "Failed to assert that the note has been deleted.")
  });
});
