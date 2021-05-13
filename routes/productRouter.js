const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const productsController = require('../controllers/productsController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/product'));
    },
    filename: (req, file, cb) => {
        const newFileName = 'product-'+Date.now() + path.extname(file.originalname);
        req.body.image = newFileName;
        cb(null, newFileName);
    }
});

const upload = multer({storage: storage});

router.get('/', productsController.index); 

router.get('/create', productsController.create); 
router.post('/',upload.single('image'), productsController.store); 

router.get('/:id/', productsController.detail); 

router.get('/:id/edit', productsController.edit); 
router.put('/:id', upload.single('image'), productsController.update); 

router.delete('/:id', productsController.destroy); 


module.exports = router;