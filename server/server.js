const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('MongoDB connection established');
  }
);

const { User } = require('./models/user');
const { auth } = require('./middleware/auth');

//register user
app.post('/api/user', (req, res) => {
  const user = new User({
    password: req.body.password,
    email: req.body.email,
    displayName: req.body.name,
    token: req.body.token,
  });

  user.save((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//login user
app.post('/api/user/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) res.json({ message: 'User not found' });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) return res.status(400).json({ message: 'Wrong Password' });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('auth', user.token).send('ok');
      });
    });
  });
});

app.get('/user/profile', auth, (req, res) => {
  res.status(200).send(req.token);
});

//PORT Listening
app.listen(process.env.PORT, () => console.log('server is running'));