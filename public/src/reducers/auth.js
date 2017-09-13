"use strict";

import {LOG_IN_USER, LOG_OUT_USER} from '../constants/actionTypes';

const initialState = {
  session: {}
}

const session = (state = initialState.session, action) => {
  switch(action.type) {
    case LOG_IN_USER:
      console.log('****', action.user);
      return Object.assign(state, action.user);
    case LOG_OUT_USER:
      return {};
    default:
      return state;
  }
};

export default session;
