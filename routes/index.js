const express = require('express');
const router = express.Router();


router.use('/', require('./auth') 
// #swagger.tags = ['Auth']
);

router.use('/', require('./swagger')
// #swagger.tags = ['Auth']
);

router.use('/users', require('./users')
// #swagger.tags = ['Users']
);

router.use('/exercises', require('./exercises')
// #swagger.tags = ['Exercises']
);

router.use('/workouts', require('./workouts')
// #swagger.tags = ['Workouts']
);

router.use('/logs', require('./logs')
// #swagger.tags = ['Logs']
);


// TEST ROUTE FOR UNIT TEST
router.get('/test', (req, res) => {
    res.status(400).json({ message: 'Bad request' });
  });


module.exports = router; 