"use strict";
import axios from 'axios';

export const setAuthorizationToken = (token) => {
  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'light',
    time: 5000,
    transition: 'scale'
}

export const options = [
  {
    'label': 'Fund Returned',
    'value': 'FUND_RETURNED'
  },
  {
    'label': 'Fund Processed',
    'value': 'FUND_PROCESSED'
  },
  {
    'label': 'Fund Rejected',
    'value': 'FUND_REJECTED'
  },
  {
    'label': 'Fund Waitlisted',
    'value': 'FUND_WAITLISTED'
  },
  {
    'label': 'Fund Requested',
    'value': 'FUND_REQUESTED'
  }
]
