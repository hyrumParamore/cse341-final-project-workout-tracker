const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get All Workouts
const getAllWorkouts = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('workouts').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET Workout by ID
const getWorkoutById = async (req, res) => {
  try {
    const workoutId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('workouts').find({ _id: workoutId });
    const lists = await result.toArray();
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ error: 'Workout not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Create new Workout
// Creating a workout will require multiple exercise IDs to be added to a single workout.
// JSON example
// workout {
//    title: "Title of workout"
//    description: "Workout description"
//    exercise: ID,
//    exercise: ID,
//    exercise: ID,
//    etc...
// }
// 
const createWorkout = async (req, res ) => {  
  try {
    const workout = {
        title: req.body.title,
        description: req.body.description,
        muscleGroup: req.body.muscleGroup,
        exercises: req.body.exercises,
      };
    const response = await mongodb.getDb().db().collection('workouts').insertOne(workout);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Failed to create workout.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update an Workout by ID
// Allows for changing the workout title, description, muscle group, adding or changing exercises, etc...
const updateWorkout = async (req, res) => {
  try {
    const workoutId = new ObjectId(req.params.id);

    const workout = {
      title: req.body.title,
      description: req.body.description,
      muscleGroup: req.body.muscleGroup,
      exercises: req.body.exercises,
    };

    const response = await mongodb.getDb().db().collection('workouts').replaceOne({ _id: workoutId }, workout);

    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Failed to update workout.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Deletes Workout by ID
const deleteWorkout = async (req, res) => {
  try {
    const workoutId = new ObjectId(req.params.id);

    const response = await mongodb.getDb().db().collection('workouts').deleteOne({ _id: workoutId });

    if (response.deletedCount > 0) {
      res.status(204).send();
      res.send('Workout deleted successfully');
    } else {
      res.status(404).json({ error: 'Workout not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { 
    getAllWorkouts,
    getWorkoutById, 
    createWorkout,
    updateWorkout,
    deleteWorkout,
    
    

};