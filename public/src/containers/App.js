"use strict";

import React, {Component} from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import {PropTypes} from 'prop-types';
import { withRouter } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
      this.props.logout();
  }

  render() {
    console.log('@@@@@@@', this.props.user);
    return (
      <div>
          { Object.keys(this.props.user).length > 0 ? <Header logout={this.logout}/> : ''}

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

export default connect(mapStateToProps, {logout})(App);
