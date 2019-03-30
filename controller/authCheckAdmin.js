module.exports = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        if(req.user.status){
            next();
        }else {
            res.redirect('/');
        }
    }
};