const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const userMiddleware = require('../middleware/userValidation');
const authorizationMiddleware = require('../middleware/middleware') // Authorization to allow user to access locked routes.


// Make it so that when the user authenticates, then they will have access to the users in the database
// so that they can be used to create and manage the workouts.


// GETs all the users in the database
router.get('/', authorizationMiddleware.isAuthenticated, userController.getAllUsers 
// #swagger.summary = 'Returns all of the Users in the Database'
);


// GET User by ID
router.get('/:id', authorizationMiddleware.isAuthenticated, userController.getUserById
// #swagger.summary = 'Returns an User requiring the user ID'
);

// POST a new User WITH User Validation
router.post('/', authorizationMiddleware.isAuthenticated, userMiddleware.validateUser, userController.createUser
// #swagger.summary = 'Creates a new User if needed. Users are automatically created through using Google OAuth'
// #swagger.description = 'Endpoint to create a new user with validation. All fields are required'
/*  #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            firstName: "First Name",
            lastName: "Last Name",
            email: "email@gmail.com",
        }
} */
/* #swagger.responses[201] = {
        description: 'User created successfully',
        
} */
/* #swagger.responses[500] = {
        description: 'Failed to create user',
        
} */

);

// PUT / Update an Exercise
router.put('/:id', authorizationMiddleware.isAuthenticated, userMiddleware.validateUser, userController.updateUser
// #swagger.summary = 'Updates User requiring the user ID'
// #swagger.description = 'Endpoint to update an already existing user with validation. All fields are required'
/*  #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
            firstName: "First Name",
            lastName: "Last Name",
            email: "email@gmail.com",
        }
} */
/* #swagger.responses[204] = {
        description: 'User created successfully',
        
} */
/* #swagger.responses[500] = {
        description: 'Failed to create user',
        
} */
);

// DELETE an Exercise by ID
router.delete('/:id', authorizationMiddleware.isAuthenticated, userController.deleteUser
// #swagger.summary = 'Deletes User requiring the user ID'
/* #swagger.responses[204] = {
        description: 'User deleted successfully',
        
} */
/* #swagger.responses[500] = {
        description: 'Failed to delete user',
        
} */
);


module.exports = router;