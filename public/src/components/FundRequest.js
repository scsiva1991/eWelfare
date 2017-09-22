import React, { Component } from 'react';

export default class FundRequest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fund: {
        amount: 5000,
        isEmergencyFund: false,
        comment: 'Hi Team, please process my fund request.',
        requestDate: null
      },
      isLoading: false
    }
  }

  componentDidMount() { 
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
  }

  render() {

    let {fund} = this.state;
    return(
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col m2 s1"></div>
            <form className="col m8 s10 card fund-request-container z-depth-5">
              <div className="row">
                <div className="input-field col s12">
                  <input id="amount" type="number" name="amount" className="validate"
                   value={fund.amount}/>
                  <label className="amount active">Amount</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input type="text" className="datepicker" />
                  <label className="requestDate">Request date</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="comment" type="text" name="comment" className="validate"
                   value={fund.comment}/>
                  <label className="comment active">Comment</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                <input type="checkbox" className="filled-in" id="filled-in-box" checked={fund.isEmergencyFund} />
                <label htmlFor="filled-in-box">Emergency Fund</label>
                </div>
              </div>
              <div className="row center-align">
                <a className="waves-effect waves-light btn-large" onClick={this.login}>
                  <i className="material-icons left">send</i>SUBMIT
                </a>
              </div>
            </form>
            <div className="col m2 s1"></div>
          </div>
        </div>
      </div>
    )
  }
}
