const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');
const fundCntrl = require('../controllers/funds');

router.post('/createFundRequest', usersCtrl.isAuthenticated, fundCntrl.validateFundRequest, fundCntrl.createFundRequest);

module.exports = router;
