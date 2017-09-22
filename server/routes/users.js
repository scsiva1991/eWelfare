const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users');

router.post('/signup', usersCtrl.validateUser, usersCtrl.signup);
router.post('/login', usersCtrl.validateLogin, usersCtrl.login);

module.exports = router;
