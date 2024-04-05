const express = require('express');
const router = express.Router();
const exercisesController = require('../controllers/exercises');
const exerciseMiddleware = require('../middleware/exerciseValidation');
const authorizationMiddleware = require('../middleware/middleware')


// GET all Exercises
router.get('/', exercisesController.getAllExercises
// #swagger.summary = 'Returns all of the Exercises'
);

// GET Exercises by ID
router.get('/:id', exercisesController.getExercisesById
// #swagger.summary = 'Returns an Exercise requiring the exercise ID'
);

// POST a new Exercise WITH Exercise Validation
router.post('/', authorizationMiddleware.isAuthenticated, exerciseMiddleware.validateExercise, exercisesController.createExercise
// #swagger.summary = 'Creates a new Exercise'
// #swagger.description = 'Endpoint to create a new exercise with exercise validation. Only Name and Description are required.'
/*  #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: "Name",
            description: "Description",
            muscleGroup: "Muscle Group",
            equipment: "Equipment",
            reps: 4,
            weight: "Body Weight or 120 lbs",
            sets: "2-3",
        }
} */
/* #swagger.responses[201] = {
        description: 'Exercise created successfully',
        
} */
/* #swagger.responses[500] = {
        description: 'Failed to create exercise',
        
} */

);

// PUT / Update an Exercise
router.put('/:id', authorizationMiddleware.isAuthenticated, exercisesController.updateExercise
// #swagger.summary = 'Updates a Exercise requiring the exercise ID'
// #swagger.description = 'Endpoint to update an already existing exercise with validation. Only Name and Description are required.'
/*  #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            name: "Name",
            description: "Description",
            muscleGroup: "Muscle Group",
            equipment: "Equipment",
            reps: 4,
            weight: "Body Weight or 120 lbs",
            sets: "2-3",
        }
} */
/* #swagger.responses[204] = {
        description: 'Exercise created successfully',
        
} */
/* #swagger.responses[500] = {
        description: 'Failed to create exercise',
        
} */
);

// DELETE an Exercise by ID
router.delete('/:id', authorizationMiddleware.isAuthenticated, exercisesController.deleteExercise
// #swagger.summary = 'Deletes an Exercise requiring the exercise ID'
/* #swagger.responses[204] = {
        description: 'Exercise deleted successfully',
        
} */
/* #swagger.responses[500] = {
        description: 'Failed to delete exercise',
        
} */
);


module.exports = router;