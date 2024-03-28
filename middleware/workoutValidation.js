const validator = require('../utils/validate');

const validateWorkout = (req, res, next) => {
    const validationRule = {
      title: 'required|string',
      description: 'required|string',
      muscleGroup: 'string',
      exercises: 'required|array',
    'exercise.*.id': 'required|string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
            success: false,
            message: 'Failed to Validate Workout.',
            data: err
        });
        } else {
            next();
        }
    });
};


  module.exports = {
    validateWorkout
};
