const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../model/user.js'); // Assuming you have a user model file

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://cse341-final-project-workout-tracker.onrender.com/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userModel.findUserByGoogleId(profile.id);

        if (!user) {
            // User doesn't exist, create a new user
            const userData = {
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value
            };
            const userId = await userModel.createUser(userData);
            user = { _id: userId, ...userData }; // Add the user ID to the user object
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id); // Serialize the user ID instead of the entire user object
});

passport.deserializeUser(async (id, done) => {
    try {
        // Implement your logic to deserialize the user
        const user = await userModel.findUserById(id); // Assuming you have a function to find a user by ID
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
