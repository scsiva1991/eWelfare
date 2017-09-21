'use strict';

import 'babel-polyfill';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from './store/configureStore';
import routes from './routes/routes';
import { render } from 'react-dom';
import React from 'react';
import {setAuthorizationToken} from './utils';
import { loginUser } from './actions/authActions';
import jwtDecode from 'jwt-decode';
import $ from 'jquery';

import materialize from 'materialize-css/dist/css/materialize.min.css';
import materializeJs from 'materialize-css/dist/js/materialize.js';
import '../stylesheets/style.css';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(loginUser(jwtDecode(localStorage.jwtToken)));
}

render(
  <Provider store={store}>
    { routes }
  </Provider>,
  document.getElementById('root')
)
