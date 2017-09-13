'use strict';

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import createBrowserHistory from './history';

import App from '../containers/App';
import Login from '../components/Login';

export default (
  <App>
    <Router history={history} >
      <div>
        <Route exact component={ Login } path="/" />
      </div>
    </Router>
  </App>
)
