"use strict";

import { LOG_IN_USER, LOG_OUT_USER } from '../constants/actionTypes';
import auth from '../api/auth';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils';

export const loginUser = (user = {}) => {
  return {
    type: LOG_IN_USER,
    user
  }
}

export const logoutUser = () => {
  return {
    type: LOG_OUT_USER
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(logoutUser());
  }
};

export const login = (credentials = {}) => {
  return dispatch => {
    return auth.login(credentials).then((res) => {
      const token = res.token;
      localStorage.setItem('jwtToken', token);
      dispatch(loginUser(jwtDecode(token)));
    });
  }
};
