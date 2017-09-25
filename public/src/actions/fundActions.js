"use strict";

import { CREATE_FUND_REQUEST, GET_PENDING_REQUEST, GET_NEW_FUND_REQUESTS } from '../constants/actionTypes';
import fund from '../api/fund';

export const addFundRequest = (fund={}) => {
  return {
    type: CREATE_FUND_REQUEST,
    fund
  }
}

export const createFundRequest = (data = {}) => {
  return dispatch => {
    return fund.createFundRequest(data).then((res) => {
      dispatch(addFundRequest(res));
    });
  }
};

export const pendingRequest = (fund={}) => {
  return {
    type: GET_PENDING_REQUEST,
    fund
  }
}

export const getPendingRequest = (user = {}) => {
  return dispatch => {
    return fund.getPendingRequest(user).then((res) => { 
      dispatch(pendingRequest(res));
    });
  }
};

export const newFundRequests = (funds=[]) => {
  return {
    type: GET_NEW_FUND_REQUESTS,
    funds
  }
}

export const getNewFundRequests = () => {
  return dispatch => {
    return fund.getNewFundRequests().then((res) => {
      dispatch(newFundRequests(res));
    });
  }
}
