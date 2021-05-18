const express = require('express');
const path = require('path');
const router = express.Router();
let multer = require('multer');
let logDBMiddleware = require('../middlewares/logDBMiddleware');
const userController = require('../controllers/userController');
const getMulterStorageConfig = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validationsMiddleware')
let storage = getMulterStorageConfig('../public/images/user','user')
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddlewar');

let upload = multer({storage: storage});

router.get('/register', guestMiddleware, userController.create);
router.post('/register', logDBMiddleware, upload.single('file'), validations.validetUserCreate, userController.store); 

router.get('/login', guestMiddleware, userController.login); 
router.post('/loguear',validations.validetUserLogin, userController.loguear)

router.get('/', authMiddleware, userController.list); 

router.get('/search', authMiddleware, userController.search); 

router.get('/edit/:id', authMiddleware, userController.edit);
router.put('/edit', upload.single('file'), validations.validetUserCreate, userController.update);

router.delete('/delete/:id',authMiddleware, userController.delete);


module.exports = router;