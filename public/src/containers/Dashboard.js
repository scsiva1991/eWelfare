import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FundRequest from '../components/FundRequest';
import { connect } from 'react-redux';
import { createFundRequest, getPendingRequest } from '../actions/fundActions';
import Loader from '../components/Loader';
import AlertContainer from 'react-alert';
import { alertOptions } from '../utils';

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
      console.log('@@@');
      this.setState({ isLoading: false });
    }, (err) => {
      console.log('@@@', err);
      this.setState({ isLoading: false });
    });
  }

  fundRequest = ( fund ) => {
    console.log( '##', fund);
    this.setState({ isLoading: true });
    this.props.createFundRequest(fund).then(() => {
      this.setState({ isLoading: false });
    }, (err) => {
      const errors = err.response.data;
      console.log('-- errors --', errors);
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


  render() {
    console.log( '-- dashboard --', this.props );

    let {user, fund} = this.props;
    let {isLoading} = this.state;

    const tabName = this.props.match.params.tab;

    if( tabName == 'fundRequest' ) {
      return(
        <div>
          <AlertContainer ref={a => this.msg = a} {...alertOptions} />
          {isLoading && <Loader/>}
          <FundRequest user={user} fundRequest={this.fundRequest}/>
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
     fund: state.fund.fund
  }
}

export default withRouter(connect(mapStateToProps, {createFundRequest, getPendingRequest})(Dashboard));
