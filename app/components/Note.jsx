import React from 'react';
// Import Drag-n-Drop packs
import {DragSource, DropTarget} from 'react-dnd';
import { compose } from 'redux';
import ItemTypes from '../constants/itemTypes';

// Define the <Note> element
const Note = ({connectDragSource, connectDropTarget, children, ...props}) => {
  return compose(connectDragSource, connectDropTarget)(
    <div {...props}>
      {children}
    </div>
  );
};
// Spec: noteSource (DragSource)
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
};
// Spec: noteTarget (DropTarget)
//  NoteTarget is a JS object that descibes how the
//  note will respond to having another note dropped onto it.
//  *all functions here are optional (can also support `drop`, `canDrop`)
//  see: https://react-dnd.github.io/react-dnd/docs-drop-target.html
const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    console.log('dragging note is over me', sourceProps, targetProps);
  }
}

// export the note in as a draggable item
export default compose(
  DragSource(ItemTypes.NOTE, noteSource, connect => ({
    connectDragSource: connect.dragSource()
  })),
  DropTarget(ItemTypes.NOTE, noteTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Note);
