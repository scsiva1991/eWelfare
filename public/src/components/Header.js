import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
      $(".button-collapse").sideNav();
      $('ul.tabs').tabs();
      $('.dropdown-button').dropdown();
  }


  render() {

    let {logout, user, navigateToMenu} = this.props;
    console.log('-- header user --', user);

    let tabs = [];

    if( user.roles.includes('Admin') ) {
      tabs = [
               {
                  "label":"Fund Request",
                  "name":"fundRequest"
               }, 
               {
                  "label":"Fund Process",
                  "name":"fundProcess"
               },
               {
                  "label":"Pending Report",
                  "name":"pendingReport"
               },
               {
                  "label":"Transaction Report",
                  "name":"transactionReport"
               }
            ];
    } else {
      tabs = [
               {
                  "label":"Fund Request",
                  "name":"fundRequest"
               }
             ];
    }

    return(
      <header>
        <div className="navbar-fixed nav-extended">
          <nav className="app-bar">
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo ">
                <img className="logo" src={require("../../images/logo.png")}></img>
              </a>
              <a href="#" className="brand-logo center hide-on-med-and-down">I-Welfare</a>
              <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">

                <li>
                  <a data-gutter="-20" data-beloworigin="true" data-constrainWidth="false"
                  data-alignment="center" data-activates='dropdown1'
                  className="dropdown-button btn btn-floating waves-effect waves-light profile-round-btn teal">
                      {user.username.charAt(0).toUpperCase()}
                  </a>
                </li>
              </ul>

              <ul id='dropdown1' className='dropdown-content'>
                <li><a href="#!"><i className="material-icons">remove_red_eye</i>{user.username}</a></li>
                <li><a href="#!"><i className="material-icons">settings</i>Settings</a></li>
                <li><a href="#!"><i className="material-icons">exit_to_app</i>Log Out</a></li>
              </ul>

              <ul className="side-nav side-menu" id="mobile-demo">
                <li><a href="#!"><i className="material-icons">remove_red_eye</i>{user.username}</a></li>
                <li><a href="#!"><i className="material-icons">settings</i>Settings</a></li>
                <li><a href="#!"><i className="material-icons">exit_to_app</i>Log Out</a></li>
              </ul>
            </div>

            <div className="nav-content">
                <div className="col s12">
                  <ul className="tabs">
                      {
                        tabs.map((tab, index) =>
                          <li className="tab col" key={index}>
                            <a className={`${index === 0 ? "active" : ""}`} onClick={() => navigateToMenu(tab.name)}>{tab.label}</a>
                          </li>
                        )
                      }
                  </ul>
              </div>
            </div>

          </nav>
        </div>
    </header>
    )
  }
}
