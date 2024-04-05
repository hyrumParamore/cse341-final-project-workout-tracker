// authMiddleware.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// I probably wouldn't normally add these to GitHub, and hide them in my .gitignore, but to test and
// for you to see them, I will add them here. Basically this is authenticating without having to check 
// anything, while the actual one performs a few more checks.
passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://cse341-final-project-workout-tracker.onrender.com/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    // You can perform additional actions here, such as finding or creating a user
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    // Serialize user data
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // Deserialize user data
    done(null, user);
});

const authenticate = passport.authenticate('google', { session: false });

module.exports = { authenticate };