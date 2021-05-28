let jsonDatabaseP = require('../model/jsonDatabase');
let model = jsonDatabaseP('userDataBase')

function userLoggertMiddleware(req, res, next){
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    userFromCookie = model.findemail(emailInCookie);

    if(userFromCookie){
          delete userFromCookie.password;
          req.session.userLogueado = userFromCookie;
         }
    

    if(req.session && req.session.userLogueado){
        res.locals.isLogged = true;
        res.locals.userLogueado = req.session.userLogueado
    }   

    next();
}
module.exports = userLoggertMiddleware;