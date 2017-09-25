import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FundRequest from '../components/FundRequest';
import FundReturn from '../components/FundReturn';
import FundProcess from '../components/FundProcess';
import { connect } from 'react-redux';
import { createFundRequest, getPendingRequest, getNewFundRequests } from '../actions/fundActions';
import Loader from '../components/Loader';
import AlertContainer from 'react-alert';
import { alertOptions } from '../utils';
import moment from 'moment';

class Dashboard extends Component {

  constructor( props ) {
    super(props);

    this.state = {
      isLoading: false
    }

  }

  componentWillMount() {
    this.setState({ isLoading: true });
    this.props.getPendingRequest(this.props.user).then(() => {
      this.setState({ isLoading: false });
    }, (err) => {
      this.setState({ isLoading: false });
    });
  }

  fundRequest = ( fund ) => {
    this.setState({ isLoading: true });
    fund['requestedDate'] = moment(fund['requestedDate'], 'DD-MM-YYYY');
    this.props.createFundRequest(fund).then(() => {
      this.setState({ isLoading: false });
    }, (err) => {
      const errors = err.response.data;
      this.setState({ isLoading: false });
      if (errors) {
        if (typeof errors.err === 'string') {
          this.msg.show(err.response.data.msg, {
            type: 'error'
          })
        } else {
          for( let key in errors.err ) {
            this.msg.show(errors.err[key].msg, {
              type: 'error'
            })
          }
        }
      }
    });
  }

  s = () => {
    console.log('@@@@@@@@@@@@');
    this.props.getNewFundRequests().then(() => {
      this.setState({ isLoading: false });
    }, (err) => {
      this.setState({ isLoading: false });
    });
  }


  render() {
    console.log( '-- dashboard --', this.props );

    let {user, fund, funds} = this.props;
    let {isLoading} = this.state;

    const tabName = this.props.match.params.tab;

    if( tabName == 'fundRequest' ) {

      if( fund && fund.status ) {
        return(
          <div>
            <FundReturn fund={fund}/>
          </div>
        )
      }

      return(
        <div>
          <AlertContainer ref={a => this.msg = a} {...alertOptions} />
          {isLoading && <Loader/>}
          <FundRequest user={user} fundRequest={this.fundRequest}/>
        </div>
      )
    }

    if( tabName == 'fundProcess' ) {
      return(
        <div>
          <FundProcess user={user}/>
        </div>
      )
    }

    return(
      <h1>Dashboard</h1>
    )
  }
}

const mapStateToProps = (state) => {
  return {
     user: state.auth.user,
     fund: state.fund.fund,
     funds: state.fund.funds
  }
}

export default withRouter(connect(mapStateToProps, {createFundRequest, getPendingRequest})(Dashboard));
