// auth.js controller

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/user'); // Assuming you have a User model
// const bcrypt = require('bcrypt');

// Configure the Google OAuth2 strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://cse341-final-project-workout-tracker.onrender.com/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            // User doesn't exist, create a new user
            user = new User({
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value
            });

            // Save the new user to the database
            await user.save();
        }

        // Check if the user has a password, if not, require them to set one
        if (!user.password) {
            return done(null, user, { isNewUser: true });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

// Serialize user information
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user information
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
