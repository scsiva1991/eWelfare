"use strict";

import axios from 'axios';
import {setAuthorizationToken} from '../utils';

const login = (credentials) => {
  return axios.post('/api/auth/login', credentials)
        .then((res) => {
          if(res && res.data.token) {
            setAuthorizationToken(res.data.token);
            return res.data;
          }
        });
};

const signup = (user) => {
  return axios.post('/api/auth/signup', user)
    .then((res) => {
      if (res && res.data) {
        setAuthorizationToken(res.data.token);
        return res.data;
      }
    });
};

export default { login, signup };
