const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { findUserByGoogleEmail, createUser } = require('../model/userModel');

const router = express.Router();

router.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/google/failure' // Redirect to login page if authentication fails
}), async (req, res) => {
  // Check if the user is already authenticated
  if (req.isAuthenticated()) {
    res.redirect('/'); // Redirect to the home page or wherever you want
    return;
  }

  // If not authenticated, check if the user exists in the database
  const user = await findUserByGoogleEmail(req.user.emails[0].value);
  if (!user) {
    // User doesn't exist, create a new user
    const newUser = {
      firstName: req.user.name.givenName,
      lastName: req.user.name.familyName,
      email: req.user.emails[0].value
    };
    await createUser(newUser);
  }

  res.redirect('/'); // Redirect upon successful authentication
});

module.exports = router;
