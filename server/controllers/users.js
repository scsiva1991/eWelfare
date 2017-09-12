"use strict";

const User = require('../models/users');
const jwt = require('jsonwebtoken');
const appConf = require('../../app.conf.json');
const async = require('async');

// Generate a JWT token which expires in 24 hours
const getJWT = (user) => {
    return jwt.sign(user, appConf.secret, {
      expiresIn: 60 * 60 * 24
    });
}

const getValidToken = (user) => {
  user = user.toObject();
  delete user.password;
  return {
    token : getJWT(user)
  }
}

const validateUser = (req, res, next) => {
  req.assert('email', 'Email address should not be empty').notEmpty();
  req.assert('username', 'User Name address should not be empty').notEmpty();
  req.assert('email', 'Enter a valid email.').isEmail();
  req.assert('password', 'Password address should not be empty').notEmpty();

  req.getValidationResult().then( (result) => {
    if (!result.isEmpty()) {
        let err = {
            msg: "Bad request",
            err: result.mapped()
        };
        return res.status(400).json(err);
    }
    next();
  })
};

const validateLogin = (req, res, next) => {
  req.assert('email', 'Email address should not be empty').notEmpty();
  req.assert('email', 'Enter a valid email.').isEmail();
  req.assert('password', 'Password address should not be empty').notEmpty();

  req.getValidationResult().then( (result) => {
    if (!result.isEmpty()) {
        let err = {
            msg: "Bad request",
            err: result.mapped()
        };
        return res.status(400).json(err);
    }
    next();
  })
};

const login = (req, res, next) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    console.log( user, err);

    if( !user || err ) {
      return res.status(401).json({
            msg: "Authentication Failed",
            err: err || "Unauthorized"
        });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if( isMatch ) {
        return res.send(getValidToken( user ));
      }

      return res.status(401).json({
            msg: "Please check your password..",
            err: err || "Unauthorized"
        });
    })
  });
}

const signup = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  user.save((err) => {
    if(err) {
      res.status(500).json({
          msg: err.code === 11000 ? 'Email address already exist.' : 'Internal Server error',
          err: 'Unable to create new account'
      });
    } else {
      res.send(getValidToken(user));
    }
  })
}

module.exports = {
  'validateUser': validateUser,
  'signup': signup,
  'validateLogin': validateLogin,
  'login': login
}
