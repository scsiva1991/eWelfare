'use strict';

import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom';
import createBrowserHistory from './history';
import configureStore from '../store/configureStore';

import App from '../containers/App';
import Login from '../components/Login';
import Dashboard from '../containers/Dashboard';

const isLoggedIn = () => localStorage.jwtToken != null ? true : false;

console.log('= isLoggedIn =', isLoggedIn());


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isLoggedIn() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/'
      }}/>
    )
  )}/>
)

export default (
<App>
    <BrowserRouter >
      <div>
        <Route exact component={ Login } path="/" />
        <PrivateRoute path="/dashboard" component={Dashboard}/>
      </div>
    </BrowserRouter>
    </App>
)
