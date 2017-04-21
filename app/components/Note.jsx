import React from 'react';
// Import Drag-n-Drop packs
import {DragSource, DropTarget} from 'react-dnd';
import { compose } from 'redux';
import ItemTypes from '../constants/itemTypes';

// Define the <Note> element
const Note = ({connectDragSource, connectDropTarget, isDragging,
               isOver, onMove, id, children, ...props}) => {
  return compose(connectDragSource, connectDropTarget)(
    // set the opacity to zero if the note is being dragged or hovered-over
    <div style={{ opacity: isDragging || isOver ? 0 : 1 }} {...props}>
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
    const item = { id: props.id };
    return item;
  },
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  }

};
// Spec: noteTarget (DropTarget)
//  NoteTarget is a JS object that descibes how the
//  note will respond to having a draggable dropped onto it.
//  *all functions here are optional (can support `hover`, `drop`, and `canDrop`)
//  see: https://react-dnd.github.io/react-dnd/docs-drop-target.html
const noteTarget = {
  hover(targetProps, monitor) {

  },
  drop(targetProps, monitor, component) {
    const targetId = targetProps.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;
    if (sourceId !== targetId) {
      targetProps.onMove({sourceId, targetId});
    }
  }

}

// export the note in as a draggable item
export default compose(
  DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ItemTypes.NOTE, noteTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }))
)(Note);
