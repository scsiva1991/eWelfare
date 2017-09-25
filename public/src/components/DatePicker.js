import React, { Component } from 'react';

export default class DatePicker extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    let { handleDateChange, index } = this.props;

    $('.datepicker').pickadate({
      selectMonths: true,
      selectYears: 15,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: true,
      format: 'dd-mm-yyyy'
    });
    let datePicker = $('.datepicker').pickadate();
    let picker = datePicker.pickadate('picker');
    let dt = new Date();
    picker.set('select', [dt.getFullYear(), dt.getMonth(), dt.getDate()]);
    picker.set('min', [dt.getFullYear(), dt.getMonth(), dt.getDate()]);
    picker.on('close', () => {
      handleDateChange( index, picker.get());
    })
    picker.trigger('close')
  }

  render() {

    return(
      <div>
        <input type="text" className="datepicker" />
      </div>
    )
  }
}
