const validator = require('../utils/validate');

const validateExercise = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    description: 'required|string',
    muscleGroup: 'string',
    equipment: 'string',
    reps: 'numeric',
    weight: 'string',
    sets: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
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
