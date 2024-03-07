const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { createUser, findUserByGoogleId } = require('../model/userModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://cse341-final-project-workout-tracker.onrender.com/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await findUserByGoogleId(profile.email);

        if (!user) {
            // User doesn't exist, create a new user
            user = {
                // googleId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value
            };
            await createUser(user);
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
    try {
        const user = await findUserByGoogleId(email);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
