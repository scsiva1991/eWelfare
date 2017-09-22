"use strict";

import React, {Component} from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions'; 
import { withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
      this.props.logout();
  }

  navigateToMenu = (tab) => {
    console.log('@@@@@', tab, this.props);
    this.props.history.push('/dashboard/'+tab);
  }

  render() {
    console.log('--- App Container ---', this.props );
    return (
      <div>
          { Object.keys(this.props.user).length > 0 ? <Header user={this.props.user} logout={this.logout}
                                                      navigateToMenu={this.navigateToMenu}/> : ''}

          {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
     user: state.auth.user
  }
}

export default withRouter(connect(mapStateToProps, {logout})(App));
