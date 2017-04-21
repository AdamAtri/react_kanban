import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  findRenderedComponentWithType
 } from 'react-dom/test-utils';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import assert from 'assert';
import Note from '../app/components/Note';

describe('Note', () => {
  it ('renders children', () => {
    const test = 'test-note';
    const NoteContent = wrapInTestContext(Note);
    const component = renderIntoDocument(
      <NoteContent id="12345" editing={false}>{test}</NoteContent>
    );
    assert.equal(component.props.children, test,
      "Failed to assert that component.props.children === test. " +
      component.props.children + ': ' + test);

    let div = findRenderedDOMComponentWithTag(component, 'div');
    assert.equal(div.style.opacity, 1,
      "Failed to assert that opacity of the rendered note is set to 1");

    const backend = component.getManager().getBackend();
    const note = findRenderedComponentWithType(component, Note);
    backend.simulateBeginDrag([note.getHandlerId()]);

    div = findRenderedDOMComponentWithTag(component, 'div');
    assert.equal(div.style.opacity, 0,
      "Failed to assert that the opacity of the note is set to 0 while dragging.");
  });
});

function wrapInTestContext(DecoratedComponent) {
  @DragDropContext(TestBackend)
  class TestContextContainer extends React.Component {
    render() {
      return <DecoratedComponent {...this.props} />;
    }
  }
  return TestContextContainer;
}
