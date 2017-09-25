import React, { Component } from 'react';

export default class InputText extends Component {
  render() {

    let { name, value, index, handleChange } = this.props;

    return(
      <input type="text" id={index} name={name}  value={value} className="browser-default custom_input"
        onChange={handleChange}/>
    )
  }
}
