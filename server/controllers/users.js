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

//Validating user details before signup
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

//Validate user credentials before login
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

const fetchUser = function (user, cb) {
    User.findOne({
        email: user.email
    }, cb);
}

const login = (req, res, next) => {
    fetchUser({
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

//Check jwt token is valid
const decodeToken = (data, cb) => {
  let authorization, decoded;
  if( data.headers && data.headers.authorization ) {
    authorization = data.headers.authorization.split(' ')[1];
    try {
        decoded = jwt.verify(authorization, appConf.secret);
    } catch (e) {
        return cb(e);
    }
  }
  cb(null, decoded);
}

const checkValidUser = (user, cb) => {
    if (!user) {
        return cb('Invalid Token');
    }
    fetchUser({
        email: user.email
    }, cb);
}

const isAuthenticated = (req, res, next) => {
  async.waterfall([
    decodeToken.bind(null, req),
    checkValidUser
  ], (err, user) => {
    if (err) {
        return res.status(401).send({
            msg: 'User not authorized.. Please Login!!',
            err: 'Unauthorized '
        });
    } else {
        req.user = user;
    }

    next();
  });
}



module.exports = {
  'validateUser': validateUser,
  'signup': signup,
  'validateLogin': validateLogin,
  'login': login,
  'isAuthenticated': isAuthenticated
}
