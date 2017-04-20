import React from 'react';
// Import Drag-n-Drop packs
import {DragSource} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

// Define the <Note> element
const Note = ({connectDragSource, children, ...props}) => {
  return connectDragSource(
    <div {...props}>
      {children}
    </div>
  );
}
// Spec: noteSource
//  NoteSource is a JS object that describes how the
//  the drag source reacts to the drag and drop events.
//  Minimally, must contain a function `beginDrag`, but
//  may also contain `endDrag`, `canDrag`, `isDragging`
//  see: https://react-dnd.github.io/react-dnd/docs-drag-source.html
const noteSource = {
  beginDrag(props, monitor, component) {
    console.log('begin dragging note', props, monitor, component);
    return {};
  }
}

// export the note in as a draggable item
export default DragSource(ItemTypes.NOTE, noteSource, connect => ({
  connectDragSource: connect.dragSource()
}))(Note);
