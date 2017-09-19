"use strict";

import {LOG_IN_USER, LOG_OUT_USER} from '../constants/actionTypes';

const initialState = {
    user: {}
}

const auth = (state = initialState, action) => {
  switch(action.type) {
    case LOG_IN_USER:
      console.log('****', state);
      return {...state,user: action.user}
    case LOG_OUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default auth;
