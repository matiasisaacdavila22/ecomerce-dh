const express = require('express');
const path = require('path');
const router = express.Router();
let multer = require('multer');

const userController = require('../controllers/userController');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/user'));
    },
    filename: (req, file, cb) => {
        let newFileName = 'user-'+Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

let upload = multer({storage: storage});

router.get('/register', userController.create);
router.post('/register', upload.single('file'), userController.store); 

router.get('/login', userController.login); 

router.get('/list', userController.list); 

router.get('/search', userController.search); 

router.get('/edit/:id', userController.edit);
router.put('/edit', userController.update);

router.delete('/delete/:id', userController.delete);


module.exports = router;