import React from 'react';
import CustomTextInput from './CustomTextInput';

export default class AutoFocusTextInput extends React.Component {

  // override the default behavior of `componentDidMount`
  //  to set the focus
  componentDidMount() {
    this.textInput.focus();
  }
  render() {
    return (
      <CustomTextInput
        onCreate={ this.props.onCreate }
        ref={ (input) => { this.textInput = input; }}/>
    );
  }
}
