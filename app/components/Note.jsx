import React from 'react';

// Define the <Note> element
const Note = ({children, ...props}) =>
  <div {...props}>
    {children}
  </div>

// export <Note>
export default Note;
