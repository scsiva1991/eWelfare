const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');
const fundCntrl = require('../controllers/funds');

router.post('/createFundRequest', usersCtrl.isAuthenticated, fundCntrl.validateFundRequest, fundCntrl.createFundRequest);
router.get('/getPendingRequest/:id', usersCtrl.isAuthenticated, fundCntrl.getPendingRequest);
router.get('/newFundRequests', usersCtrl.isAuthenticated, fundCntrl.getAllNewFundRequests);
module.exports = router;
