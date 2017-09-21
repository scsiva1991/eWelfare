import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FundRequest from '../components/FundRequest';

export default class Dashboard extends Component {



  render() {

    console.log( '-- dashboard --', this.props );

    const tabName = this.props.match.params.tab;

    if( tabName == 'fundRequest' ) {
      return(
        <FundRequest/>
      )
    }

    return(
      <h1>Dashboard</h1>
    )
  }
}
