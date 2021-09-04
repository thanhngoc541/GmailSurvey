const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys')
const mongoose = require('mongoose');
const User = mongoose.model('users');
    
passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => { done(null, user) })
})
passport.use(new GoogleStategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ googleId: profile.id });
    if (user) {
        done(null, user);
    }
    else {
        const newUser = await new User({ googleId: profile.id }).save()
        done(null, newUser)
    }
}));