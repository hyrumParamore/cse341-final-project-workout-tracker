const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercises');


// GET all Exercises
router.get('/', exercisesController.getAllExercises)

// GET Exercises by ID
router.get('/:id', exercisesController.getExercisesById)

// POST a new Exercise
router.post('/', exercisesController.createExercise)

// PUT / Update an Exercise
router.put('/:id', exercisesController.updateExercise)

// DELETE an Exercise by ID
router.delete('/', exercisesController.deleteExercise)


module.exports = router;