function authMiddleware(req, res, next){
    if(req.session.userLogueado != undefined){
        next();
    }else{
        res.send(`no estas logueado, ingresa como usuario....<br> <h2><a href="../../user/login">Login</a></h2>`)
        return res.redirect('/');
    }
}

module.exports = authMiddleware;