const express = require('express');
const session = require('express-session');
const passport = require('passport');

const router = express.Router();

router.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
  res.send('<a href="/auth/google"> Authentication with Google</a>');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/google/failure' // Redirect to login page if authentication fails
}), (req, res) => {
  res.redirect('/api-docs'); // Redirect upon successful authentication
});


module.exports = router; 
