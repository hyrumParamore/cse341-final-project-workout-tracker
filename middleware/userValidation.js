const validator = require('../utils/validate');

const validateUser = (req, res, next) => {
  console.log(res.body)
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|string',
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
    validateUser
};
