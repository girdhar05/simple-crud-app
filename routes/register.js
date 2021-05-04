const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('register', {
    emailStaus: 'true',
  });
});

module.exports = router;
