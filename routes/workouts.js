const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts');
const workoutValidation = require('../middleware/workoutValidation')
const authorizationMiddleware = require('../middleware/middleware')


// GET all Workouts
router.get('/', workoutsController.getAllWorkouts
// #swagger.summary = 'Returns all of the Workouts'
);

// GET Workouts by ID
router.get('/:id', workoutsController.getWorkoutById
// #swagger.summary = 'Returns all of the Workouts requiring a workout ID'
);

// POST a new Workouts
router.post('/', authorizationMiddleware.isAuthenticated, workoutValidation.validateWorkout, workoutsController.createWorkout
// #swagger.summary = 'Creates a new Workout'
// #swagger.description = 'Endpoint to create a new workout with workout validation. Only Title, Description, and Exercises are required.'
/*  #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            title: "Workout Title",
            description: "Description",
            muscleGroup: "Muscle Group",
            exercises: [
                {
                    id: "Exercise #1 ID",
                },
            ],
        }
} */
/* #swagger.responses[201] = {
        description: 'Workout created successfully',
        
} */
/* #swagger.responses[500] = {
        description: 'Failed to create workout',
        
} */
);

// PUT / Update a Workout
router.put('/:id', authorizationMiddleware.isAuthenticated, workoutValidation.validateWorkout, workoutsController.updateWorkout
// #swagger.summary = 'Updates a Workout requiring a workout ID'
// #swagger.description = 'Endpoint to update an already existing workout with workout validation. Only Title, Description, and Exercises are required.'
/*  #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            title: "Update Workout Title",
            description: "Update Description",
            muscleGroup: "Update Muscle Group",
            exercises: [
                {
                    id: "Update Exercise #1 ID",
                },
            ],
        }
} */
/* #swagger.responses[204] = {
        description: 'Workout updated successfully',
        
} */
/* #swagger.responses[500] = {
        description: 'Failed to update workout',
        
} */
);

// DELETE a Workout by ID
router.delete('/:id', authorizationMiddleware.isAuthenticated, workoutsController.deleteWorkout
// #swagger.summary = 'Deletes a Workout requiring a workout ID'
/* #swagger.responses[204] = {
        description: 'Workout deleted successfully',
        
} */
/* #swagger.responses[500] = {
        description: 'Failed to delete workout',
        
} */
);


module.exports = router;