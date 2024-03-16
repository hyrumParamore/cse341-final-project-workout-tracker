const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts');


// GET all Workouts
router.get('/', workoutsController.getAllWorkouts
// #swagger.summary = 'Returns all of the Workouts'
);

// GET Workouts by ID
router.get('/:id', workoutsController.getWorkoutById
// #swagger.summary = 'Returns all of the Workouts requiring a workout ID'
);

// POST a new Workouts
router.post('/', workoutsController.createWorkout
// #swagger.summary = 'Creates a new Workout'
);

// PUT / Update a Workout
router.put('/:id', workoutsController.updateWorkout
// #swagger.summary = 'Updates a Workout requiring a workout ID'
);

// DELETE a Workout by ID
router.delete('/:id', workoutsController.deleteWorkout
// #swagger.summary = 'Deletes a Workout requiring a workout ID'
);


module.exports = router;