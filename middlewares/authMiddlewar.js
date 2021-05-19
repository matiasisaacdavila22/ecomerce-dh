function authMiddleware(req, res, next){
    if(req.session.userLogueado != undefined){
        next();
    }else{
        return res.redirect('/');
    }
}

module.exports = authMiddleware;