function authMiddleware(req, res, next){

    if(!req.session.userLogueado){
        return res.redirect('/user/login');
    }else{
        next();
    }
}

module.exports = authMiddleware;