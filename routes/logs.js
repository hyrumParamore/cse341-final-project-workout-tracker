const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logs');


// GET all Logs
router.get('/', logsController.getAllLogs
// #swagger.summary = 'Returns all of the workout Logs'
);

// GET a Log by ID
router.get('/:userId', logsController.getLogsByUserId
// #swagger.summary = 'Returns a workout Log requiring a workout Log ID'
);

// POST a new Workout Log
router.post('/', logsController.createLog
// #swagger.summary = 'Creates a new workout Log'
);

// PUT / Update a Log
router.put('/:id', logsController.updateLog
// #swagger.summary = 'Updates a workout Log requiring a workout Log ID'
);

// DELETE a Log by ID
router.delete('/:id', logsController.deleteLog
// #swagger.summary = 'Deletes a workout Log requiring a workout Log ID'
);


module.exports = router;