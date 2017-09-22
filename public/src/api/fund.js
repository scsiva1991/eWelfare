"use strict";

import axios from 'axios';

const createFundRequest = (data) => {
  return axios.post('/api/funds/createFundRequest', data)
      .then((res) => {
        if(res && res.data) {
          return res.data;
        }
      });
};

const getPendingRequest = (user) => {
  return axios.get(`/api/funds/getPendingRequest/${user._id}`)
      .then((res) => {
        if(res && res.data) {
          return res.data;
        }
      });
};



export default { createFundRequest, getPendingRequest };
