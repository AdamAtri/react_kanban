import React from 'react';

export default class CustomTextInput extends React.Component {

  constructor(props) {
    super(props);
    // set up a #ref on the DOM input element to immediately assign focus
    this.focus = this.focus.bind(this);
    this._onClick = this._onClick.bind(this);
    this.onCreate = this.props.onCreate;
    this.createOnEnter = this.createOnEnter.bind(this);
  }

  _onClick() {
    this.onCreate(this.textInput.value);
    this.textInput.value = '';
  }

  focus() {
    // focus on the #ref-ed element
    this.textInput.focus();
  }

  render() {
    // store the #ref in the rendered element
    return(
      <div>
        <input
          type="text"
          onKeyPress={ this.createOnEnter }
          ref={(input) => { this.textInput = input; }} />
        <input
          type="button"
          value="Focus the text input"
          onClick={ this._onClick } />
      </div>
    );
  }

  createOnEnter(e) {
    if (e.charCode === 13)
      this._onClick();
  }
}
