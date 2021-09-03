const GridFsStorage = require('multer-gridfs-storage');

const url = process.env.MONGODB_CONNECTION_STRING;
const connect = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let gfs;
connect.once('open', () => {
  gfs = new mongoose.mongo.GridFsBucket(connect.db, {
    bucketName: 'uploads',
  });
});
