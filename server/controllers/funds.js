'use-strict';

const Fund = require('../models/funds');

//Validate fund request before requesting
const validateFundRequest = (req, res, next) => {

  req.assert('requestedAmount', 'Amount is required..').notEmpty();
  req.assert('requestedDate', 'Request Date is required..').notEmpty();

  req.getValidationResult().then((result) => {
    if(!result.isEmpty()) {
      let err = {
        msg: "Bad Request",
        err: result.mapped()
      }
      return res.status(400).json(err);
    }
    next();
  });

}

const addComment = ( comment, user ) => {
  return [{
    comment: comment,
    createdBy: user._id
  }];
}

const makeFund = (data, user) => {
  console.log('makeFund', data, user);
  return new Fund({
      requestedAmount: data.requestedAmount,
      requestedDate: data.requestedDate,
      isEmergencyFund: data.isEmergencyFund,
      comments: addComment( data.comment , user ),
      status: 'FUND_REQUESTED',
      createdBy: user._id
  })
}

const createFundRequest = (req, res, next) => {
  let fund = makeFund( req.body, req.user );
  console.log('$$$', fund);
  fund.save((err, fund) => {
    console.log('eeeeeeee', err)
    if( err ) {
      return res.status(500).json({
          msg: "Internal Server error"
      });
    }
    res.send(fund);
  });
}

const getPendingRequest = (req, res, next) => {
  Fund.findOne({
    createdBy: req.params.id,
    status: { $nin: [ "FUND_RETURNED", "FUND_ABORTED" ] }
  }, (err, fund) => {
    if( err ) {
      return res.status(500).json({
          msg: "Internal Server error"
      });
    }
    res.send(fund);
  })
}

module.exports = {
  'validateFundRequest': validateFundRequest,
  'createFundRequest': createFundRequest,
  'getPendingRequest': getPendingRequest
}
