"use strict";
import axios from 'axios';

export const setAuthorizationToken = (token) => {
  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'light',
    time: 5000,
    transition: 'scale'
}
