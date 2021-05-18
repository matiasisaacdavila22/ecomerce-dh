const { body } = require('express-validator');
const path = require('path');

        
const validations = {
    validetUserCreate : [
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
 ],

    validetUserLogin : [
    body('userName').notEmpty().withMessage('Ingreasa con tu Nombre de Usuario!'), 
    body('password').notEmpty().withMessage('coloca tu clave') 
    ],

    productValidation : [
    body("category").not().isIn("0").withMessage("Selecciona una Categoria"),
    body("name").notEmpty().withMessage("ingresar el Nombre del producto"),
    body("description").notEmpty().withMessage("agrega una descripcion"),
    body("stock").notEmpty().withMessage("introduce la cantidad").bail().isNumeric().withMessage("este campo deve ser un Numero"),
    body("price").notEmpty().withMessage("indicar el precio $").bail().isNumeric().withMessage("este campo deve ser un Numero"),
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
  ]
}

  module.exports = validations; 