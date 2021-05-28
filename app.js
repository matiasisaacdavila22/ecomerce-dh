const express = require('express');
const app = express();
require('dotenv').config();
//const app = require('./index')
const rutasMain = require('./routes/mainRouter.js');
const userRouter = require('./routes/userRouter.js');
const productRouter = require('./routes/productRouter.js');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path');
const puerto = process.env.PORT ;
const cookieParser = require('cookie-parser');
const userLoggertMiddleware = require('./middlewares/userLoggertMiddleware');


app.set('view engine', 'ejs');
app.use(session({
    secret:'secreto',
    resave: false,
    saveUninitialized:false
    }));
app.use(cookieParser());
app.use(userLoggertMiddleware);
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(methodOverride("_method"));

app.use('/', rutasMain);
app.use('/user', userRouter);
app.use('/product', productRouter);


app.use((req, res, next) => {
    res.status(404).render('Page_notFound');
})

app.listen(puerto || 3000, function() {
    console.log("Servidor corriendo en el puerto 3000");
});


 