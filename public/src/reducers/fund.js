"use strict";

import {
        CREATE_FUND_REQUEST,
        GET_PENDING_REQUEST,
        GET_NEW_FUND_REQUESTS,
        GET_ALL_PENDING_FUNDS} from '../constants/actionTypes';

const initialState = {
    fund: {},
    funds: [],
    pendingFunds: []
}

const fund = (state = initialState, action) => {
  switch(action.type) {
    case GET_PENDING_REQUEST:
    case CREATE_FUND_REQUEST:
      return {...state,fund: action.fund}
    case GET_NEW_FUND_REQUESTS:
      return {...state, funds: action.funds}
    case GET_ALL_PENDING_FUNDS:
      return {...state, pendingFunds: action.pendingFunds}
    default:
      return state;
  }
};

export default fund;
