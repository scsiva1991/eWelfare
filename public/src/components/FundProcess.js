import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import InputText from './InputText';
import { connect } from 'react-redux';
import { getNewFundRequests, updateFundRequests } from '../actions/fundActions';
import Loader from './Loader';
import FundStatus from './FundStatus';
import DatePicker from './DatePicker';

class FundProcess extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    this.props.getNewFundRequests().then(() => {
      this.setState({ isLoading: false });
    }, (err) => {
      this.setState({ isLoading: false });
    });
  }

  handleChange = (e) => {
    let {funds, user} = this.props;
    funds[e.target.id][e.target.name] = e.target.value;
    this.setState({ funds });
  }

  handleStatusChange = (e) => {
    let {funds} = this.props;
    funds[e.target.name]['status'] = e.target.value;
    this.setState({ funds });
  }

  handleDateChange = (index, dt ) => {
    let {funds} = this.props;
    funds[index]['sanctionedDate'] = moment(dt, 'DD-MM-YYYY');
    this.setState({ funds });
  }

  save = () => {
    this.setState({ isLoading: true });
    this.props.updateFundRequests(this.props.funds).then(() => {
      this.setState({ isLoading: false });
    }, (err) => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    console.log('- fund process -',this.props);
    let {funds, user} = this.props;
    let {isLoading} = this.state;
    let dt = new Date();

    this.props.funds.map((fund) => {
        fund['status'] = 'FUND_PROCESSED';
        funds['sanctionedDate'] = moment(dt, 'DD-MM-YYYY');
    })

    let rows = funds.map((fund, index) => {
      return (
        <tr key={index}>
          <td>
            {fund.createdBy.name}
          </td>
          <td>
            <InputText name={'requestedAmount'} value={fund.requestedAmount} index={index} handleChange={this.handleChange}/>
          </td>
          <td>
            {moment(fund.requestedDate).format('DD-MM-YYYY')}
          </td>
          <td>
            <InputText name={'sanctionedAmount'} value={fund.sanctionedAmount} index={index} handleChange={this.handleChange}/>
          </td>
          <td>
            <DatePicker fund={fund} index={index} handleDateChange={this.handleDateChange}/>
          </td>
          <td>
            <FundStatus status={fund.status} handleStatusChange={this.handleStatusChange} index={index}/>
          </td>
        </tr>
      )
    });

    if( funds.length == 0 ) {
      return(
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col m2 s1"></div>
              <div className="col m8 s10 card fund-request-received-container z-depth-5">
                <h5> No new fund requests to process </h5>
              </div>
              <div className="col m2 s1"></div>
            </div>
          </div>
        </div>
      )
    }

    return(
      <div>
        {isLoading && <Loader/>}
        <div className="container-fluid">
          <div className="row card fund-process">
            <div className="col s12">
              <a className="waves-effect waves-light btn right" onClick={this.save}>
                <i className="material-icons right">save</i>
              Save</a>
            </div>
            <div className="col s12 ">
              <table className="fund-process-table responsive-table">
                <thead>
                  <tr>
                      <th >Name</th>
                      <th >Requested Amount</th>
                      <th >Requested Date</th>
                      <th >Sanctioned Amount</th>
                      <th >Sanctioned Date</th>
                      <th >Status</th>
                  </tr>
                </thead>

                <tbody>
                  {rows}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
     funds: state.fund.funds
  }
}

export default withRouter(connect(mapStateToProps, {getNewFundRequests, updateFundRequests})(FundProcess));
