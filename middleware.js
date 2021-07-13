const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', "You must be logged in to perform this action.")
        return res.redirect('/patients/login');
    }
    next();
}
module.exports.isLoggedIn = isLoggedIn;