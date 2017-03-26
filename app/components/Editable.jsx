import React from 'react';

// Provide a interface for editing a text value
const Editable = ({editing, value, onEdit, ...props}) => {
  if (editing) {
    return <Editable.Edit
            value={value} onEdit={onEdit} {...props}/>;
  }
  return <Editable.Value value={value} />;
};

// Edit Class provides a text input Component for editing a string value
class Edit extends React.Component {
  render() {
    const { value, onEdit, ...props } = this.props;
    return <input
              type="text"
              autoFocus={true}
              defaultValue={value}
              onBlur={this.finishedEdit}
              onKeyPress={this.finishOnEnter}
              {...props} />
  }

  // Function: finishOnEnter
  //  Looks at keypresses, waiting for the enter key, which will
  //  terminate the edit
  finishOnEnter = (e) => {
    if (e.charCode === 13) { // "Enter" key = charCode 13
      this.finishedEdit(e);
    }
  }

  // Function: finishedEdit
  //  Gets the value from the input element and calls any
  //  `onEdit` function assigned to props with the value as the only arg.
  finishedEdit = (e) => {
    const value = e.target.value;
    if (this.props.onEdit) {
      this.props.onEdit(value);
    }
  }
}
// >>>>> Namespaced Components
Editable.Edit = Edit;
Editable.Value = ({value, ...props}) => <span {...props}>{value}</span>
// >>>>> EXPORT
export default Editable;
