const validator = require('../utils/validate');

const validateWorkout = (req, res, next) => {
    const validationRule = {
      title: 'required|string',
      description: 'required|string',
      muscleGroup: 'string',
      exercises: 'required|array',
    'exercise.*.id': 'required|string',
    };

    const customValidators = {
      notEmpty: (value) => {
        return typeof value === 'string' && value.trim().length > 0;
      }
    };

    validator(req.body, validationRule, customValidators, (err, status) => {
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
