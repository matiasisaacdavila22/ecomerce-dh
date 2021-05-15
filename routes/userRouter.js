const express = require('express');
const path = require('path');
const router = express.Router();
let multer = require('multer');
let logDBMiddleware = require('../middlewares/logDBMiddleware');
const { body } = require('express-validator');

const validetUserCreate = [
    body('name').notEmpty().withMessage('Ingresa tu Nombre!'), 
    body('userName').notEmpty().withMessage('Completa con tu Nombre de Usuario!'), 
    body('fecha').notEmpty().withMessage('Ingresa una Fecha!'), 
    body('domicilio').notEmpty().withMessage('Completa con tu Direccion!'), 
    body('password').notEmpty().withMessage('coloca una clave mayor a 8 digitos pueden ser numero y letras!'), 
    body('password2').notEmpty().withMessage('vuelve a introducir tu Clave!')
   // body('perfil').notEmpty().withMessage('selecciona tu perfil de Usuario')
];

const validetUserLogin = [
    body('userName').notEmpty().withMessage('Ingreasa con tu Nombre de Usuario!'), 
    body('password').notEmpty().withMessage('coloca tu clave') 
];

const userController = require('../controllers/userController');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/user'));
    },
    filename: (req, file, cb) => {
        let newFileName = 'user-'+Date.now() + path.extname(file.originalname);
        req.body.file = newFileName;
        cb(null, newFileName);
    }
});

let upload = multer({storage: storage});

router.get('/register', userController.create);
router.post('/register', logDBMiddleware, upload.single('file'),validetUserCreate, userController.store); 

router.get('/login', userController.login); 
router.post('/loguear',validetUserLogin, userController.loguear)

router.get('/', userController.list); 

router.get('/search', userController.search); 

router.get('/edit/:id', userController.edit);
router.put('/edit', upload.single('file'), validetUserCreate, userController.update);

router.delete('/delete/:id', userController.delete);


module.exports = router;