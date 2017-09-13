"use strict";

import React, {PropTypes, Component} from 'react';
import Loader from './Loader';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';
import AlertContainer from 'react-alert';
import { alertOptions } from '../utils';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        email: '',
        password: ''
      }, 
      isLoading: false
    }
  }

  onChange = (e) => {
    let credentials = this.state.credentials;
    credentials[e.target.name] = e.target.value;
    this.setState({credentials});
  }

  login = (e) => {
    let _this = this;
    e.preventDefault();
    this.setState({ isLoading: true });

    this.props.login(this.state.credentials)
      .then(() => {

        this.setState({ isLoading: false });

        _this.msg.show('Logged in successfully', {
          type: 'success',
          onClose: () => {
            _this.props.history.push('/uyvghjyh');
          }
        })
      }, (err) => {

        this.setState({ isLoading: false });

        const errors = err.response.data;
        if (errors) {
          if (typeof errors.err === 'string') {
            _this.msg.show(err.response.data.msg, {
              type: 'error'
            })
          } else {
            for( let key in errors.err ) {
              _this.msg.show(errors.err[key].msg, {
                type: 'error'
              })
            }
          }
        }
      });
  }

  render() {
      let {isLoading, credentials} = this.state;
      return(
        <div className="container-fluid">
          <AlertContainer ref={a => this.msg = a} {...alertOptions} />
          {isLoading && <Loader/>}
          <div className="row">
            <form className="col m4 offset-m4 card login-container">
              <h2 className="center-align"> E-Welfare </h2>
              <div className="row">
                <div className="input-field col s12">
                  <input id="email" type="email" name="email" className="validate"
                  value={credentials.email} onChange={this.onChange}/>
                  <label className="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input id="password" type="password" name="password" className="validate"
                  value={credentials.password} onChange={this.onChange}/>
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row center-align">
                <a className="waves-effect waves-light btn-large" onClick={this.login}>LOGIN</a>
              </div>
            </form>
          </div>
        </div>
      )
  }
}

export default connect(null, { login })(Login);
