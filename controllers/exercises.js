const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get All Exercises
const getAllExercises = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('exercises').find();
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET Exercise by ID
const getExercisesById = async (req, res) => {
  try {
    const exerciseId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('exercises').find({ _id: exerciseId });
    const lists = await result.toArray();
    if (lists.length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ error: 'Exercise not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Create new Exercise
const createExercise = async (req, res ) => {  
  try {
    const exercise = {
      name: req.body.name,
      description: req.body.description,
      muscleGroup: req.body.muscleGroup,
      equipment: req.body.equipment,
      reps: req.body.reps,
      weight: req.body.weight,
      sets: req.body.sets,
    };
    const response = await mongodb.getDb().db().collection('exercises').insertOne(exercise);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Failed to create exercise.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update an Exercise by ID
const updateExercise = async (req, res) => {
  try {
    const exerciseId = new ObjectId(req.params.id);

    const exercise = {
      name: req.body.name,
      description: req.body.description,
      muscleGroup: req.body.muscleGroup,
      equipment: req.body.equipment,
      reps: req.body.reps,
      weight: req.body.weight,
      sets: req.body.sets,
    };

    const response = await mongodb.getDb().db().collection('exercises').replaceOne({ _id: exerciseId }, exercise);

    // console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Failed to update exercise.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete Exercise by ID
const deleteExercise = async (req, res) => {
  try {
    const exerciseId = new ObjectId(req.params.id);

    const response = await mongodb.getDb().db().collection('exercises').deleteOne({ _id: exerciseId });

    if (response.deletedCount > 0) {
      res.status(204).send(); // Send a 204 status code without a response body
      
    } else {
      res.status(404).json({ error: 'Exercise not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { 
    getAllExercises,
    getExercisesById, 
    createExercise,
    deleteExercise,
    updateExercise,

};