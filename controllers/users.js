const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

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


// GET User by ID
const getUserById = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('users').find({ _id: userId });
    const lists = await result.toArray();
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Create new User
const createUser = async (req, res ) => {  
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };
    const response = await mongodb.getDb().db().collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Failed to create user.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update User by ID
const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };

    const response = await mongodb.getDb().db().collection('users').replaceOne({ _id: userId }, user);

    // console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Failed to update user.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete User by ID
const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);

    const response = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send(); // Send a 204 status code without a response body
      
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { 
    getAllUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
