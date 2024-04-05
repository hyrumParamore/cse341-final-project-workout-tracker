// Import the necessary modules
// const jest = require('jest');

// Mock the validateExercise middleware
const validateExerciseMock = jest.fn((req, res, next) => {
  // Automatically pass validation
  next();
});

module.exports = {
  validateExerciseMock
};
