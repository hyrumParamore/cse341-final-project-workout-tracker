const validator = require('../utils/validate');

const validateLog = (req, res, next) => {
    const validationRule = {
      userId: 'required|string',
      date: 'required|string',
      workoutId: 'required|string',
      duration: 'required|string', // Frontend would calculate this.
      notes: 'string',
      
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
            message: 'Failed to Validate Log.',
            data: err
        });
        } else {
            next();
        }
    });
};


  module.exports = {
    validateLog
};
