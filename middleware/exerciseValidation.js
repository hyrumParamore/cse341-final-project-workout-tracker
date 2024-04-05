const validator = require('../utils/validate');

const validateExercise = (req, res, next) => {
  console.log(res.body)
  const validationRule = {
    name: 'required|string',
    description: 'required|string',
    muscleGroup: 'string',
    equipment: 'string',
    reps: 'numeric',
    weight: 'string',
    sets: 'string'
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
        message: 'Failed to Validate Exercise.',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
    validateExercise
};
