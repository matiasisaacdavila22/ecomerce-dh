const express = require('express');
const path = require('path');
const router = express.Router();
let multer = require('multer');
let logDBMiddleware = require('../middlewares/logDBMiddleware');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const getMulterStorageConfig = require('../middlewares/multerMiddleware');

const validetUserCreate = [
    body('name').notEmpty().withMessage('Ingresa tu Nombre!'), 
    body('userName').notEmpty().withMessage('Completa con tu Nombre de Usuario!'), 
    body('fecha').notEmpty().withMessage('Ingresa una Fecha!'), 
    body('domicilio').notEmpty().withMessage('Completa con tu Direccion!'), 
    body('password').isLength({ min: 8 }).withMessage('coloca una clave mayor a 8 digitos pueden ser numero y letras!'), 
    body('password2').custom((value, {req}) => {
		if(!req.body.password){
            throw new Error('ingresa una clave');
        }
        if(!req.body.password2){
            throw new Error('repite tu clave');
        }
        let password = req.body.password;
        let password2 = req.body.password2;

        if(password != password2){
			throw new Error('Error las claves ingresadas son Distintas');
		}
		return true;
        
	})
 ];

const validetUserLogin = [
    body('userName').notEmpty().withMessage('Ingreasa con tu Nombre de Usuario!'), 
    body('password').notEmpty().withMessage('coloca tu clave') 
];



let storage = getMulterStorageConfig('../public/images/user','user')


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