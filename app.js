const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const loginRoute = require('./routes/login');
const bookRoute = require('./routes/book');
const registerRoute = require('./routes/register');

const app = express();

const server = app.listen(3000, 'localhost', () => {
  console.log('server connected');
});

mongoose
  .connect(
    'mongodb+srv://girdhar005:govindP19@syologroup.dxgtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    console.log('database connected');
  })
  .catch((err) => {
    console.log('error: ' + err);
  });

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/book', bookRoute);
app.use('/register', registerRoute);
app.use('/', loginRoute);
