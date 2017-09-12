var express = require('express');
var router = express.Router();

var usersCtrl = require('../controllers/users');

router.post('/signup', usersCtrl.validateUser, usersCtrl.signup);
router.post('/login', usersCtrl.validateLogin, usersCtrl.login);

module.exports = router;
