import React, { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from './Loader';
import { getAllPendingFunds } from '../actions/fundActions';

class PendingReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    }
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    this.props.getAllPendingFunds().then(() => {
      this.setState({ isLoading: false });
    }, (err) => {
      this.setState({ isLoading: false });
    });
  }

  render() {

    let {pendingFunds} = this.props;
    let {isLoading} = this.state;

    let rows = pendingFunds.map((fund, index) => {
      return (
        <tr key={index}>
          <td>
            {fund.createdBy.name}
          </td>
          <td>
            {fund.requestedAmount}
          </td>
          <td>
            {moment(fund.requestedDate).format('DD-MM-YYYY')}
          </td>
          <td>
            {fund.sanctionedAmount}
          </td>
          <td>
            {moment(fund.sanctionedDate).format('DD-MM-YYYY')}
          </td>
        </tr>
      )
    });

    if( pendingFunds.length == 0 ) {
      return(
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col m2 s1"></div>
              <div className="col m8 s10 card fund-request-received-container z-depth-5">
                <h5> No pending funds. </h5>
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

              <div className="col s12 ">
                <table className="fund-process-table centered responsive-table">
                  <thead>
                    <tr>
                        <th >Name</th>
                        <th >Requested Amount</th>
                        <th >Requested Date</th>
                        <th >Sanctioned Amount</th>
                        <th >Sanctioned Date</th>
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
     pendingFunds: state.fund.pendingFunds
  }
}

export default withRouter(connect(mapStateToProps, {getAllPendingFunds})(PendingReport));
