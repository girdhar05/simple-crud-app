const express = require('express');
var User = require('../Models/User');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('login', {
    loginStatus: 'true',
  });
});

router.post('/', (req, res) => {
  let userData = {
    username: req.body.name,
    email: req.body.email,
    number: req.body.number,
    password: req.body.password,
  };
  const user = new User(userData);
  user
    .save()
    .then((addedUser) => {
      console.log(addedUser);
      res.render('login', {
        loginStatus: 'true',
      });
    })
    .catch((e) => {
      console.log('error : ' + e);
      res.render('register', {
        emailStaus: 'false',
      });
    });
});

module.exports = router;
