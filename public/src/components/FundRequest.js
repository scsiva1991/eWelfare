import React, { Component } from 'react';

export default class FundRequest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fund: {
        requestedAmount: 5000, 
        isEmergencyFund: false,
        comment: 'Hi Welfare Team, please process my fund request.',
        requestedDate: null,
        accountNumber: ''
      },
      isLoading: false
    }
  }

  onChange = (event) => {
    let {fund} = this.state;
    fund[ event.target.name ] = event.target.value;
    this.setState({ fund });
  }

  toggleCheckBox = ( event ) => {
    let {fund} = this.state;
    fund[ event.target.name ] = !fund[ event.target.name ];
    this.setState({ fund });
  }

  componentDidMount() {

    let {fund} = this.state;

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
      fund['requestedDate'] = picker.get();
      this.setState({ fund });
    })
    picker.trigger('close')
  }

  render() {

    let {fund} = this.state;
    let {user, fundRequest} = this.props;

    return(
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col m2 s1"></div>
            <form className="col m8 s10 card fund-request-container z-depth-5">
              <div className="row">
                <div className="input-field col s12">
                  <input id="amount" type="number" name="requestedAmount" className="validate"
                   value={fund.requestedAmount} onChange={this.onChange}/>
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
                  <input id="accountNumber" type="text" name="accountNumber" className="validate"
                   value={user.accountNumber} onChange={this.onChange}
                   placeholder="You can update your bank account number to your profile."/>
                  <label className="amount active">Account Number</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="comment" type="text" name="comment" className="validate"
                   value={fund.comment} onChange={this.onChange}/>
                  <label className="comment active">Comment</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12">
                <input type="checkbox" className="filled-in" id="filled-in-box" name="isEmergencyFund"
                 checked={fund.isEmergencyFund}
                onChange={this.toggleCheckBox} />
                <label htmlFor="filled-in-box">Emergency Fund</label>
                </div>
              </div>
              <div className="row center-align">
                <a className="waves-effect waves-light btn-large" onClick={() => fundRequest(fund)}>
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
