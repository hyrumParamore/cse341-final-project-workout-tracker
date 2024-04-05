// mockAuthMiddleware.js
const mockUser = {
    id: '123456789',
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe'
  };
  
  const mockAuthMiddleware = (req, res, next) => {
    req.user = mockUser;
    next();
  };
  
  module.exports = mockAuthMiddleware;
  