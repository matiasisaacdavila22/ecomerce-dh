let jsonDatabaseP = require('../model/jsonDatabase');
let model = jsonDatabaseP('userDataBase');

function authCookieMiddleware( req, res, next){
 
    console.log(req.cookies)
    if(req.cookies.remember != undefined && req.session.userLogueado == undefined){
        userLogueado = model.findemail(req.cookies.remember);
        if(userLogueado){
            
            req.session.userLogueado = userLogueado;
            console.log(req.session.userLogueado)
            next();
        }
    }
    next();
}

module.exports = authCookieMiddleware;