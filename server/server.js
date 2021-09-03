const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const dotenv=require('dotenv');
dotenv.config({path:__dirname+'/.env'});
console.log(process.env.MONGODB_CONNECTION_STRING,"hi")
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

// const storage = new GridFSStorage({
//    url: process.env.MONGODB_CONNECTION_STRING,
//   file: (req, file) => {
//     return new Primise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) return reject(err);
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads',
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });

// const upload = multer({ storage });

const { User } = require('./models/user');
const { auth } = require('./middleware/auth');

// ROUTES ///

//register user
app.post('/api/user', (req, res) => {
  const user = new User({
    password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName,
    token: req.body.token,
  });
  console.log(req.body);
  user.save((err, doc) => {
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

//login user
app.post('/api/user/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({ message: 'User not found' });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch) return res.status(400).json({ message: 'Wrong Password' });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        console.log(user.token)
        res.status(200).send(user.token);
      });
    });
  });
});

app.get('/user/profile', auth, (req, res) => {
  res.status(200).send(req.token);
});

//PORT Listening
app.listen(process.env.PORT, () => console.log('server is running'));
