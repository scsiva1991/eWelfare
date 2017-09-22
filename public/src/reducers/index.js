"use strict";

import { combineReducers } from 'redux';
import auth from './auth';
import fund from './fund';

const rootReducer = combineReducers({
   auth,
   fund
});

export default rootReducer;
