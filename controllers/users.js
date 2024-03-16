const mongodb = require('../db/connect');
// const ObjectId = require('mongodb').ObjectId;

// Get All User Accounts
// Returns json of all the Users
const getAllUsers = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('users').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { 
    getAllUsers, 
};
