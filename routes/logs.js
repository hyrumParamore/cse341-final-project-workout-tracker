const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logs');
const logValidation = require('../middleware/logValidation')
const authorizationMiddleware = require('../middleware/middleware')


// GET all Logs
router.get('/', logsController.getAllLogs
// #swagger.summary = 'Returns all of the workout Logs'
);

// GET a Log by ID
router.get('/:userId', logsController.getLogsByUserId
// #swagger.summary = 'Returns a workout Log requiring a workout Log ID'
);

// POST a new Workout Log
router.post('/', authorizationMiddleware.isAuthenticated, logValidation.validateLog, logsController.createLog
// #swagger.summary = 'Creates a new workout Log'
// #swagger.description = 'Endpoint to create an already existing workout log with validation. UserID, Date, WorkoutID, and Duration are required.'
/*  #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            userId: "Workout Title",
            date: "Date",
            workoutId: "Workout ID",
            duration: "Duration",
            notes: "Log Notes",
        }
} */
/* #swagger.responses[201] = {
        description: 'Log created successfully',
        
} */
/* #swagger.responses[500] = {
        description: 'Failed to create log',
        
} */
);

// PUT / Update a Log
router.put('/:id', authorizationMiddleware.isAuthenticated, logValidation.validateLog, logsController.updateLog
// #swagger.summary = 'Updates a workout Log requiring a workout Log ID'
// #swagger.description = 'Endpoint to update an already existing workout log with validation. UserID, Date, WorkoutID, and Duration are required.'
/*  #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            userId: "Update Workout Title",
            date: "Update Date",
            workoutId: "Update Workout ID",
            duration: "Update Duration",
            notes: "Update Log Notes",
        }
} */
/* #swagger.responses[204] = {
        description: 'Log updated successfully',
        
} */
/* #swagger.responses[500] = {
        description: 'Failed to update log',
        
} */
);

// DELETE a Log by ID
router.delete('/:id', authorizationMiddleware.isAuthenticated, logsController.deleteLog
// #swagger.summary = 'Deletes a workout Log requiring a workout Log ID'
/* #swagger.responses[204] = {
        description: 'Log deleted successfully',
        
} */
/* #swagger.responses[500] = {
        description: 'Failed to delete log',
        
} */
);


module.exports = router;