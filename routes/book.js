const expres = require('express');
var User = require('../Models/User');
var router = expres.Router();

router.post('/', (req, res) => {
  userData = {
    email: req.body.email,
    password: req.body.pass,
  };
  console.log(userData);
  User.findOne(userData)
    .then((msg) => {
      if (!msg) {
        res.render('login', {
          emailStaus: 'true',
          loginStatus: 'false',
        });
      } else {
        res.render('book', {
          title: 'book page',
          msg: 'hello world',
          loginStatus: 'true',
        });
      }
    })
    .catch((err) => {
      console.log('error: ' + err);
    });
});

// localhost:3000/book/user
router.get('/user', (req, res) => {
  User.find()
    .then((data) => {
      if (!data) {
        res.send('nothing to show');
      } else {
        res.render('user', {
          title: 'user Data',
          msg: 'Following are the user Data',
          user: data,
        });
      }
    })
    .catch((err) => {
      console.log('error: ' + err);
    });
});

// localhost:3000/book/update
router.post('/update', (req, res) => {
  // console.log(req.body.id);
  let userid = req.body.id;
  let updatedUsername = req.body.username;
  let updatedEmail = req.body.email;
  let updatedPassword = req.body.password;
  // console.log(req.body.username);
  User.findOne({ _id: userid })
    .then((user) => {
      user.username = updatedUsername;
      user.email = updatedEmail;
      user.password = updatedPassword;
      return user.save();
    })
    .then((updatedResult) => {
      console.log(updatedResult);
      res.json(updatedResult);
    })
    .catch((e) => {
      console.log(e);
    });
});

// post ---> localhost:3000/book/delete
router.post('/delete', (req, res) => {
  let userid = req.body.id;
  User.findOneAndDelete({ _id: userid })
    .then((result) => {
      console.log(result);
      // res.json(result);
      res.redirect('/book/user');
    })
    .catch((e) => {
      console.log(e);
    });
});

// // localhost:3000/book/delete
// router.post('/delete', (req, res) => {
//   // console.log(req.body.id);
//   let userid = req.body.id;
//   // console.log(req.body.username);
//   User.findOneAndDelete({ _id: userid })
//     .then((result) => {
//       console.log('delted product: ' + result);
//       res.json(result);
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// });

module.exports = router;

// user = [{
//   username: 'abcd',
//   email: 'klsfjdl',
//   password: 'dfsjdlfds;'
// },
// {
//   username: 'abcd',
//   email: 'klsfjdl',
//   password: 'dfsjdlfds;'
// }
// {
//   username: 'abcd',
//   email: 'klsfjdl',
//   password: 'dfsjdlfds;'
// }
// ]
