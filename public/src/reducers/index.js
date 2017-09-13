"use strict";

import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({ 
  user: auth
});

export default rootReducer;
