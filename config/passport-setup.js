const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../nodemon');
const User = require('../models/user');
const mongoose = require('mongoose');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.env.GOOGLE_CLIENT_ID,
        clientSecret: keys.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if (currentUser) {
                // already have this user
                console.log('User exists in out database!: \n', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    userName: profile.displayName
                })
                    .save()
                    .then((newUser) => {
                        console.log('created new user: ', newUser);
                        done(null, newUser);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
    })
);