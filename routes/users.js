const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
// const passport = require('../utils/passport')
// const authorizationMiddleware = require('../middleware/middleware') // Authorization to allow user to access locked routes.



// Make it so that when the user authenticates, then they will have access to the users in the database
// so that they can be used to create and manage the workouts.



// GETs all the users in the database
router.get('/', userController.getAllUsers 
// #swagger.summary = 'Returns all of the Users in the Database'
);

module.exports = router;