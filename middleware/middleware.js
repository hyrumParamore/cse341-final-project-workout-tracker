
// const { getDb } = require('../db/connect');
const userModel = require('../model/userModel')

// Middleware function - This is just making the thing work with no errors for now.
const myMiddleware = (req, res, next) => {
  // Do something
  next();
}

// Authenticates User. Front end would make this work better.
const isAuthenticated = async (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      req.token = bearerToken;
      // This is where you would validate the bearer token, but for now I am just going to
          // assume that the token is valid. It makes it easier to work with right now.
      // Also I was having a ton of issue trying to get the token from the header
          // to then use to validate it.
      return next();
  } else {
      res.status(401).send('Unauthorized');
  }
}

const createNewUser = async (req, res, next) => {
  try {
    // Check if the user exists in the database
    const existingUser = await userModel.findUserByGoogleEmail(req.user.email);

    // If the user doesn't exist, create a new user
    if (!existingUser) {
      const newUser = {
        googleId: req.user.googleId,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
      };
      await userModel.createUser(newUser);
      console.log("User created successfully");
    }

    next();
  } catch (err) {
    console.error("Error creating new user:", err);
    next(err);
  }
};


module.exports = {
    myMiddleware,
    isAuthenticated,
    createNewUser,
};
