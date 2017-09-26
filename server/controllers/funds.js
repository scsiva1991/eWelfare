'use-strict';
const mongoose = require('mongoose');
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
  return {
    comment: comment,
    ownerId: user._id,
    ownerName: user.username
  };
}

const addCreator = ( user ) => {
  return {
    ownerId: user._id,
    name: user.username
  }
}

const makeFund = (data, user) => {
  console.log('makeFund', data, user);
  return new Fund({
      requestedAmount: data.requestedAmount,
      sanctionedAmount: data.requestedAmount,
      returnedAmount: data.requestedAmount,
      requestedDate: data.requestedDate,
      sanctionedDate: null,
      isEmergencyFund: data.isEmergencyFund,
      comments: [addComment( data.comment , user )],
      status: 'FUND_REQUESTED',
      createdBy: addCreator( user )
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
  console.log(req.params.id);
  Fund.findOne({
    'createdBy.ownerId': mongoose.Types.ObjectId(req.params.id)
  }).sort({ 'createdAt': 1}).exec((err, fund) => {
    if( err ) {
      return res.status(500).json({
          msg: "Internal Server error"
      });
    }
    res.send(fund);
  });
}

const getAllPendingFunds = (req, res, next) => {
  Fund.find({
    status: "FUND_PROCESSED"
  }, (err, funds) => {
    if( err ) {
      return res.status(500).json({
          msg: "Internal Server error"
      });
    }
    res.send(funds);
  })
}

const getAllNewFundRequests = (req, res, next ) => {
  Fund.find({
      status: 'FUND_REQUESTED'
  }, (err, funds) => {
      if( err ) {
        return res.status(500).json({
            msg: "Internal Server error"
        });
      }
      res.send( funds );
  });
}

const updateFundRequests = ( req, res, next ) => {
  console.log(Date.now())
  let funds = req.body;
  let bulk = Fund.collection.initializeOrderedBulkOp();
  funds.forEach(function(fund){
    bulk.find({"_id": mongoose.Types.ObjectId(fund._id)}).update({
      "$currentDate": {
          "updatedAt": true
       },
      "$set": {
        "sanctionedAmount": fund.sanctionedAmount,
        "sanctionedDate": fund.sanctionedDate,
        "updatedBy": addCreator( req.user ),
        "status": fund.status
      }
    });

  });

  bulk.execute(function(err,result) {
     if( err ) {
       return res.status(500).json({
           msg: "Internal Server error"
       });
     }
     res.send( result );
  });
}

module.exports = {
  'validateFundRequest': validateFundRequest,
  'createFundRequest': createFundRequest,
  'getPendingRequest': getPendingRequest,
  'getAllNewFundRequests': getAllNewFundRequests,
  'updateFundRequests': updateFundRequests,
  'getAllPendingFunds': getAllPendingFunds
}
