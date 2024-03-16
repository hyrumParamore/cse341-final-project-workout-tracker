const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get All Logs
// Returns json of all the workout logs
const getAllLogs = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('logs').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET Workout Log by ID - Might not need this one
// const getLogById = async (req, res) => {
//     try {
//       const logId = new ObjectId(req.params.id);
//       const result = await mongodb.getDb().db().collection('logs').find({ _id: logId });
//       const lists = await result.toArray();
//       if (lists.length > 0) {
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(lists[0]);
//       } else {
//         res.status(404).json({ error: 'Workout Log not found' });
//       }
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };


// GETs all of the user Workout Logs based off of a UserID ( USER ID MUST BE PASSED THROUGH )
// It would be good to make this all work with the tokens and what not, but Swagger has a hard time with those.
const getLogsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Get all logs that have the key "userId" equal to the provided userId
        const logs = await mongodb.getDb().db().collection('logs').find({ userId: userId }).toArray();

        res.status(200).json(logs);
    } catch (err) {
        console.error('Error retrieving logs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};





// GETs all the logs that a single user has created 
const getUserLogs = async (req, res) => {
    const userId = req.user._id;

    try {
        const logs = await mongodb.getDb().db().collection('logs').find({ userId: userId }).toArray();

        if (logs.length > 0) {
            res.status(200).json(logs);
        } else {
            res.status(404).json({ error: 'Workout Logs not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};




// Create Workout Log
const createLog = async (req, res ) => {  
    try {
        const log = {
            userId: req.body.userId,
            date: req.body.date,
            workoutId: req.body.workoutId,
            duration: req.body.duration,
            notes: req.body.notes,
        };

        const response = await mongodb.getDb().db().collection('logs').insertOne(log);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Failed to create Workout Log.');
        }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
};



// Update an Workout Log by ID
const updateLog = async (req, res) => {
    try {
        const logId = new ObjectId(req.params.id);
  
        const log = {
            userId: req.body.userId,
            date: req.body.date,
            workoutId: req.body.workoutId,
            duration: req.body.duration,
            notes: req.body.notes,
        };
  
      const response = await mongodb.getDb().db().collection('logs').replaceOne({ _id: logId }, log);
  
        console.log(response);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Failed to update workout log.');
        }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
};


// Deletes Workout Log by ID
const deleteLog = async (req, res) => {
    try {
      const log = new ObjectId(req.params.id);
  
      const response = await mongodb.getDb().db().collection('logs').deleteOne({ _id: log });
  
      if (response.deletedCount > 0) {
        res.status(204).send();
        res.send('Workout deleted successfully');
      } else {
        res.status(404).json({ error: 'Workout Log not found.' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};
  

module.exports = {
    getAllLogs,
    // getLogById,
    getLogsByUserId,
    getUserLogs,
    createLog,
    updateLog,
    deleteLog,
    
}