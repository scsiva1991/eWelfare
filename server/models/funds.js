"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FundSchema = new Schema({
    requestedAmount: {
      type: Number,
      required: true
    },
    returnedAmount: {
      type: Number
    },
    fineAmount: {
      type: Number,
      default: 0
    },
    sanctionedAmount: {
      type: Number
    },
    requestedDate: {
      type: Date
    },
    returnedDate: {
      type: Date
    },
    sanctionedDate: {
      type: Date
    },
    isEmergencyFund: {
      type: Boolean,
      default: false
    },
    comments: {
      type: Array,
      default: [{}]
    },
    status: {
      type: String,
      default: 'FUND_REQUESTED'
    },
    createdBy: {
      type: {}
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: {} 
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
});

module.exports = mongoose.model('Fund', FundSchema);
