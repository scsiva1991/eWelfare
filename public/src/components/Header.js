import React, { Component } from 'react';

export default class Header extends Component {
  render() {

    let {logout} = this.props;

    return(
      <header>
        <div className="navbar-fixed nav-extended">
          <nav className="app-bar">
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo">
                <img className="logo" src={require("../../images/logo.png")}></img>
              </a>
              <a href="#" className="brand-logo center">E-Welfare</a>
              <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">

                <li> 
                  <a data-gutter="-20" data-beloworigin="true" data-constrainWidth="false"
                  data-alignment="center" data-activates='dropdown1'
                  className="dropdown-button btn btn-floating waves-effect waves-light profile-round-btn teal">
                      S
                  </a>
                </li>
              </ul>

              <ul id='dropdown1' className='dropdown-content'>
                <li><a href="#!">Change Password</a></li>
                <li><a  onClick={logout}>Logout</a></li>
              </ul>


            </div>

          </nav>
        </div>
    </header>
    )
  }
}
