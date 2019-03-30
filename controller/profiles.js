
exports.get_profile_Render=(req, res) => {
    res.render('profile',{user:req.user});
};