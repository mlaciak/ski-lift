const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

exports.get_login_Render = (req, res) => {
    res.render('login', {user: req.user});
};

exports.get_logout_and_redirect = (req, res) => {
    //handle with passport
    req.logout();
    res.redirect('/');
};

exports.redirect_after_loggin_in = (req, res) => {
    // res.send(req.user);
    res.redirect('/profile');
};