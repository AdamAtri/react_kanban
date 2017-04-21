import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-dom/test-utils';
import assert from 'assert';
import Editable from '../app/components/Editable';

describe('Editable', () => {
  it ('renders value', () => {
    const value = 'value';
    const editing = false;
    const component = new Editable("editable", value, null);
    assert.notEqual(component, undefined,
      "Component should not be null");
    assert.equal(component.props, value,
      "Component should contain children equal to value, but doesn't. " +
      component.props + ':' + value);
  });
  it ('triggers onEdit through the DOM', () => {
    let triggered = false;
    const newValue = 'value';
    const onEdit = (val) => {
      triggered = true;
      assert.equal(val, newValue);
    };
    const component = renderIntoDocument(
      <Wrapper>
        <Editable
          editing={true}
          value={'value'}
          onEdit={onEdit} />
      </Wrapper>
    );
    const input = findRenderedDOMComponentWithTag(component, 'input');
    input.value = newValue;

    Simulate.blur(input);
    assert.equal(triggered, true);
  });

  class Wrapper extends React.Component {
    render() {
      return <div>{this.props.children}</div>;
    }
  }
});
