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

const getAllPendingFunds = () => {
  return axios.get(`/api/funds/getAllPendingFunds`)
      .then((res) => {
        if(res && res.data) {
          return res.data;
        }
      });
};

const getNewFundRequests = () => {
  return axios.get('/api/funds/newFundRequests')
    .then((res) => {
      if(res && res.data) {
        return res.data;
      }
    });
}

const updateFundRequests = (funds) => {
  return axios.post('/api/funds/updateFundRequests', funds)
    .then((res) => {
      if(res && res.data) {
        return res.data;
      }
    });
}



export default { createFundRequest, getPendingRequest, getNewFundRequests, updateFundRequests, getAllPendingFunds};
