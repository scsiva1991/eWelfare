import React, { Component } from 'react';
import {options} from '../utils';

export default class FundStatus extends Component {

  componentDidMount() {
    $('select').material_select();
  }

  render() {
    let {status, handleStatusChange, index} = this.props;

    let values = options.map((option, idx) => {
      return(
        <option key={idx} value={option.value} >{option.label}</option>
      )
    })

    return (
      <div>
        <select name={index} className="browser-default" defaultValue={status} onChange={handleStatusChange}>
           {values}
        </select>
      </div>
    )
  }
}
