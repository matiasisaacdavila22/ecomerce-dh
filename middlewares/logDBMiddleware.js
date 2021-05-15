const fs = require('fs');

    function logDBMiddleware(req, res, next) {
        fs.appendFileSync('logDB.txt', `registro al ingresar en la pagina ${req.url} en la fecha : ${new Date()}\n` );
        next();
    }

    module.exports = logDBMiddleware;
