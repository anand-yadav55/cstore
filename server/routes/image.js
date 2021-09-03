
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const GridFsStorage = require('multer-gridfs-storage');
// dotenv.config({path:__dirname+'/../.env'})
// const url = process.env.MONGODB_CONNECTION_STRING;
// console.log(url)
// const connect = mongoose.createConnection(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// let gfs;
// connect.once('open', () => {
//   gfs = new mongoose.mongo.GridFsBucket(connect.db, {
//     bucketName: 'uploads',
//   });
// });
