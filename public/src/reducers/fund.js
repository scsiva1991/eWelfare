"use strict";

import {CREATE_FUND_REQUEST, GET_PENDING_REQUEST, GET_NEW_FUND_REQUESTS} from '../constants/actionTypes';

const initialState = {
    fund: {},
    funds: []
}

const fund = (state = initialState, action) => {
  switch(action.type) {
    case GET_PENDING_REQUEST:
    case CREATE_FUND_REQUEST:
      console.log('****', state);
      return {...state,fund: action.fund}
    case GET_NEW_FUND_REQUESTS:
      return {...state, funds: action.funds}
    default:
      return state;
  }
};

export default fund;
