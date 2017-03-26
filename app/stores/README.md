To setup a store we need to perform three steps:
- set it up
- connect it with Alt at `Provider`
- connect it with `App`


Set it up:
  A minimal store might be nothing more than an array. Construct and return a
  class that can maintain the store.

Connect it with Alt at Provider:
  Modify the `app/components/Provider/setup.js` so that the new store is added
  to the `alt` Singleton in the export.
  ex: `alt.addStore('NoteStore', NoteStore);`

Connect it with App:
  The whole point of this is to decouple state from the components entirely. To
  accomplish this we'll use the `flux connect` to inject the data store into
  component in the App export.
