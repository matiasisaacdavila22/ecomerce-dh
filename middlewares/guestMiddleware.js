function guestMiddleware(req, res, next){
    if(req.session.userLogueado){
        return res.redirect('/');    
    }else{
        next(); 
    }
}

module.exports = guestMiddleware;