function guestMiddleware(req, res, next){
    if(req.session.userLogueado == undefined){
        next();
    }else{
        req.session.userLogueado = undefined;
        res.send(`estas logueado no puedes volver a hacerlo....<br> <h2><a href="../../product">Productos</a></h2><br> <h2><a href="../../">Home</a></h2>`)
    }
}

module.exports = guestMiddleware;