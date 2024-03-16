const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');


let _db;

// const initDb = async (callback) => {
//     if (_db) {
//         console.log('Db is already initialized!');
//         return callback(null, _db);
//     }

//     try {
//         const client = await MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true });
//         _db = client.db();
//         callback(null, _db);
//     } catch (err) {
//         console.error('Failed to connect to MongoDB:', err);
//         callback(err);
//     }
// };

const initDb = (callback) => {
    if (_db) {
      console.log('Db is already initialized!');
      return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODB_URI)
      .then((client) => {
        _db = client;
        callback(null, _db);
      })
      .catch((err) => {
        callback(err);
      });
  };

const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};

module.exports = {
    initDb,
    getDb,
};
