"use strict";

import { CREATE_FUND_REQUEST, GET_PENDING_REQUEST } from '../constants/actionTypes';
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
