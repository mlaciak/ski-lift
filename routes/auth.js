const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controller/auth');
const authCheck = require('../controller/authCheck');

//auth
router.get('/login', authController.get_login_Render);

//auth logout
router.get('/logout', authController.get_logout_and_redirect);

//login with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), authController.redirect_after_loggin_in);


module.exports = router;