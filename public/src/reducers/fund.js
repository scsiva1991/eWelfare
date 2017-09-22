"use strict";

import {CREATE_FUND_REQUEST, GET_PENDING_REQUEST} from '../constants/actionTypes';

const initialState = {
    fund: {}
}

const fund = (state = initialState.fund, action) => {
  switch(action.type) {
    case GET_PENDING_REQUEST:
    case CREATE_FUND_REQUEST:
      console.log('****', state);
      return {...state,fund: action.fund}
    default:
      return state;
  }
};

export default fund;
