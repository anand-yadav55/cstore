const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');

const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override')
const crypto = require('crypto')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

const dotenv=require('dotenv');
dotenv.config({path:__dirname+'/.env'});

const mongoURI = process.env.MONGODB_CONNECTION_STRING
console.log(mongoURI)
mongoose.Promise = global.Promise;
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('MongoDB connection established');
  }
)
const connection = mongoose.connection;

///  HANDLING FILE
let gfs;
connection.once('open', () => {
  // Init stream
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: mongoURI, 
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
})

const upload = multer({ storage });

app.get('/api/getFiles', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.send({ files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.send({ files: files });
    }
  });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.redirect('/');
});


app.post('/api/files/delete/:id',(req, res) => {
    
  // gfs.files.findOne({_id: mongoose.Types.ObjectId(req.params.id)},()=>{
    gfs.files.deleteOne({ _id: mongoose.Types.ObjectId(req.params.id)}, (err,file) => {
      if (err) {
        return res.status(402).json({ err: err });
      }
      res.redirect('/')
    })
  // })
});   

app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ 
    _id: mongoose.Types.ObjectId(req.params.filename)
    // filename: req.params.filename.toString()
   }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      console.log("not found")
      return res.status(404).json({
        
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      console.log(file)
      let id=file._id;

      const readStream = gfs.createReadStream(
        {
          _id: mongoose.Types.ObjectId(req.params.filename)
        }
        // {
         // _id: id
        // }
      )
      readStream.on('error', err => {
          // report stream error
          console.log(err);
      });
      // the response will be the file itself.
      readStream.pipe(res);

    //   let readstream = gfs.createReadStream(mongoose.Types.ObjectId(file._id))
    //   readstream.pipe(res)
    // } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});



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
