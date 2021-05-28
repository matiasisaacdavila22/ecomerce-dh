const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const productsController = require("../controllers/productsController");
const getMulterStorageConfig = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validationsMiddleware')
const authMiddleware = require('../middlewares/authMiddlewar');
let getstorage = getMulterStorageConfig('../public/images/product','product');

const upload = multer({ storage: getstorage, limits: 1024 * 1024 });

router.get("/", authMiddleware, productsController.index);

router.get("/create", authMiddleware, productsController.create);
router.post(
  "/", authMiddleware,
  upload.single("file"),
  validations.productValidation,
  productsController.store
);

router.get("/:id/", productsController.detail);

router.get("/:id/edit", authMiddleware, productsController.edit);
router.put(
  "/:id", authMiddleware,
  upload.single("file"),
  validations.productValidation,
  productsController.update
);

router.delete("/:id", authMiddleware, productsController.destroy);

module.exports = router;
