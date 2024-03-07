// auth.js controller

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure the Google OAuth2 strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost8080/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Save or retrieve user information from the database
    // For now, we'll just pass the profile to the done callback
    return done(null, profile);
}));

// Serialize user information
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user information
passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
