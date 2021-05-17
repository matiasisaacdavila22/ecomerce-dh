const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator");
const productsController = require("../controllers/productsController");

const productValidation = [
  body("category").not().isIn("0").withMessage("Selecciona una Categoria"),
  body("name").notEmpty().withMessage("ingresar el Nombre del producto"),
  body("description").notEmpty().withMessage("agrega una descripcion"),
  body("stock")
    .notEmpty()
    .withMessage("introduce la cantidad")
    .bail()
    .isNumeric()
    .withMessage("este campo deve ser un Numero"),
  body("price")
    .notEmpty()
    .withMessage("indicar el precio $")
    .bail()
    .isNumeric()
    .withMessage("este campo deve ser un Numero"),
  body("file").custom((value, { req }) => {
    let acceptedExtensions = [".jpg", ".npg", ".gif"];
    if (!req.file) {
      console.log("no tiene un file");
      if (req.body.oldFile) {
        console.log("pero tiene un fileOld");
        return true;
      } else {
        throw new Error("Tienes que subir una imagen");
      }
    }
    let fileExtension = path.extname(req.file.originalname);

    if (!acceptedExtensions.includes(fileExtension)) {
      throw new Error(
        `las Extensiones permitidas son ${acceptedExtensions.join(", ")}`
      );
    }
    return true;
  }),
];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/images/product"));
  },
  filename: (req, file, cb) => {
    const newFileName =
      "product-" + Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

router.get("/", productsController.index);

router.get("/create", productsController.create);
router.post(
  "/",
  upload.single("file"),
  productValidation,
  productsController.store
);

router.get("/:id/", productsController.detail);

router.get("/:id/edit", productsController.edit);
router.put(
  "/:id",
  upload.single("file"),
  productValidation,
  productsController.update
);

router.delete("/:id", productsController.destroy);

module.exports = router;
