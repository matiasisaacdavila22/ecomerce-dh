function guestMiddleware(req, res, next){
    if(req.session.userLogueado == undefined){
        next();
    }else{
        req.session.userLogueado = undefined;
        res.send(`ya estas logueado, seras desautenticado para que puedas reingresar....<br> <h2>Regarga la Pagina!</h2>`)

      // return res.redirect('/');
    }
}

module.exports = guestMiddleware;