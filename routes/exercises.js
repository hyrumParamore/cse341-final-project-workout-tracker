const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercises');


// GET all Exercises
router.get('/', exercisesController.getAllExercises
// #swagger.summary = 'Returns all of the Exercises'
);

// GET Exercises by ID
router.get('/:id', exercisesController.getExercisesById
// #swagger.summary = 'Returns an Exercise requiring the exercise ID'
);

// POST a new Exercise
router.post('/', exercisesController.createExercise
// #swagger.summary = 'Creates a new Exercise'
);

// PUT / Update an Exercise
router.put('/:id', exercisesController.updateExercise
// #swagger.summary = 'Updates a Exercise requiring the exercise ID'
);

// DELETE an Exercise by ID
router.delete('/:id', exercisesController.deleteExercise
// #swagger.summary = 'Deletes an Exercise requiring the exercise ID'
);


module.exports = router;